import React, { useState } from 'react';
import { processTextToBinary, BinaryItem } from '../utils/binaryLogic';

export default function BinaryLab() {
  const [inputText, setInputText] = useState<string>('');
  const [binaryResult, setBinaryResult] = useState<BinaryItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    setBinaryResult(processTextToBinary(text));
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-4xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-sky-400 mb-2">NexusCPU - Laboratorio Binario</h2>
      <p className="text-slate-400 text-sm mb-4">
        Escribe cualquier palabra para ver en tiempo real cómo se codifica a nivel de bytes (ASCII y Binario de 8 bits).
      </p>

      <input 
        type="text" 
        placeholder="Escribe algo (ej. NEXUS)..." 
        value={inputText}
        onChange={handleChange}
        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg mb-6 text-white focus:outline-none focus:border-sky-500 font-mono"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {binaryResult.map((item, index) => (
          <div key={index} className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center shadow-inner">
            <span className="text-3xl font-black text-sky-300 block mb-1">{item.char}</span>
            <span className="text-xs text-slate-400 block mb-2">ASCII: {item.ascii}</span>
            <span className="font-mono text-emerald-400 text-xs bg-slate-900 py-1 px-2 rounded block border border-slate-800 tracking-wider">
              {item.binary}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
