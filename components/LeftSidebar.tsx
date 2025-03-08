import React, { ChangeEvent, useState } from 'react';
import { Section } from './Section';
import { InputField } from './InputField';
import { ParamsType } from '../types';

interface LeftSidebarProps {
  params: ParamsType;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  paramSetName: string;
  onParamSetNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LeftSidebar = ({ params, onChange, onSave, paramSetName, onParamSetNameChange }: LeftSidebarProps) => {
  const [allSectionsExpanded, setAllSectionsExpanded] = useState(false);
  
  const toggleAllSections = () => {
    setAllSectionsExpanded(!allSectionsExpanded);
  };

  return (
    <aside className="
      absolute
      top-20           /* or top-14 if you prefer */
      left-6
      w-[280px]
      bg-[#2E1A47]/90  /* partial opacity to see starfield behind */
      backdrop-blur-md
      text-white
      rounded-lg
      shadow-xl
      p-6
      z-50
      max-h-[calc(100vh-120px)]
      overflow-y-auto
      sidebar-scroll
    ">
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
        <h2 className="text-2xl font-bold">Parameters</h2>
        <button 
          onClick={toggleAllSections}
          className="text-sm px-2 py-1 bg-[#3D2A56] hover:bg-[#4D3A66] rounded-md transition-colors"
        >
          {allSectionsExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="bg-[#251338] rounded-lg p-4 space-y-6">
        <Section title="Disk Parameters" forceExpanded={allSectionsExpanded}>
          {["alpha_in", "alpha_out", "sma", "e", "inclination", "position_angle", "x_center", "y_center"].map((key) => (
            <InputField 
              key={key} 
              name={key}
              value={params[key as keyof ParamsType]} 
              onChange={onChange} 
              dark
            />
          ))}
        </Section>

        <Section title="SPF Parameters" forceExpanded={allSectionsExpanded}>
          {["g1", "g2", "weight"].map((key) => (
            <InputField 
              key={key} 
              name={key} 
              value={params[key as keyof ParamsType]} 
              onChange={onChange}
              dark
            />
          ))}
        </Section>

        <Section title="PSF Choice" forceExpanded={allSectionsExpanded}>
          <select 
            id="psf" 
            name="psf" 
            value={params.psf} 
            onChange={onChange} 
            className="input-field w-full bg-[#2E1A47] border border-white/20 rounded-lg"
          >
            <option value="NIRCAM 300FM">JWST NIRCAM 300FM</option>
            <option value="NIRCAM 360FM">JWST NIRCAM 360FM</option>
            <option value="EMPIRICAL">EMPIRICAL</option>
            <option value="NONE">NONE</option>
          </select>
        </Section>

        <Section title="Parallactic Angles (JWST only)" forceExpanded={allSectionsExpanded}>
          {["parang1", "parang2"].map((key) => (
            <InputField 
              key={key} 
              name={key} 
              value={params[key as keyof ParamsType]} 
              onChange={onChange}
              dark
            />
          ))}
        </Section>

        <Section title="Noise Level" forceExpanded={allSectionsExpanded}>
          {["noise"].map((key) => (
            <InputField 
              key={key} 
              name={key} 
              value={params[key as keyof ParamsType]} 
              onChange={onChange}
              dark
            />
          ))}
        </Section>

        <div className="mt-6 space-y-3">
          <div className="flex flex-col">
            <label htmlFor="paramSetName" className="block text-sm font-medium mb-1">
              Parameter Set Name
            </label>
            <input 
              id="paramSetName" 
              name="paramSetName" 
              type="text" 
              value={paramSetName} 
              onChange={onParamSetNameChange} 
              placeholder="Enter a name for this parameter set"
              className="input-field w-full"
            />
          </div>
          
          <button 
            onClick={onSave}
            className="w-full py-2 px-4 bg-[#FCA311] hover:bg-[#e59210] text-white font-medium rounded-lg transition-colors duration-200"
          >
            Save Parameters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
