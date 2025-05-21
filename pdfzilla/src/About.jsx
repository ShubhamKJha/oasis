import React from 'react';
import { tw } from 'twind';

export default function About() {
  return (
    <div className={tw`text-gray-600 container mx-auto p-4 max-w-2xl`}>
      <h1 className={tw`text-3xl font-bold mb-4`}>About compresspdfs.com</h1>
      <p className={tw`mb-2`}>compresspdfs.com is a free, privacy-focused PDF compressor that runs entirely in your browser. Our mission is to make PDF compression fast, secure, and accessible to everyone, without uploading your files to any server.</p>
      <p className={tw`mb-2`}>We believe in empowering users with powerful offline tools that respect privacy. compresspdfs.com is built by a small team passionate about open web technologies and user-first tools.</p>
      <p>If you have feedback or suggestions, please <a href="/contact" className={tw`text-blue-600 underline`}>contact us</a>!</p>
    </div>
  );
}
