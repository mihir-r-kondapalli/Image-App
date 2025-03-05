import React, { useState } from 'react';

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* "i" button in the top-right corner */}
      <button 
        className="
          fixed
          top-20
          right-6
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          bg-[#FCA311]     /* Example 'global' orange color */
          text-white
          z-20
          shadow-lg
          hover:bg-opacity-90
        "
        onClick={() => setShowInfo(true)}
      >
        <span className="font-bold">i</span>
      </button>

      {/* Popup modal */}
      {showInfo && (
        <div 
          className="
            fixed
            inset-0
            bg-black
            bg-opacity-50
            flex
            items-center
            justify-center
            z-30
          "
        >
          <div 
            className="
              max-w-md
              w-full
              bg-[#2E1A47]     /* Example global navy/purple color */
              text-white
              p-6
              rounded-lg
              shadow-lg
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              How to Use This App
            </h2>
            <p className="mb-4">
              This application lets you generate simulated astrophysical images 
              by adjusting parameters for disks, SPF (scattering phase functions), 
              PSF (point spread functions), and more. Experiment with different values 
              to see how they affect the final rendered image.
            </p>
            <ol className="list-decimal pl-5 mb-4 space-y-2">
              <li>
                Use the left sidebar to modify parameters (e.g., <em>alpha_in</em>, 
                <em>alpha_out</em>, etc.).
              </li>
              <li>
                Click the &ldquo;Generate Image&rdquo; button to render a new image.
              </li>
              <li>
                Save and load parameter sets in the &ldquo;Saved Parameters&rdquo; panel 
                to quickly reuse your favorite configurations.
              </li>
            </ol>
            <p className="mb-4">
              You can fine-tune each parameter to simulate a wide range of 
              astrophysical scenarios. Explore, experiment, and see how your 
              changes influence the final image!
            </p>
            <button
              className="
                btn-secondary  /* Example: your global secondary button class */
                mt-4
              "
              onClick={() => setShowInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;
