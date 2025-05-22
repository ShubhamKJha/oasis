import React, { useEffect } from 'react';
import { tw } from 'twind';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    document.title = "About Us | compresspdfs.com - Secure & Private PDF Compression";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about compresspdfs.com, our mission for secure, browser-based PDF compression, and our commitment to user privacy. No file uploads required.");
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = "Learn about compresspdfs.com, our mission for secure, browser-based PDF compression, and our commitment to user privacy. No file uploads required.";
      document.getElementsByTagName('head')[0].appendChild(metaDesc);
    }
  }, []);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://compresspdfs.com/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "About Us"
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className={tw`w-full px-6 sm:px-10 md:px-16 lg:px-20 py-8 md:py-12 text-gray-700 leading-relaxed`}>
        <div className={tw`max-w-3xl mx-auto`}>
          <h1 className={tw`text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center`}>About compresspdfs.com</h1>
          <p className={tw`mb-4 text-lg`}>
            Welcome to compresspdfs.com, your trusted partner for fast, secure, and entirely browser-based PDF compression. We are dedicated to providing a high-quality <strong>free PDF compressor</strong> that respects your privacy and data security above all.
          </p>
          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-8 mb-3`}>Our Mission</h2>
          <p className={tw`mb-4`}>
            Our mission is simple: to make PDF compression accessible to everyone, everywhere, without compromising on security or quality. We believe that you shouldn't have to upload your sensitive documents to a server to reduce their file size. That's why our <strong>online PDF tool</strong> processes everything locally on your device. Your files never leave your computer, ensuring complete confidentiality.
          </p>
          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-8 mb-3`}>Why Choose Us?</h2>
          <ul className={tw`list-disc list-inside mb-4 space-y-2`}>
            <li><strong>Privacy First:</strong> All compressions are done in your browser. We don't see, store, or share your files.</li>
            <li><strong>Secure Compression:</strong> Ideal for confidential documents, ensuring your data remains private.</li>
            <li><strong>No Uploads Required:</strong> Unlike other services, your PDFs are processed locally, offering superior data security.</li>
            <li><strong>User-Friendly:</strong> A simple, intuitive interface for quick and easy PDF size reduction.</li>
            <li><strong>Completely Free:</strong> Access powerful PDF compression without any cost or hidden fees.</li>
            <li><strong>Works Offline:</strong> Once the page is loaded, you can compress PDFs even without an internet connection.</li>
          </ul>
          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-8 mb-3`}>Our Commitment</h2>
          <p className={tw`mb-4`}>
            compresspdfs.com is built by a small, passionate team dedicated to open web technologies and user-centric design. We are constantly working to improve our tool and ensure it remains the best choice for anyone needing to <strong>compress PDF without quality loss</strong> while maintaining privacy.
          </p>
          <p className={tw`mt-8 text-center`}>
            If you have any feedback, questions, or suggestions on how we can improve, please don't hesitate to <Link to="/contact" className={tw`text-blue-600 hover:text-blue-700 underline`}>contact us</Link>. We'd love to hear from you!
          </p>
        </div>
      </div>
    </>
  );
}
