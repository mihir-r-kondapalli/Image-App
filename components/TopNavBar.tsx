import React from 'react';
import Link from 'next/link';

const TopNavBar = () => {
  return (
    <nav className="w-full fixed top-0 bg-purple text-white flex justify-between items-center px-6 h-16 z-10">
      <div className="text-lg font-bold">Image Generator</div>
      <div className="flex space-x-4">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/comparison" className="hover:text-gray-300">Comparison</Link>
        <Link href="/about" className="hover:text-gray-300">About</Link>
      </div>
    </nav>
  );
};

export default TopNavBar;
