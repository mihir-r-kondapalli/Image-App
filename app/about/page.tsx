"use client";

import React, { useState, useEffect } from 'react';
import TopNavBar from '../../components/TopNavBar';
import Image from 'next/image';

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <TopNavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-500">
              About Project Title
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Hi guys my name is mihir and I like space and stuff. This is an app to generate special images of my friend James.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#2E1A47]/60 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Image Generation</h3>
                <p className="text-gray-300">ML-based image generation of James' *******</p>
              </div>
              <div className="bg-[#2E1A47]/60 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Comparison</h3>
                <p className="text-gray-300">I like to compare the different images</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            {isMounted && (
              <div className="relative w-[300px] h-[300px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
                  <Image 
                    src="/mihir.png" 
                    alt="Mihir" 
                    width={300} 
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-[#14213D]/80 backdrop-blur-sm py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">References</h2>

         {/* reference 1*/}
          <a 
            href="https://github.com/UCSB-Exoplanet-Polarimetry-Lab/GRaTeR-JAX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block max-w-3xl mx-auto mb-8"
          >
          <div className="bg-[#2E1A47]/60 backdrop-blur-sm p-6 rounded-lg hover:transform hover:scale-[1.02] transition-all duration-300 max-w-3xl mx-auto mb-8">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              UCSB Exoplanet Polarimetry Lab
            </h3>
            <p className="text-gray-300 mb-4">Maxwell Millar-Blanchaer</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-300 text-sm">
              GRaTeR-JAX is a JAX-based implementation of the Generalized Radial Transporter (GRaTeR) framework, designed for modeling scattered light disks around exoplanets. This repository provides tools for forward modeling, optimization, and parameter estimation of scattered light disk images using JAX's accelerated computations.
              </p>
            </div>
          </div>
          </a>
          
          {/* reference 2*/}
        </div>
      </div>

      
      <div className="bg-[#0B0B0B] py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Footer Text Goes Here • Copyright © 2025
          </p>
        </div>
      </div>
      
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
