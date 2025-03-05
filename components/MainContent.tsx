import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface MainContentProps {
  imageSrc: string;
  onGenerate: () => void;
  isLoading?: boolean;
  hasGeneratedImage: boolean;
  hasChangedParams: boolean;
  showNotification?: boolean;
}

const MainContent = ({ 
  imageSrc, 
  onGenerate, 
  isLoading = false, 
  hasGeneratedImage,
  hasChangedParams,
  showNotification = false
}: MainContentProps) => {
  const [stars, setStars] = useState<{top: string, left: string, delay: string}[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  // Determine button text based on state
  const buttonText = isLoading 
    ? 'Generating...' 
    : (hasGeneratedImage && !hasChangedParams)
      ? 'Generated'
      : 'Generate Image';

  // Function to handle image download
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'generated-space-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="ml-[140px] mt-14 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-70"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center justify-center z-10 py-10">
        {/* Image display area - only show if image has been generated */}
        {hasGeneratedImage && (
          <div 
            className={`relative w-[500px] h-[500px] rounded-lg overflow-hidden mb-8 transition-all duration-300 ${
              isHovering ? 'bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 shadow-lg' : ''
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <Zoom
                zoomImg={{
                  src: imageSrc,
                  alt: "Generated space image (zoomed)"
                }}
                zoomMargin={40}
              >
                <img 
                  src={imageSrc} 
                  alt="Generated space image" 
                  className="w-full h-full object-contain cursor-zoom-in"
                  style={{ width: '100%', height: '100%' }}
                />
              </Zoom>
            )}
          </div>
        )}
        
        <div className="relative flex flex-col items-center space-y-4">
          <button 
            className="btn-primary mt-10 text-lg font-semibold"
            onClick={onGenerate}
            disabled={isLoading}
          >
            {buttonText}
          </button>
          
          {/* Download button - repositioned below generate button */}
          {hasGeneratedImage && !isLoading && (
            <button 
              className="btn-secondary text-lg font-semibold px-6 py-3 bg-[#14213D] hover:bg-[#1d2e4d] text-white rounded-lg transition-colors shadow-lg flex items-center"
              onClick={handleDownload}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          )}
          
          {/* Notification popup */}
          {showNotification && (
            <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-purple-700/90 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
              Image already in frame
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
