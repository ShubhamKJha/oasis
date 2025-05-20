import React, { useState } from 'react';
import { tw } from 'twind';
import { _GSPS2PDF } from './service/worker-init';
import { useEffect } from "react";

const styles = {
  '@keyframes loadingDots': {
    '0%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(5px)' },
    '50%': { transform: 'translateX(10px)' },
    '75%': { transform: 'translateX(5px)' },
    '100%': { transform: 'translateX(0)' },
  },
  'loading-dots': {
    '&::after': {
      content: '"."',
      animation: 'loadingDots 1s infinite',
    },
  },
};

const AdComponent = () => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <>
      {/* Desktop Side Ads */}
      <div className="hidden lg:flex fixed top-20 left-0 z-30">
        <ins className="adsbygoogle block"
          style={{ width: "120px", height: "600px", display: "block" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="5765874093"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div className="hidden lg:flex fixed top-20 right-0 z-30">
        <ins className="adsbygoogle block"
          style={{ width: "120px", height: "600px", display: "block" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="4452792422"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Mobile Bottom Ad */}
      <div className="lg:hidden fixed bottom-0 w-full z-50 bg-white shadow-md">
        <ins className="adsbygoogle block"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client="ca-pub-3217950182374373"
          data-ad-slot="5328784030"
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
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (state === "loading") {
      const interval = setInterval(() => {
        setDots(prev => (prev === 3 ? 1 : prev + 1));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [state]);

  const loadingDots = '.'.repeat(dots);

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

      {state === "loading" && (
        <p className={tw`text-blue-600 font-semibold`}>Compressing PDF{loadingDots}</p>
      )}

      {state == "alreadyCompressed" && <p className={tw`text-green-600 font-semibold`}>Already Compressed. Try Another</p>}

      {state === "toBeDownloaded" && (
        <div className={tw`w-full max-w-sm`}>
          <div className={tw`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded`}>
            <a href={downloadLink} download={fileName.replace(".pdf", "-min.pdf")}>
              {`📄 Save ${fileName.replace(".pdf", "-min.pdf")} 📄`}
            </a>
          </div>
        </div>
      )}

      {state === "toBeDownloaded" && originalSize && compressedSize && (
        <div className={tw`bg-white p-4 rounded-xl shadow-md w-full max-w-sm`}>
          <div className={tw`grid grid-cols-4 gap-4`}>
            <div className={tw`col-span-3 text-left`}>
              <h2 className={tw`font-bold text-lg text-gray-800 mb-2`}>
                Compression Results
              </h2>
              <p className={tw`text-gray-600`}>
                File: {fileName}
              </p>
              <p className={tw`text-gray-600`}>
                Original Size: {originalSize} MB
              </p>
              <p className={tw`text-gray-600`}>
                Compressed Size: {compressedSize} MB
              </p>
            </div>
            <div className={tw`col-span-1 flex items-center justify-center`}>
              <div className={tw`flex flex-col items-center`}>
                <span className={tw`text-2xl text-green-600 font-bold`}>
                  {Math.round(((1 - (compressedSize / originalSize)) * 100))}%
                </span>
                <span className={tw`text-green-600 text-sm`}>compressed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className={tw`mt-12 flex items-center justify-center`}>
        <a href="https://github.com/ShubhamKjha/oasis" target="_blank" rel="noopener noreferrer">
          <svg className={tw`w-4 h-4 text-gray-400 hover:text-gray-600`} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <span className={tw`ml-2 text-gray-400`}>compresspdfs.com - All compressions happen locally</span>
      </footer>
    </main>
    </div>
  );
}
