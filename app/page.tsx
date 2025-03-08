"use client";


import { useState, ChangeEvent, useEffect } from "react";
import TopNavBar from "../components/TopNavBar";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import SavedParameters from "../components/SavedParameters";
import InfoButton from "../components/InfoButton";
import { ParamsType } from "../types";


const defaultParams: ParamsType = {
  alpha_in: 5,
  alpha_out: -5,
  sma: 50,
  eccentricity: 0.0,
  inclination: 0,
  position_angle: 0,
  x_center: 250.0,
  y_center: 250.0,
  g1: 0.5,
  g2: 0.5,
  weight: 0.5,
  psf: "NONE",
  parang1: 0.0,
  parang2: 5.0,
  noise: 0.0
};

export default function Page() {
  const [params, setParams] = useState<ParamsType>(defaultParams);
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/400");
  const [isLoading, setIsLoading] = useState(false);
  const [savedParams, setSavedParams] = useState<{ name: string; params: ParamsType }[]>([]);
  const [paramSetName, setParamSetName] = useState("");
  const [stars, setStars] = useState<{ top: string; left: string; delay: string }[]>([]);
  const [hasGeneratedImage, setHasGeneratedImage] = useState(false);
  const [hasChangedParams, setHasChangedParams] = useState(false);
  const [lastGeneratedParams, setLastGeneratedParams] = useState<ParamsType | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Generate stars only on client side to prevent hydration errors
  useEffect(() => {
    const starArray = [];
    // Generate 200 stars (twice as many as before)
    for (let i = 0; i < 200; i++) {
      starArray.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
      });
    }
    setStars(starArray);
  }, []);

  // Load saved parameters from localStorage on initial render
  useEffect(() => {
    const savedParamsString = localStorage.getItem('savedParameters');
    if (savedParamsString) {
      try {
        const parsed = JSON.parse(savedParamsString);
        setSavedParams(parsed);
      } catch (error) {
        console.error('Failed to parse saved parameters:', error);
      }
    }
  }, []);

  // Check if parameters have changed since last generation
  useEffect(() => {
    if (lastGeneratedParams) {
      // Compare current params with last generated params
      const paramsChanged = Object.keys(params).some(
        key => params[key as keyof ParamsType] !== lastGeneratedParams[key as keyof ParamsType]
      );
      setHasChangedParams(paramsChanged);
    }
  }, [params, lastGeneratedParams]);

  // Auto-hide notification after 2 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleParamSetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParamSetName(e.target.value);
  };

  const generateImage = async () => {
    // If we've already generated this image and parameters haven't changed,
    // show notification instead of regenerating
    if (hasGeneratedImage && !hasChangedParams) {
      setShowNotification(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
      setHasGeneratedImage(true);
      setLastGeneratedParams({...params});
      setHasChangedParams(false);
    } catch (error) {
      console.error("Error generating image:", error);
      // Optionally show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const saveParameters = () => {
    // Always include the date and time along with the name
    const timestamp = new Date().toLocaleString();
    const name = paramSetName 
      ? `${paramSetName} - ${timestamp}`
      : `Parameters ${timestamp}`;
      
    const newSavedParams = [{ name, params: { ...params } }, ...savedParams];
    setSavedParams(newSavedParams);
    localStorage.setItem('savedParameters', JSON.stringify(newSavedParams));
    setParamSetName(""); // Clear the input field after saving
  };

  const loadParameters = (loadedParams: ParamsType) => {
    setParams(loadedParams);
    // Set hasChangedParams to true when loading saved parameters
    setHasChangedParams(true);
  };

  const deleteParameters = (index: number) => {
    const newSavedParams = [...savedParams];
    newSavedParams.splice(index, 1);
    setSavedParams(newSavedParams);
    localStorage.setItem('savedParameters', JSON.stringify(newSavedParams));
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Star background fills entire page */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-70"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Top navigation (if you have one) */}
      <TopNavBar />

      {/* Floating left sidebar */}
      <LeftSidebar 
        params={params} 
        onChange={handleChange} 
        onSave={saveParameters}
        paramSetName={paramSetName}
        onParamSetNameChange={handleParamSetNameChange}
      />

      {/* Centered main content */}
      <MainContent
        imageSrc={imageSrc}
        onGenerate={generateImage}
        isLoading={isLoading}
        hasGeneratedImage={hasGeneratedImage}
        hasChangedParams={hasChangedParams}
        showNotification={showNotification}
      />

      {/* Right-side saved parameters */}
      <SavedParameters 
        savedParams={savedParams} 
        onSelect={loadParameters}
        onDelete={deleteParameters}
      />

      <InfoButton />
    </main>
  );
}
