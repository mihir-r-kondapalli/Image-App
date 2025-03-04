"use client";

import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

type ParamsType = {
  alpha_in: number;
  alpha_out: number;
  sma: number;
  e: number;
  inclination: number;
  position_angle: number;
  x_center: number;
  y_center: number;
  g1: number;
  g2: number;
  weight: number;
  psf: string;
  parang1: number;
  parang2: number;
  parang3: number;
  parang4: number;
};

const defaultParams: ParamsType = {
  alpha_in: 5,
  alpha_out: -5,
  sma: 50,
  e: 0.0,
  inclination: 0,
  position_angle: 0,
  x_center: 250.0,
  y_center: 250.0,
  g1: 0.5,
  g2: 0.5,
  weight: 0.5,
  psf: "NONE",
  parang1: 0.0,
  parang2: 90.0,
  parang3: 180.0,
  parang4: 270.0,
};

export default function Page() {
  const [params, setParams] = useState<ParamsType>(defaultParams);
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/400");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const generateImage = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/generate-image/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);
  };

  return (
    <div className="flex flex-col items-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Image Generator</h1>
      <div className="w-96 h-96 border rounded-md flex items-center justify-center bg-gray-100">
        <motion.img
          src={imageSrc}
          alt="Generated"
          className="rounded-xl shadow-lg max-w-full max-h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>
      <button className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded" onClick={generateImage}>
        Generate Image
      </button>
      <div className="w-full max-w-2xl p-4 mt-6 border rounded-md shadow">
        <div className="flex flex-col gap-6">
          <Section title="Disk Parameters">
            {["alpha_in", "alpha_out", "sma", "e", "inclination", "position_angle", "x_center", "y_center"].map((key) => (
              <InputField key={key} name={key} value={params[key as keyof ParamsType]} onChange={handleChange} />
            ))}
          </Section>

          <Section title="SPF Parameters">
            {["g1", "g2", "weight"].map((key) => (
              <InputField key={key} name={key} value={params[key as keyof ParamsType]} onChange={handleChange} />
            ))}
          </Section>

          <Section title="PSF Choice">
            <select id="psf" name="psf" value={params.psf} onChange={handleChange} className="border p-2 rounded">
              <option value="NIRCAM 300FM">NIRCAM 300FM</option>
              <option value="NIRCAM 360FM">NIRCAM 360FM</option>
              <option value="NONE">NONE</option>
            </select>
          </Section>

          <Section title="Parallactic Angles">
            {["parang1", "parang2", "parang3", "parang4"].map((key) => (
              <InputField key={key} name={key} value={params[key as keyof ParamsType]} onChange={handleChange} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="flex justify-center gap-4 flex-wrap">{children}</div>
  </div>
);

const InputField = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col items-center">
    <label htmlFor={name} className="block font-medium text-center">
      {name.replace("_", " ")}
    </label>
    <input id={name} name={name} type="text" value={value} onChange={onChange} className="border p-2 rounded text-center" />
  </div>
);
