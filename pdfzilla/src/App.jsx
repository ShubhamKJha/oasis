import React, { useState, useRef, useEffect } from 'react';
import { tw } from 'twind';
import { _GSPS2PDF } from './service/worker-init';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';

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

// Simple navigation bar
function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={tw`bg-gray-100 border-b border-gray-200 mb-6`}>
      <div className={tw`container mx-auto px-4 py-3 flex flex-wrap items-center justify-between`}>
        <Link to="/" className={tw`text-xl font-bold text-blue-700`}>compresspdfs.com</Link>
        
        {/* Hamburger Button - visible on mobile */}
        <div className={tw`md:hidden`}>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={tw`text-blue-700 hover:text-blue-600 focus:outline-none focus:text-blue-600`}
            aria-label="Toggle menu"
          >
            <svg className={tw`h-6 w-6 fill-current`} viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu - hidden on mobile */}
        <div className={tw`hidden md:flex gap-3`}>
          <Link to="/about" className={tw`text-sm text-blue-700 hover:text-blue-600`}>About</Link>
          <Link to="/contact" className={tw`text-sm text-blue-700 hover:text-blue-600`}>Contact</Link>
          <Link to="/privacy-policy" className={tw`text-sm text-blue-700 hover:text-blue-600`}>Privacy Policy</Link>
        </div>
      </div>
      {/* Mobile Menu - shown when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className={tw`md:hidden bg-gray-100 border-t border-gray-200`}>
          <div className={tw`px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center`}>
            <Link to="/about" className={tw`block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:text-blue-600 hover:bg-gray-50 w-full text-center`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className={tw`block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:text-blue-600 hover:bg-gray-50 w-full text-center`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/privacy-policy" className={tw`block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:text-blue-600 hover:bg-gray-50 w-full text-center`} onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

const AdComponent = () => {
  const leftAdRef = useRef(null);
  const rightAdRef = useRef(null);
  const mobileAdRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadAd = (ref, adSlot) => {
    if (!ref.current) return;
    
    // Clear any existing content
    ref.current.innerHTML = '';
    
    // Create new ad container
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = 'ca-pub-3217950182374373';
    ins.dataset.adSlot = adSlot;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    
    ref.current.appendChild(ins);
    
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadAds = () => {
      if (!isMobile) {
        loadAd(leftAdRef, '5765874093');
        loadAd(rightAdRef, '4452792422');
      } else {
        loadAd(mobileAdRef, '5328784030');
      }
    };

    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(loadAds, 300);
    
    // Cleanup
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      {/* Desktop Side Ads */}
      <div
        ref={leftAdRef}
        className={tw`${isMobile ? 'hidden' : 'block'} fixed top-20 left-0 z-30 w-[30] md:w-[120px] h-[40] md:h-[600px]`}
      ></div>
      <div
        ref={rightAdRef}
        className={tw`${isMobile ? 'hidden' : 'block'} fixed top-20 right-0 z-30 w-[30] md:w-[120px] h-[40] md:h-[600px]`}
      ></div>

      {/* Mobile Bottom Ad */}
      <div
        ref={mobileAdRef}
        className={tw`${!isMobile ? 'hidden' : 'block'} fixed bottom-0 w-full z-50 bg-white shadow-md h-[24] md:h-[90px]`}
      ></div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className={tw`w-full bg-gray-800 text-gray-300 py-8 text-center`}> {/* Removed mt-16 for sticky footer */}
      <div className={tw`max-w-6xl mx-auto px-4`}>
        <div className={tw`flex justify-center items-center space-x-2 mb-4`}>
          <a href="https://github.com/ShubhamKjha/oasis" target="_blank" rel="noopener noreferrer" className={tw`flex items-center text-gray-400 hover:text-gray-300`}>
            <svg className={tw`w-5 h-5`} fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <span className={tw`text-xs sm:text-sm text-gray-400`}>
            compresspdfs.com - All compressions happen locally
          </span>
        </div>
        <p className={tw`text-xs mb-4`}>
          Your privacy is important to us. Your files are never uploaded to our servers.
        </p>
        <div className={tw`text-xs`}>
          <Link to="/about" className={tw`text-gray-400 hover:text-white px-2`}>About</Link>
          |
          <Link to="/privacy-policy" className={tw`text-gray-400 hover:text-white px-2`}>Privacy Policy</Link>
          {/* Add other links like Contact, Terms of Service if needed */}
        </div>
      </div>
    </footer>
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

