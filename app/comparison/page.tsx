"use client";

import React, { useState, useEffect } from 'react';
import TopNavBar from '../../components/TopNavBar';
import Masonry from 'react-masonry-css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from "next/image";

const imageData = [
  {
    id: 1,
    src: 'FitResults/hd106906_H_pol.png',
    title: 'Title: hd106906_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 2,
    src: 'FitResults/hd111161_H_pol.png',
    title: 'Title: hd111161_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 3,
    src: 'FitResults/hd111520_H_pol.png',
    title: 'Title: hd111520_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 4,
    src: 'FitResults/hd114082_H_pol.png',
    title: 'Title: hd114082_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 5,
    src: 'FitResults/hd145560_H_pol.png',
    title: 'Title: hd145560_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 6,
    src: 'FitResults/hd157587_H_pol.png',
    title: 'Title: hd157587_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 7,
    src: 'FitResults/hd30447_H_pol.png',
    title: 'Title: hd30447_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 8,
    src: 'FitResults/hd146897_H_pol.png',
    title: 'Title: hd146897_H_po',
    caption: 'Caption goes here',
    description: 'Description goes here'
  },
  {
    id: 9,
    src: 'FitResults/hr7012_H_pol.png',
    title: 'Title: hr7012_H_pol',
    caption: 'Caption goes here',
    description: 'Description goes here'
  }
];

export default function ComparisonPage() {
  const [selectedImage, setSelectedImage] = useState<typeof imageData[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const openModal = (image: typeof imageData[0]) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-black text-white pt-20 pb-10">
        <TopNavBar />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Fit Results</h1>
          <div className="flex justify-center items-center h-[50vh]">
            <p>Loading gallery...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20 pb-10">
      <TopNavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Some Disk Fit Results</h1>
        
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {imageData.map((image) => (
            <div 
              key={image.id} 
              className="mb-4 bg-[#2E1A47]/80 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-[1.02]"
              onClick={() => openModal(image)}
            >
              <div className="relative">
                <Image 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </Masonry>

        <p className="text-xl color-gray mb-8 text-center"> These are real astronomical images
          that are fit using gradient-descent optimization methods using forward modeling and
          PSF subtraction algorithms. Previous modeling efforts only fit for about 4-5 parameters.
          With this new framework, over 20 parameters are being fit.
        </p>
        
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="bg-[#2E1A47] rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex justify-between items-center border-b border-purple-800">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-grow">
                <Zoom>
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title} 
                    className="w-full h-auto"
                  />
                </Zoom>
                <div className="p-6">
                  <p className="text-lg text-gray-300 mb-2">{selectedImage.caption}</p>
                  <p className="text-gray-200">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
