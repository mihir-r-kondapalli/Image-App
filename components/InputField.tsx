import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  name: string;
  value: number | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  dark?: boolean;
}

export const InputField = ({ name, value, onChange, dark }: InputFieldProps) => (
  <div className="flex items-center justify-between w-full space-x-2 mb-2">
    <label htmlFor={name} className="text-sm font-medium">
      {name.replace("_", " ")}
    </label>
    <input 
      id={name} 
      name={name} 
      type="text" 
      value={value} 
      onChange={onChange} 
      className={`text-center p-1 rounded ${dark ? 'bg-[#251338] border border-white/20 text-white' : 'bg-white text-black'} w-20`}
    />
  </div>
);
