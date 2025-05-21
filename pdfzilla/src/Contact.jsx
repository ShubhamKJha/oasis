import React from 'react';
import { tw } from 'twind';

export default function Contact() {
  return (
    <div className={tw`text-gray-600 container mx-auto p-4 max-w-2xl`}>
      <h1 className={tw`text-3xl font-bold mb-4`}>Contact Us</h1>
      <p className={tw`mb-2`}>Have questions or feedback? Reach out to us!</p>
      <ul className={tw`mb-4`}>
        <li>Email: <a href="mailto:hello@compresspdfs.com" className={tw`text-blue-600 underline`}>hello@compresspdfs.com</a></li>
      </ul>
      <p className={tw``}>We aim to respond to all inquiries within 2 business days.</p>
    </div>
  );
}
