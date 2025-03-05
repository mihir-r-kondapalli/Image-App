import React, { useState } from 'react';
import { ParamsType } from '../types';

interface SavedParametersProps {
  savedParams: { name: string; params: ParamsType }[];
  onSelect: (params: ParamsType) => void;
  onDelete: (index: number) => void;
}

const SavedParameters = ({ savedParams, onSelect, onDelete }: SavedParametersProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed bottom-6 right-6 w-[300px] bg-[#2E1A47]/90 backdrop-blur-md rounded-lg shadow-lg text-white p-4 z-50 transition-all duration-300 ${
      isMinimized ? 'h-12 overflow-hidden' : ''
    }`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Saved Parameters</h3>
        <button 
          onClick={toggleMinimize}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={isMinimized ? "Expand saved parameters" : "Minimize saved parameters"}
        >
          {isMinimized ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {!isMinimized && (
        <div className={`${savedParams.length > 5 ? 'max-h-60 overflow-auto' : ''} sidebar-scroll`}>
          {savedParams.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No saved parameters yet</p>
          ) : (
            <ul className="space-y-2">
              {savedParams.map((item, index) => (
                <li 
                  key={index}
                  className="p-2 rounded hover:bg-navy flex justify-between items-center text-sm transition-all"
                >
                  <span 
                    className="cursor-pointer flex-grow"
                    onClick={() => onSelect(item.params)}
                  >
                    {item.name || `Saved Set ${index + 1}`}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="text-red-400 hover:text-red-300 ml-2"
                    aria-label="Delete saved parameter set"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedParameters;