// Moved HomePage function outside of loadPDFData
function HomePage() {
  const homeBreadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://compresspdfs.com/"
    }]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to compress PDF for upload?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tool compresses your PDF to a smaller size, making it ideal for uploads to email, job portals, and government forms. Simply select your PDF, and we'll reduce its size without leaving your browser."
        }
      },
      {
        "@type": "Question",
        "name": "How can I compress a confidential PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your PDF is processed entirely in your browser. It's never uploaded to any server, ensuring your confidential documents remain private and secure."
        }
      },
      {
        "@type": "Question",
        "name": "Will the quality of my PDF reduce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our compressor aims for lossless compression where possible, especially for text and vector graphics. For scanned PDFs or images within PDFs, we optimize for the best balance between size reduction and quality retention."
        }
      },
      {
        "@type": "Question",
        "name": "Can I compress a PDF with images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool can compress PDFs containing images. The compression level for images will be optimized to reduce file size while maintaining visual quality."
        }
      },
      {
        "@type": "Question",
        "name": "How to compress PDF to 200kb?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While specific target sizes like 200KB depend on the original PDF's content and size, our tool strives to achieve significant compression. For very large files, achieving a specific small target might vary, but we always aim for the maximum possible reduction without significant quality loss."
        }
      },
      {
        "@type": "Question",
        "name": "Is this better than Adobe PDF compressor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tool offers key advantages like being completely free, requiring no sign-up, and processing files directly in your browser for maximum privacy. Adobe's tools are powerful but often come with subscriptions and server-side processing. For quick, secure, and free compression, our tool is an excellent alternative."
        }
      }
    ]
  };

  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [state, setState] = useState("init");
  const [fileName, setFileName] = useState('');
  const [downloadLink, setDownloadLink] = useState(undefined);
  const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  useEffect(() => {
    if (state === "loading") {
      const interval = setInterval(() => {
        setSpinnerIndex(prev => (prev + 1) % spinnerChars.length);
      }, 80); // Faster animation for spinner
      return () => clearInterval(interval);
    }
  }, [state]);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    <div className={tw`relative min-h-screen bg-gray-50`}>
      <main className={tw`flex flex-col items-center bg-gray-50 p-4 text-center pt-12 md:pt-20`}> {/* Adjusted padding for navbar */}
        <h1 className={tw`text-3xl md:text-4xl font-bold text-gray-800 mb-2`}>Free Online PDF Compressor</h1>
        {/* Trust Tags */}
        <div className={tw`flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-4 mb-8 text-sm text-gray-700`}>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ 100% Browser-Based</span>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ Secure</span>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ Free Forever</span>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ No Upload</span>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ Works Offline</span>
          <span className={tw`px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm`}>✓ Instant Results</span>
        </div>
        <h2 className={tw`text-gray-600 mb-6 max-w-md`}>
        Your PDF never leaves your browser. Lossless compression, lightning-fast, no sign-up needed.
        </h2>
        <label className={tw`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md mb-6`}>
          Select PDF to Compress
          <input type="file" accept="application/pdf" onChange={handleFileChange} className={tw`hidden`} />
        </label>

        {state === "loading" && (
          <p className={tw`text-blue-600 font-semibold flex items-center justify-center`} role="status" aria-live="polite">
            <span className={tw`mr-2 text-xl`}>{spinnerChars[spinnerIndex]}</span>
            Compressing your PDF, please wait...
          </p>
        )}

        {state === "alreadyCompressed" && (<p className={tw`text-green-600 font-semibold`}>Already Compressed. Try Another</p>)}

        {state === "toBeDownloaded" && (
          <div className={tw`w-full max-w-sm`}>
            <div className={tw`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded`}>
              <a href={downloadLink} download={fileName.replace(".pdf", "-min.pdf")}> 
                {` Save ${fileName.replace(".pdf", "-min.pdf")}`}
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
      
      {/* <footer className={tw`mt-12 flex items-center justify-center space-x-2`}>
        <a href="https://github.com/ShubhamKjha/oasis" target="_blank" rel="noopener noreferrer" className={tw`flex items-center`}>
          <svg className={tw`w-4 h-4 text-gray-400 hover:text-gray-600`} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <span className={tw`text-gray-400 text-xs sm:text-sm`}>
          compresspdfs.com - All compressions happen locally
        </span>
      </footer> Footer was inside main, ensure it's closed before main closes if that was the intent, or move it outside main. Original structure had footer inside main. */}
      </main>

      {/* Visual Separator */}
      <hr className={tw`my-8 md:my-12 border-gray-300 w-full`} />

      {/* Content Sections Below the Fold */}
      <div className={tw`w-full px-6 sm:px-10 md:px-16 lg:px-20`}> {/* Container for below-fold content, full width with increased padding */}
        {/* Start of Two-Column Grid for Content Sections */}
        <div className={tw`md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-12`}>
        <section id="why-use-compressor" aria-labelledby="why-use-header" className={tw`px-4 py-8 md:py-12`}>
          <h3 id="why-use-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center`}>🧠 Why Use This PDF Compressor?</h3>
          <p className={tw`text-gray-700 leading-relaxed text-left md:text-left max-w-2xl mx-auto`}>
            Our tool is designed to <strong>reduce pdf size in browser</strong> efficiently and securely. 
            Unlike other services, you can <strong>compress confidential pdf file</strong>(s) without them ever leaving your computer, ensuring maximum privacy. 
            If you need to <strong>compress pdf without adobe</strong> or other paid software, you've found the right place. 
            We strive to be the <strong>best pdf compressor online no size limit</strong> for everyday use, focusing on ease of use and instant results.
          </p>
          <div className={tw`text-center mt-6`}>
            <a href="#faq" className={tw`text-blue-600 hover:text-blue-700 underline`}>Learn more in our FAQs</a>
          </div>
        </section>

        <section id="pdf-security" aria-labelledby="pdf-security-header" className={tw`px-4 py-8 md:py-12 bg-gray-100`}>
          <h3 id="pdf-security-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center`}>🔐 Is Your PDF Secure?</h3>
          <p className={tw`text-gray-700 leading-relaxed text-left md:text-left max-w-2xl mx-auto`}>
            Absolutely. When you <strong>compress pdf securely</strong> with our tool, the entire process happens in your web browser. 
            Your files are not uploaded to any server. This makes it an ideal solution to <strong>compress pdf for confidential documents</strong>, 
            as your data stays with you. No sign-ups, no tracking, just straightforward compression.
          </p>
        </section>

        <section id="use-cases" aria-labelledby="use-cases-header" className={tw`px-4 py-8 md:py-12`}>
          <h3 id="use-cases-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-left`}>📚 Use Cases for PDF Compression</h3>
          <ul className={tw`list-disc list-inside text-gray-700 leading-relaxed space-y-2 max-w-2xl mx-auto text-left`}>
            <li><strong>Compress PDF for job applications</strong>: Ensure your resume and cover letter meet portal size limits.</li>
            <li><strong>Compress PDF for email attachments</strong>: Send smaller files faster and avoid bouncing emails.</li>
            <li><strong>Compress PDF for government form uploads</strong>: Meet strict file size requirements for official submissions.</li>
            <li><strong>Compress PDF for college/university portals</strong>: Submit assignments and applications without hassle.</li>
            <li><strong>Compress PDF for client document sharing</strong>: Make it easier for clients to download and view documents.</li>
            <li><strong>Compress PDF for long-term archiving without quality loss</strong>: Save storage space while preserving document integrity.</li>
            <li>Reduce PDF size for web hosting to improve page load times.</li>
            <li>Optimize PDFs for mobile viewing with faster downloads.</li>
          </ul>
           <div className={tw`text-center mt-6`}>
            <a href="#compression-targets" className={tw`text-blue-600 hover:text-blue-700 underline`}>See compression targets</a>
          </div>
        </section>

        <section id="compression-targets" aria-labelledby="compression-targets-header" className={tw`px-4 py-8 md:py-12 bg-gray-100`}>
          <h3 id="compression-targets-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-left`}>📏 Compression Size Targets</h3>
          <p className={tw`text-gray-700 leading-relaxed mb-3 text-left md:text-left max-w-2xl mx-auto`}>
            Our tool aims to significantly reduce your PDF's file size. While the exact output depends on the original file's content, here's what you can generally expect:
          </p>
          <ul className={tw`list-disc list-inside text-gray-700 leading-relaxed space-y-1 max-w-2xl mx-auto text-left`}>
            <li>Aim to <strong>compress pdf to 200kb</strong> for smaller documents or those that are already somewhat optimized.</li>
            <li>Easily <strong>compress pdf to 500kb</strong> for moderately sized reports or presentations.</li>
            <li>Effectively <strong>compress pdf to 1mb</strong> for larger files, making them much more manageable.</li>
            <li>We also specialize in helping you <strong>compress scanned PDFs without losing quality</strong>, focusing on readability and detail retention.</li>
          </ul>
        </section>
        </div>

        <section id="faq" aria-labelledby="faq-header" className={tw`px-4 py-8 md:py-12`}>
          <h3 id="faq-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center`}>❓ Frequently Asked Questions</h3>
          <div className={tw`space-y-4 max-w-2xl mx-auto`}>
            {faqData.mainEntity.map((item, index) => (
              <details key={index} className={tw`p-4 border rounded-lg bg-white shadow-sm group`}>
                <summary className={tw`font-semibold cursor-pointer text-blue-600 group-open:text-blue-700 group-open:mb-2 flex justify-between items-center`}>
                  {item.name}
                  <span className={tw`transform transition-transform duration-200 group-open:rotate-180`}>▼</span>
                </summary>
                <p className={tw`mt-2 text-gray-700 leading-relaxed`}>{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="video-tutorial" aria-labelledby="video-tutorial-header" className={tw`px-4 py-8 md:py-12 bg-gray-100`}>
          <h3 id="video-tutorial-header" className={tw`text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center`}>📹 How to Compress PDF Securely in Browser – No Quality Loss</h3>
          <p className={tw`text-gray-700 leading-relaxed mb-4 text-left md:text-center max-w-2xl mx-auto`}>
            Watch this short video to see how easy it is to <strong>compress pdf securely</strong> and <strong>reduce pdf size without losing quality</strong> using our tool.
          </p>
          {/* Placeholder for video embed */}
          <div className={tw`aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex flex-col items-center justify-center max-w-xl mx-auto shadow-md text-white cursor-pointer hover:bg-gray-700 transition-colors`}>
            {/* YouTube SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={tw`w-16 h-16 mt-5 mb-2 fill-current text-red-600`}>
              {/* !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
            </svg>
            <p className={tw`text-lg font-semibold`}>Watch Video Tutorial</p>
            <p className={tw`text-sm text-gray-400 mb-4`}>(Coming Soon)</p>
          </div>
          {/* 
            <iframe 
              className={tw`w-full h-full rounded-lg`}
              src="https://www.youtube.com/embed/your_video_id_here" 
              title="How to Compress PDF Securely in Browser – No Quality Loss"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <p className={tw`text-gray-500`}>Video tutorial coming soon! (60-90 seconds)</p>
          */}
        </section>
      </div>

    

    </div>
    </>
  );
}

export default function App() {
  useEffect(() => {
    // Add WebSite JSON-LD to head
    const webSiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "compresspdfs.com",
      "url": "https://compresspdfs.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://compresspdfs.com/search?q={search_term_string}", // Optional: if you have site search
        "query-input": "required name=search_term_string"
      }
    };
    let scriptTag = document.getElementById('website-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'website-schema';
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(webSiteSchema);
      document.head.appendChild(scriptTag);
    }
  }, []);

  return (
    <div className={tw`flex flex-col min-h-screen bg-gray-50`}>
      <NavBar />
      {/* <AdComponent /> */}
      <div className={tw`flex-grow`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
