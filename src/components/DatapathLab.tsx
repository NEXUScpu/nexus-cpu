import React, { useState } from 'react';
import { executeAluOperation, AluOperation } from '../utils/datapathLogic';

export default function DatapathLab() {
  const [regA, setRegA] = useState<number>(12);
  const [regB, setRegB] = useState<number>(5);
  const [operation, setOperation] = useState<AluOperation>('ADD');

  const aluState = executeAluOperation(regA, regB, operation);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 max-w-5xl mx-auto my-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sky-400">NexusCPU - Ruta de Datos (Datapath & ALU)</h2>
        <p className="text-slate-400 text-sm">
          Modifica los registros de entrada y selecciona la señal de control para observar el flujo en la ALU.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Registro R1 (Entrada A)</label>
          <input
            type="number"
            min={0}
            max={255}
            value={regA}
            onChange={(e) => setRegA(Math.max(0, Math.min(255, Number(e.target.value))))}
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sky-300 font-mono font-bold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Señal de Control (ALU Op)</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as AluOperation)}
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
          >
            <option value="ADD">ADD (Suma)</option>
            <option value="SUB">SUB (Resta)</option>
            <option value="AND">AND (Compuerta Lógica)</option>
            <option value="OR">OR (Compuerta Lógica)</option>
            <option value="XOR">XOR (Compuerta Lógica)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Registro R2 (Entrada B)</label>
          <input
            type="number"
            min={0}
            max={255}
            value={regB}
            onChange={(e) => setRegB(Math.max(0, Math.min(255, Number(e.target.value))))}
            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sky-300 font-mono font-bold focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/40 shadow-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>REGISTRO A</span>
              <span className="text-sky-400 font-bold">DEC: {aluState.operandA}</span>
            </div>
            <div className="font-mono text-sm text-emerald-400 bg-slate-900 p-2 rounded text-center tracking-widest border border-slate-800">
              {aluState.binaryA}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/40 shadow-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>REGISTRO B</span>
              <span className="text-sky-400 font-bold">DEC: {aluState.operandB}</span>
            </div>
            <div className="font-mono text-sm text-emerald-400 bg-slate-900 p-2 rounded text-center tracking-widest border border-slate-800">
              {aluState.binaryB}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col items-center justify-center text-sky-500 font-mono text-xs">
          <span className="mb-1">BUS DATOS</span>
          <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-amber-500 rounded animate-pulse"></div>
          <span className="mt-1 text-slate-500">8 bits</span>
        </div>

        <div className="lg:col-span-3 bg-gradient-to-b from-slate-800 to-slate-950 p-6 rounded-2xl border-2 border-amber-500/60 text-center shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">Unidad Central</span>
          <h3 className="text-3xl font-black text-white mb-2">ALU</h3>
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 font-mono text-sm font-bold">
            OP: {aluState.operation}
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col items-center justify-center text-emerald-500 font-mono text-xs">
          <div className="w-full h-1 bg-emerald-500 rounded animate-pulse"></div>
        </div>

        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border-2 border-emerald-500/50 shadow-md">
          <div className="text-xs text-slate-400 mb-1 text-center font-bold">SALIDA (RD)</div>
          <div className="text-2xl font-black text-white text-center mb-1">{aluState.result}</div>
          <div className="font-mono text-xs text-emerald-400 bg-slate-900 p-1.5 rounded text-center tracking-wider border border-slate-800 mb-3">
            {aluState.binaryResult}
          </div>
          <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2">
            <span className="text-slate-400">Flag ZERO:</span>
            <span className={`px-2 py-0.5 rounded font-mono font-bold ${aluState.zeroFlag ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-400'}`}>
              {aluState.zeroFlag ? '1 (TRUE)' : '0 (FALSE)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
