import React, { useState } from 'react';
import { tw } from 'twind';
import { _GSPS2PDF } from './service/worker-init';

import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <>
      {/* Desktop Side Ads */}
      <div className="hidden lg:flex fixed top-20 left-0 z-30">
        <ins className="adsbygoogle block"
          style={{ width: "120px", height: "600px" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="1111111111"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div className="hidden lg:flex fixed top-20 right-0 z-30">
        <ins className="adsbygoogle block"
          style={{ width: "120px", height: "600px" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="2222222222"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Mobile Bottom Ad */}
      <div className="lg:hidden fixed bottom-0 w-full z-50 bg-white shadow-md">
        <ins className="adsbygoogle block"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="3333333333"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};


function loadPDFData(response, filename) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", response);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        window.URL.revokeObjectURL(response);
        const blob = new Blob([xhr.response], {type: "application/pdf"});
        const pdfURL = window.URL.createObjectURL(blob);
        const size = xhr.response.byteLength;
        resolve({pdfURL, size});
      };
      xhr.send();
    });
  }

export default function App() {
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [state, setState] = useState("init");
  const [fileName, setFileName] = useState('');
  const [downloadLink, setDownloadLink] = useState(undefined);

  const compressPDF = async (file) => {
    setState("loading");
    const arrayBuffer = await file.arrayBuffer();
    const originalSize = arrayBuffer.byteLength;
    setOriginalSize((arrayBuffer.byteLength / 1024 / 1024).toFixed(2));
    setFileName(file.name);

    const pdf = window.URL.createObjectURL(file);
    const dataObject = {psDataURL: pdf};
    const element = await _GSPS2PDF(dataObject)
    const {pdfURL, size: newSize} = await loadPDFData(element, file.name);
    if(originalSize < newSize){
      setState("alreadyCompressed");
    } else {
      setCompressedSize((newSize / 1024 / 1024).toFixed(2))

      setDownloadLink(pdfURL);
      setState("toBeDownloaded");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      compressPDF(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
    <AdComponent />
    <main className={tw`min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center`}>
      <h1 className={tw`text-3xl font-bold text-gray-800 mb-4`}>Free Offline PDF Compressor</h1>
      <p className={tw`text-gray-600 mb-6 max-w-md`}>
        Compress your PDF files directly in your browser. Fast, private, and no uploads required.
      </p>
      <label className={tw`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md mb-6`}>
        Choose PDF File
        <input type="file" accept="application/pdf" onChange={handleFileChange} className={tw`hidden`} />
      </label>

      {state === "loading" && <p className={tw`text-blue-600 font-semibold`}>Compressing PDF...</p>}

      {state == "alreadyCompressed" && <p className={tw`text-green-600 font-semibold`}>Already Compressed. Try Another</p>}

      {state === "toBeDownloaded" && (
        <>
          <div className={tw`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded`}>
            <a href={downloadLink} download={fileName.replace(".pdf", "-min.pdf")}>
              {`📄 Save ${fileName.replace(".pdf", "-min.pdf")} 📄`}
            </a>
          </div>
        </>
      )}

      {state === "toBeDownloaded" && originalSize && compressedSize && (
        <div className={tw`bg-white p-4 rounded-xl shadow-md w-full max-w-sm text-left`}>
          <h2 className={tw`font-bold text-lg text-gray-800 mb-2`}>Compression Results</h2>
          <p className={tw`text-gray-600`}>File: {fileName}</p>
          <p className={tw`text-gray-600`}>Original Size: {originalSize} MB</p>
          <p className={tw`text-gray-600`}>Compressed Size: {compressedSize} MB</p>
        </div>
      )}

      <footer className={tw`mt-12 text-sm text-gray-400`}>
        &copy; {new Date().getFullYear()} compresspdfs.com — All compressions happen locally
      </footer>
    </main>
    </div>
  );
}
