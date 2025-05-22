import React, { useEffect } from 'react';
import { tw } from 'twind';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | compresspdfs.com - Your Data Security";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Read the Privacy Policy for compresspdfs.com. Learn how we protect your data with our browser-based PDF compression tool. No file uploads, no server storage.");
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = "Read the Privacy Policy for compresspdfs.com. Learn how we protect your data with our browser-based PDF compression tool. No file uploads, no server storage.";
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
      "name": "Privacy Policy"
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
          <h1 className={tw`text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center`}>Privacy Policy</h1>
          <p className={tw`mb-4 text-sm text-gray-600 text-center`}>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p className={tw`mb-4 text-lg`}>
            At compresspdfs.com, your privacy is paramount. This Privacy Policy outlines our commitment to protecting your data when you use our <strong>secure PDF compression</strong> services. Our tool is designed to operate entirely within your browser, meaning your files are never uploaded to our servers.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>1. No File Uploads or Storage</h2>
          <p className={tw`mb-4`}>
            The core principle of compresspdfs.com is <strong>data privacy through local processing</strong>. When you select a PDF for compression:
          </p>
          <ul className={tw`list-disc list-inside mb-4 space-y-1 pl-4`}>
            <li>All processing, including compression, happens directly in your web browser on your device.</li>
            <li>Your PDF files are <strong>never uploaded, transmitted, or stored</strong> on our servers or any third-party servers.</li>
            <li>Once you close your browser tab or navigate away, the processed data is gone unless you explicitly save the compressed file to your local device.</li>
          </ul>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>2. Information We Do Not Collect</h2>
          <p className={tw`mb-4`}>
            We do not collect, store, or have access to:
          </p>
          <ul className={tw`list-disc list-inside mb-4 space-y-1 pl-4`}>
            <li>The content of your PDF files.</li>
            <li>Any personal information embedded within your PDFs.</li>
            <li>The names of your files.</li>
          </ul>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>3. Information We May Collect (Analytics & Advertising)</h2>
          <p className={tw`mb-2`}>
            To improve our service and maintain its free availability, we use third-party services like Google Analytics and Google AdSense. These services may collect anonymized and aggregated data about your usage of our website. This data helps us understand user behavior and improve our tool. This may include:
          </p>
          <ul className={tw`list-disc list-inside mb-4 space-y-1 pl-4`}>
            <li>General usage patterns (e.g., number of visitors, page views, session duration).</li>
            <li>Technical information (e.g., browser type, operating system, screen resolution).</li>
            <li>Referral sources (e.g., how you arrived at our site).</li>
          </ul>
          <p className={tw`mb-4`}>
            This information is anonymized and cannot be used to identify you personally. For more details, please refer to the privacy policies of <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={tw`text-blue-600 hover:text-blue-700 underline`}>Google Analytics</a> and <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className={tw`text-blue-600 hover:text-blue-700 underline`}>Google AdSense</a>.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>4. Cookies</h2>
          <p className={tw`mb-4`}>
            Our website itself does not set essential cookies for its core functionality. However, third-party services like Google Analytics and Google AdSense may use cookies to collect anonymous usage data and to serve personalized advertisements. You can manage or disable cookies through your browser settings. Please note that disabling cookies might affect the functionality of some parts of our website or the ads displayed.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>5. Data Security</h2>
          <p className={tw`mb-4`}>
            Since we do not handle or store your files, the security of your documents primarily relies on the security of your own device and browser. We ensure our website uses HTTPS to protect the connection between your browser and our site, safeguarding the integrity of the tool itself.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>6. Children's Privacy</h2>
          <p className={tw`mb-4`}>
            compresspdfs.com is not intended for use by children under the age of 13. We do not knowingly collect any personal information from children under 13. If you believe a child has provided us with information, please <Link to="/contact" className={tw`text-blue-600 hover:text-blue-700 underline`}>contact us</Link> so we can address it.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>7. Changes to This Privacy Policy</h2>
          <p className={tw`mb-4`}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
          </p>

          <h2 className={tw`text-2xl font-semibold text-gray-800 mt-6 mb-3`}>8. Contact Us</h2>
          <p className={tw`mb-4`}>
            If you have any questions or concerns about this Privacy Policy or our <strong>data protection</strong> practices, please <Link to="/contact" className={tw`text-blue-600 hover:text-blue-700 underline`}>contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
