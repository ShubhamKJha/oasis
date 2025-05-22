import React, { useEffect } from 'react';
import { tw } from 'twind';
import { Link } from 'react-router-dom'; // Keep Link if you might add internal links later

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | compresspdfs.com - Support & Feedback";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Get in touch with the compresspdfs.com team. For support, feedback, or inquiries about our secure PDF compression tool, contact us here.");
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = "Get in touch with the compresspdfs.com team. For support, feedback, or inquiries about our secure PDF compression tool, contact us here.";
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
      "name": "Contact Us"
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
          <h1 className={tw`text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center`}>Contact Us</h1>
          <p className={tw`mb-4 text-lg text-center`}>
            We value your feedback and are here to help with any questions you may have about compresspdfs.com. Whether you have a suggestion, a feature request, or need support with our <strong>secure PDF compressor</strong>, please don't hesitate to reach out.
          </p>
          
          <div className={tw`bg-white shadow-md rounded-lg p-6 md:p-8 mt-8`}>
            <h2 className={tw`text-2xl font-semibold text-gray-800 mb-4`}>Get in Touch</h2>
            <p className={tw`mb-2`}>
              The best way to contact us is via email. We strive to respond to all inquiries as quickly as possible, typically within 1-2 business days.
            </p>
            <p className={tw`mb-4`}>
              <strong>Email:</strong> <a href="mailto:hello@compresspdfs.com" className={tw`text-blue-600 hover:text-blue-700 underline`}>hello@compresspdfs.com</a>
            </p>
            <p className={tw`mb-2`}>
              When you contact us, please provide as much detail as possible so we can assist you effectively. If you're reporting an issue, please include information about your browser, operating system, and the steps to reproduce the problem.
            </p>
            <p className={tw`text-sm text-gray-600`}>
              Your input helps us improve our <strong>free online PDF tool</strong> and ensure it meets your needs for reliable and private document compression.
            </p>
          </div>

          <p className={tw`mt-8 text-center text-gray-600`}>
            Thank you for using compresspdfs.com!
          </p>
        </div>
      </div>
    </>
  );
}
