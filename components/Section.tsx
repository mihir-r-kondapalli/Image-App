import React, { useState, useEffect } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  forceExpanded?: boolean;
}

export const Section = ({ title, children, forceExpanded }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceExpanded !== undefined) {
      setIsOpen(forceExpanded);
    }
  }, [forceExpanded]);

  return (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold">{title}</h3>
        <span className="text-lg">
          {isOpen ? '▼' : '►'}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-wrap gap-4">{children}</div>
      )}
    </div>
  );
};
