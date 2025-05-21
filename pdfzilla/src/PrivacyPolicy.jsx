import React from 'react';
import { tw } from 'twind';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className={tw`text-gray-600 container mx-auto p-4 max-w-2xl`}>
      <h1 className={tw`text-3xl font-bold mb-4`}>Privacy Policy</h1>
      <p className={tw`mb-2`}>compresspdfs.com values your privacy. All PDF compression is performed locally in your browser; your files are never uploaded to any server.</p>
      <h2 className={tw`text-xl font-semibold mt-4 mb-2`}>Information We Collect</h2>
      <p className={tw`mb-2`}>We do not collect or store any files you process using our tool. We use Google AdSense and Google Analytics, which may collect anonymized usage data as described in their own privacy policies.</p>
      <h2 className={tw`text-xl font-semibold mt-4 mb-2`}>Cookies</h2>
      <p className={tw`mb-2`}>Third-party services like Google AdSense and Analytics may use cookies to serve ads and analyze site usage. You can control cookies through your browser settings.</p>
      <h2 className={tw`text-xl font-semibold mt-4 mb-2`}>Contact</h2>
      <p className={tw``}>If you have privacy concerns, please <Link to="/contact" className={tw`text-blue-600 underline`}>contact us</Link>.</p>
    </div>
  );
}
