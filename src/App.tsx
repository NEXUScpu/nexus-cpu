import React, { useState, useEffect } from 'react';
import logoImg from './IMG-20261115-WA7415.jpg';
import chalkboardKnight from './20261115_181657.jpg';
import pointingInputKnight from './20261115_181514.jpg';
import pointingButtonKnight from './20261115_181637.jpg';
import pointingResultKnight from './20261115_181537.jpg';
import explainingDivKnight from './20261115_181645.jpg';

interface BusTransfer {
  active: boolean;
  source: string;
  target: string;
  type: 'READ' | 'WRITE' | 'INVALIDATE';
  payload: string;
  message: string;
}

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [introFading, setIntroFading] = useState<boolean>(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroFading(true), 2500);
    const removeTimer = setTimeout(() => setShowIntro(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<'binary' | 'datapath' | 'mesi' | 'matrix'>('binary');

  // --- ESTADOS DE TUTORIAL POR CADA MÓDULO ---
  const [binaryStep, setBinaryStep] = useState<number>(0);
  const [datapathStep, setDatapathStep] = useState<number>(0);
  const [mesiStep, setMesiStep] = useState<number>(0);
  const [matrixStep, setMatrixStep] = useState<number>(0);

  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTypingFinished, setIsTypingFinished] = useState<boolean>(false);

  const getCurrentStep = () => {
    if (activeTab === 'binary') return binaryStep;
    if (activeTab === 'datapath') return datapathStep;
    if (activeTab === 'mesi') return mesiStep;
    return matrixStep;
  };

  const currentStep = getCurrentStep();

  // Definición de diálogos con la imagen correcta orientada según la posición del elemento
  const tutorialData: Record<string, Array<{ img: string; text: string; positionClass: string }>> = {
    binary: [
      { 
        img: chalkboardKnight, 
        text: "¡Hola, colega de arquitectura! Bienvenido al conversor binario. Las computadoras operan únicamente con voltajes eléctricos, por lo que transforman cualquier número decimal (base 10) en secuencias de ceros y unos (base 2).", 
        positionClass: "top-4 right-4 md:right-8" 
      },
      { 
        img: pointingInputKnight, 
        text: "Paso 1: Aquí en la casilla de entrada puedes escribir cualquier número decimal positivo. Por defecto tenemos el 32. ¡Prueba cambiarlo por otro valor como 45 para ver cómo se actualiza la magia digital!", 
        positionClass: "top-36 left-4 md:left-10" 
      },
      { 
        img: pointingButtonKnight, // Apunta a la derecha hacia el botón
        text: "Paso 2: Una vez que tengas tu número listo, haz clic en este botón de Ejecutar. Esto envía una señal de control al procesador para disparar el algoritmo de conversión.", 
        positionClass: "top-36 right-4 md:right-10" 
      },
      { 
        img: pointingResultKnight, 
        text: "Paso 3: ¡Mete ojo aquí! Este es el resultado binario directo. Por ejemplo, el decimal 32 equivale exactamente a 100000 en binario (ya que 2 elevado a la 5 es 32).", 
        positionClass: "top-[340px] left-4 md:left-10" 
      },
      { 
        img: explainingDivKnight, 
        text: "Paso 4 (El motor de la máquina): ¿Cómo se calculó? Mediante divisiones sucesivas entre 2. Tomas el número, lo divides entre 2 guardando el cociente y el residuo (bit). Al leer los residuos de abajo hacia arriba, obtienes tu binario perfecto.", 
        positionClass: "bottom-4 left-1/2 transform -translate-x-1/2" 
      }
    ],
    datapath: [
      { 
        img: chalkboardKnight, 
        text: "¡Entramos al corazón de la CPU! La Unidad Aritmético-Lógica (ALU) es la encargada de ejecutar operaciones matemáticas y lógicas fundamentales sobre los datos almacenados.", 
        positionClass: "top-4 right-4 md:right-8" 
      },
      { 
        img: pointingInputKnight, 
        text: "Paso 1: Configura los registros de entrada A y B (por ejemplo, 10 y 5) y selecciona la instrucción que deseas probar en el menú de control (SUMA, RESTA, AND o OR).", 
        positionClass: "top-40 left-4 md:left-10" 
      },
      { 
        img: pointingButtonKnight, // Apunta hacia la derecha
        text: "Paso 2: Dale clic a Ejecutar Ciclo ALU para simular el paso de los datos a través del bus interno del procesador.", 
        positionClass: "top-40 right-4 md:right-10" 
      },
      { 
        img: pointingResultKnight, 
        text: "Paso 3: ¡Excelente! El resultado de la operación (10 + 5 = 15) se deposita inmediatamente en el Acumulador (AC) para que pueda ser utilizado en la siguiente instrucción.", 
        positionClass: "top-[380px] right-4 md:right-10" 
      },
      { 
        img: explainingDivKnight, 
        text: "Paso 4: No olvides revisar las Banderas de Condición (Flags) como Z (Zero) y N (Negative), las cuales indican las propiedades del resultado para que los saltos condicionales del programa funcionen correctamente.", 
        positionClass: "bottom-4 left-1/2 transform -translate-x-1/2" 
      }
    ],
    mesi: [
      { 
        img: chalkboardKnight, 
        text: "¡Atención con los sistemas multi-núcleo! Cuando varios núcleos comparten memoria, surge un problema crítico: ¿cómo saber si la copia de la caché L1 de un núcleo está actualizada?", 
        positionClass: "top-4 right-4 md:right-8" 
      },
      { 
        img: pointingInputKnight, 
        text: "Paso 1: Cada núcleo maneja estados MESI: Modificado (M), Exclusivo (E), Compartido (S) o Inválido (I). Haz clic en Leer Dato o Escribir Dato en cualquiera de los núcleos para experimentar.", 
        positionClass: "top-40 left-4 md:left-10" 
      },
      { 
        img: pointingButtonKnight, // Apunta hacia la derecha
        text: "Paso 2: Al escribir un valor nuevo en un núcleo (ej. 0x9F1C), este pasa a estado Modificado (M), exigiendo exclusividad total sobre ese bloque de memoria.", 
        positionClass: "top-40 right-4 md:right-10" 
      },
      { 
        img: pointingResultKnight, 
        text: "Paso 3: Observa el Bus Compartido (Snooping Bus): cuando ocurre una modificación, se transmite instantáneamente una señal de Invalidación a los demás núcleos para evitar datos obsoletos.", 
        positionClass: "top-[400px] left-4 md:left-10" 
      },
      { 
        img: explainingDivKnight, 
        text: "Paso 4: Si un núcleo necesita un dato invalidado, recurre al bus para solicitarlo directamente a la Memoria RAM o al núcleo que posea la versión más reciente en estado Modificado.", 
        positionClass: "bottom-4 left-1/2 transform -translate-x-1/2" 
      }
    ],
    matrix: [
      { 
        img: chalkboardKnight, 
        text: "¡Hablemos de rendimiento y memoria caché! Cuando multiplicas matrices grandes recorriéndolas de forma lineal, la CPU sufre constantes fallos de caché por saltar demasiado en RAM.", 
        positionClass: "top-4 right-4 md:right-8" 
      },
      { 
        img: pointingInputKnight, 
        text: "Paso 1: Compara los modos Sin Tiling (Lineal) y Con Loop Tiling (Bloques). Ajusta el tamaño del bloque (ej. 2x2) usando el control deslizante.", 
        positionClass: "top-36 left-4 md:left-10" 
      },
      { 
        img: pointingButtonKnight, // Apunta hacia la derecha
        text: "Paso 2: Presiona Simular Recorrido para ver cómo la CPU procesa cada celda paso a paso dentro de la matriz de 4x4.", 
        positionClass: "top-36 right-4 md:right-10" 
      },
      { 
        img: pointingResultKnight, 
        text: "Paso 3: ¡Mira los contadores! Al usar Loop Tiling, los datos se agrupan en bloques que caben perfectamente en la caché L1 rápida.", 
        positionClass: "top-[380px] right-4 md:right-10" 
      },
      { 
        img: explainingDivKnight, 
        text: "Paso 4: Como resultado, los Aciertos (Cache Hits) se disparan masivamente y los costosos Fallos (Cache Misses) se reducen al mínimo, optimizando drásticamente el tiempo de ejecución.", 
        positionClass: "bottom-4 left-1/2 transform -translate-x-1/2" 
      }
    ]
  };

  const currentModuleSteps = tutorialData[activeTab] || [];
  const activeTutorialItem = currentModuleSteps[currentStep];

  // Efecto de Tipeo Suave letra por letra
  useEffect(() => {
    if (!activeTutorialItem) return;
    const currentMessage = activeTutorialItem.text;
    setDisplayedText('');
    setIsTypingFinished(false);
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingFinished(true);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentStep, activeTab]);

  const handleNextStep = () => {
    if (!isTypingFinished) return;
    if (activeTab === 'binary') {
      if (binaryStep < tutorialData.binary.length - 1) setBinaryStep((prev) => prev + 1);
      else setBinaryStep(99);
    } else if (activeTab === 'datapath') {
      if (datapathStep < tutorialData.datapath.length - 1) setDatapathStep((prev) => prev + 1);
      else setDatapathStep(99);
    } else if (activeTab === 'mesi') {
      if (mesiStep < tutorialData.mesi.length - 1) setMesiStep((prev) => prev + 1);
      else setMesiStep(99);
    } else if (activeTab === 'matrix') {
      if (matrixStep < tutorialData.matrix.length - 1) setMatrixStep((prev) => prev + 1);
      else setMatrixStep(99);
    }
  };

  // --- 1. ESTADOS BINARIO DUAL ---
  const [binSubMode, setBinSubMode] = useState<'math' | 'text'>('math');
  const [decimalInput, setDecimalInput] = useState<string>('32');
  const [pureBinary, setPureBinary] = useState<string>('100000');
  const [conversionSteps, setConversionSteps] = useState<Array<{ div: number; q: number; r: number }>>([
    { div: 32, q: 16, r: 0 },
    { div: 16, q: 8, r: 0 },
    { div: 8, q: 4, r: 0 },
    { div: 4, q: 2, r: 0 },
    { div: 2, q: 1, r: 0 },
    { div: 1, q: 0, r: 1 },
  ]);
  const [isConvertingBin, setIsConvertingBin] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(5);

  const runMathBinaryConversion = () => {
    const val = parseInt(decimalInput, 10);
    if (isNaN(val) || val < 0 || isConvertingBin) return;

    setIsConvertingBin(true);
    setActiveStepIndex(-1);

    if (val === 0) {
      setPureBinary('0');
      setConversionSteps([{ div: 0, q: 0, r: 0 }]);
      setActiveStepIndex(0);
      setIsConvertingBin(false);
      return;
    }

    const steps: Array<{ div: number; q: number; r: number }> = [];
    let tempVal = val;
    while (tempVal > 0) {
      const remainder = tempVal % 2;
      const quotient = Math.floor(tempVal / 2);
      steps.push({ div: tempVal, q: quotient, r: remainder });
      tempVal = quotient;
    }

    setConversionSteps(steps);
    const binString = steps.map((s) => s.r).reverse().join('');
    setPureBinary(binString);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setActiveStepIndex(currentStep);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsConvertingBin(false);
      }
    }, 350);
  };

  const [inputText, setInputText] = useState<string>('NexusCPU');
  const [animatedBinaryText, setAnimatedBinaryText] = useState<string>(
    '01001110 01100101 01111000 01110101 01110011 01000011 01010000 01010101'
  );
  const [isAnimatingText, setIsAnimatingText] = useState<boolean>(false);

  const runTextBinaryAnimation = (text: string) => {
    setInputText(text);
    if (!text) {
      setAnimatedBinaryText('');
      return;
    }

    setIsAnimatingText(true);
    const targetBin = text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');

    let charIndex = 0;
    setAnimatedBinaryText('');

    const interval = setInterval(() => {
      if (charIndex <= targetBin.length) {
        setAnimatedBinaryText(targetBin.substring(0, charIndex));
        charIndex += 2;
      } else {
        setAnimatedBinaryText(targetBin);
        clearInterval(interval);
        setIsAnimatingText(false);
      }
    }, 25);
  };

  // --- 2. ESTADOS ALU ---
  const [regA, setRegA] = useState<number>(10);
  const [regB, setRegB] = useState<number>(5);
  const [aluOp, setAluOp] = useState<string>('ADD');
  const [accumulator, setAccumulator] = useState<number>(15);
  const [flags, setFlags] = useState({ z: false, n: false, c: false, v: false });
  const [isExecutingALU, setIsExecutingALU] = useState<boolean>(false);
  const [aluHistory, setAluHistory] = useState<string[]>([
    'Ciclo inicial: RegA (10) + RegB (5) ➔ AC = 15'
  ]);

  const executeALU = () => {
    if (isExecutingALU) return;
    setIsExecutingALU(true);

    setTimeout(() => {
      let res = 0;
      let opLabel = 'SUMA';
      if (aluOp === 'ADD') { res = regA + regB; opLabel = 'SUMA (ADD)'; }
      if (aluOp === 'SUB') { res = regA - regB; opLabel = 'RESTA (SUB)'; }
      if (aluOp === 'AND') { res = regA & regB; opLabel = 'Y LÓGICO (AND)'; }
      if (aluOp === 'OR') { res = regA | regB; opLabel = 'O LÓGICO (OR)'; }

      const zero = res === 0;
      const neg = res < 0;
      const carry = res > 255 || res < 0;

      setAccumulator(res);
      setFlags({ z: zero, n: neg, c: carry, v: false });
      
      setAluHistory((prev) => [
        `[${opLabel}] RegA:${regA} | RegB:${regB} ➔ AC = ${res} (Z:${zero?1:0}, N:${neg?1:0})`,
        ...prev.slice(0, 3)
      ]);

      setIsExecutingALU(false);
    }, 450);
  };

  // --- 3. ESTADOS MESI ---
  const [ramData, setRamData] = useState<string>('0x4A2F');
  const [customWriteVal, setCustomWriteVal] = useState<string>('0x9F1C');
  const [mesiState, setMesiState] = useState<{ [core: string]: { state: 'M' | 'E' | 'S' | 'I'; data: string } }>({
    'Núcleo 0': { state: 'I', data: '----' },
    'Núcleo 1': { state: 'I', data: '----' },
    'Núcleo 2': { state: 'I', data: '----' },
  });

  const [busTransfer, setBusTransfer] = useState<BusTransfer>({
    active: false,
    source: '',
    target: '',
    type: 'READ',
    payload: '',
    message: 'Bus en reposo. Selecciona una operación en cualquier núcleo.',
  });

  const triggerMesiAction = (core: string, action: 'read' | 'write') => {
    const updated = { ...mesiState };
    const othersWithData = Object.entries(updated).filter(
      ([c, info]) => c !== core && (info.state === 'M' || info.state === 'E' || info.state === 'S')
    );

    if (action === 'read') {
      if (updated[core].state !== 'I') {
        setBusTransfer({
          active: true,
          source: core,
          target: core,
          type: 'READ',
          payload: updated[core].data,
          message: `ACIERTO (Hit) en ${core}: Dato válido en L1.`,
        });
      } else if (othersWithData.length > 0) {
        const currentValidData = othersWithData[0][1].data;
        if (othersWithData[0][1].state === 'M') setRamData(currentValidData);
        Object.keys(updated).forEach((c) => {
          if (updated[c].state === 'M' || updated[c].state === 'E') {
            updated[c] = { state: 'S', data: currentValidData };
          }
        });
        updated[core] = { state: 'S', data: currentValidData };
        setBusTransfer({
          active: true,
          source: othersWithData[0][0],
          target: core,
          type: 'READ',
          payload: currentValidData,
          message: `FALLO (Miss) en ${core}: Estado Compartido (S).`,
        });
      } else {
        updated[core] = { state: 'E', data: ramData };
        setBusTransfer({
          active: true,
          source: 'RAM',
          target: core,
          type: 'READ',
          payload: ramData,
          message: `FALLO (Miss) en ${core}: RAM entrega ${ramData}. Estado Exclusivo (E).`,
        });
      }
    } else if (action === 'write') {
      const valToWrite = customWriteVal.trim() || '0xFFFF';
      Object.keys(updated).forEach((c) => {
        if (c === core) updated[c] = { state: 'M', data: valToWrite };
        else updated[c] = { state: 'I', data: '----' };
      });
      setBusTransfer({
        active: true,
        source: core,
        target: 'TODOS',
        type: 'INVALIDATE',
        payload: valToWrite,
        message: `ESCRITURA en ${core}: Estado Modificado (M) e Invalidez enviada.`,
      });
    }
    setMesiState(updated);
    setTimeout(() => setBusTransfer((prev) => ({ ...prev, active: false })), 2200);
  };

  const resetMesi = () => {
    setRamData('0x4A2F');
    setMesiState({
      'Núcleo 0': { state: 'I', data: '----' },
      'Núcleo 1': { state: 'I', data: '----' },
      'Núcleo 2': { state: 'I', data: '----' },
    });
    setBusTransfer({
      active: false,
      source: '',
      target: '',
      type: 'READ',
      payload: '',
      message: 'Sistema reiniciado.',
    });
  };

  // --- 4. ESTADOS MATRICES TILING ---
  const [blockSize, setBlockSize] = useState<number>(2);
  const matrixSize = 4;
  const [tilingMode, setTilingMode] = useState<'tiled' | 'normal'>('tiled');
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [visitedCells, setVisitedCells] = useState<number[]>([]);
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 });
  const [isSimulatingMatrix, setIsSimulatingMatrix] = useState(false);

  const runMatrixSimulation = () => {
    if (isSimulatingMatrix) return;
    setIsSimulatingMatrix(true);
    setVisitedCells([]);
    setCacheStats({ hits: 0, misses: 0 });

    const order: number[] = [];
    if (tilingMode === 'normal') {
      for (let i = 0; i < matrixSize * matrixSize; i++) order.push(i);
    } else {
      for (let br = 0; br < matrixSize; br += blockSize) {
        for (let bc = 0; bc < matrixSize; bc += blockSize) {
          for (let r = br; r < Math.min(br + blockSize, matrixSize); r++) {
            for (let c = bc; c < Math.min(bc + blockSize, matrixSize); c++) {
              order.push(r * matrixSize + c);
            }
          }
        }
      }
    }

    let step = 0;
    let currentHits = 0;
    let currentMisses = 0;
    const interval = setInterval(() => {
      if (step >= order.length) {
        clearInterval(interval);
        setActiveCell(null);
        setIsSimulatingMatrix(false);
        return;
      }
      const cellIdx = order[step];
      setActiveCell(cellIdx);
      setVisitedCells((prev) => [...prev, cellIdx]);

      if (tilingMode === 'normal') {
        if (step % 2 === 0) currentMisses++;
        else currentHits++;
      } else {
        const r = Math.floor(cellIdx / matrixSize);
        const c = cellIdx % matrixSize;
        if (r % blockSize === 0 && c % blockSize === 0) currentMisses++;
        else currentHits++;
      }
      setCacheStats({ hits: currentHits, misses: currentMisses });
      step++;
    }, 350);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* 🎬 INTRO SPLASH SCREEN */}
      {showIntro && (
        <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="relative flex flex-col items-center animate-pulse">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-red-600 rounded-full blur-2xl opacity-30 animate-spin"></div>
            <img 
              src={logoImg} 
              alt="NexusCPU Logo" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-3xl border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.4)] relative z-10"
            />
            <h2 className="mt-6 text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
              NEXUS<span className="text-white">CPU</span>
            </h2>
            <p className="text-xs font-mono text-zinc-400 mt-2 tracking-wider">INICIALIZANDO SISTEMA DE ARQUITECTURA...</p>
          </div>
        </div>
      )}

      {/* ⚡ ANIMACIÓN RGB GAMER DINÁMICA */}
      <style>{`
        @keyframes rgbGlow {
          0% { border-color: #22d3ee; box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
          33% { border-color: #a855f7; box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          66% { border-color: #ef4444; box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          100% { border-color: #22d3ee; box-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
        }
        .animate-rgb-border {
          animation: rgbGlow 5s linear infinite;
        }
      `}</style>

      {/* Encabezado */}
      <header className="border-2 animate-rgb-border bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-[0_0_12px_#22d3ee]"></div>
          <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(168,85,247,0.5)]">
            NEXUS<span className="text-cyan-400">CPU</span> <span className="text-xs text-zinc-400 font-normal">v1.3 - CyberRGB Edition</span>
          </h1>
        </div>

        <nav className="flex flex-wrap justify-center gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-purple-950 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <button
            onClick={() => setActiveTab('binary')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'binary' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.6)] border border-cyan-400' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Sistema Binario
          </button>
          <button
            onClick={() => setActiveTab('datapath')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'datapath' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] border border-purple-400' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Ruta de Datos & ALU
          </button>
          <button
            onClick={() => setActiveTab('mesi')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'mesi' 
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-400' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Multinúcleo MESI
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'matrix' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] border border-emerald-400' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Matrices y Bloques (Tiling)
          </button>
        </nav>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full relative">
        
        {/* 🛡️ CAPA DE BLOQUEO TOTAL Y TARJETA DEL CHIBI */}
        {activeTutorialItem && currentStep < currentModuleSteps.length && (
          <div className="absolute inset-0 z-30 bg-black/60 pointer-events-auto rounded-2xl flex items-center justify-center">
            <div className={`absolute z-45 bg-zinc-950/95 border-2 border-cyan-400 rounded-2xl p-3.5 max-w-[310px] shadow-[0_0_35px_rgba(34,211,238,0.5)] flex items-center gap-3.5 pointer-events-auto ${activeTutorialItem.positionClass}`}>
              
              <div className="w-16 h-16 bg-black rounded-xl border border-cyan-500/50 p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                <img 
                  src={activeTutorialItem.img} 
                  alt="Caballero Chibi" 
                  className="w-full h-full object-contain filter contrast-125 brightness-90 mix-blend-screen drop-shadow-[0_0_8px_#22d3ee]"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest font-mono block">
                  Paso {currentStep + 1} de {currentModuleSteps.length}
                </span>
                <p className="text-[11px] font-mono text-cyan-100 leading-snug min-h-[50px]">
                  {displayedText}
                  {!isTypingFinished && <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse align-middle"></span>}
                </p>

                <button
                  onClick={handleNextStep}
                  disabled={!isTypingFinished}
                  className={`w-full py-1.5 px-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    isTypingFinished 
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.7)] cursor-pointer' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {currentStep === currentModuleSteps.length - 1 ? '¡Entendido, Comenzar! ⚔️' : 'Siguiente Explicación ➔'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 1: SISTEMA BINARIO */}
        {activeTab === 'binary' && (
          <div className="space-y-6 max-w-3xl mx-auto relative">
            <div className="bg-zinc-950 border border-cyan-900/50 hover:border-cyan-500/60 transition-all duration-500 rounded-2xl p-6 shadow-[0_0_35px_rgba(34,211,238,0.1)] relative overflow-hidden backdrop-blur">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#22d3ee]"></span>
                    Conversor a Sistema Binario
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">
                    Elige si deseas convertir una cantidad matemática o codificar texto en ASCII.
                  </p>
                </div>

                <div className="flex bg-black p-1 rounded-xl border border-cyan-950 shrink-0">
                  <button
                    onClick={() => setBinSubMode('math')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      binSubMode === 'math'
                        ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-cyan-400'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    🔢 Número (Matemático)
                  </button>
                  <button
                    onClick={() => setBinSubMode('text')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      binSubMode === 'text'
                        ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    🔤 Palabras (ASCII)
                  </button>
                </div>
              </div>

              {binSubMode === 'math' && (
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                        Escribe el número completo (Base 10)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={decimalInput}
                        disabled={isConvertingBin}
                        onChange={(e) => setDecimalInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runMathBinaryConversion()}
                        placeholder="Ej: 32"
                        className="w-full bg-black border border-cyan-950 focus:border-cyan-400 rounded-xl px-4 py-3.5 text-white font-mono text-xl outline-none transition shadow-inner focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={runMathBinaryConversion}
                        disabled={isConvertingBin || decimalInput === ''}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-cyan-400 text-sm flex items-center gap-2 h-[54px]"
                      >
                        {isConvertingBin ? 'Calculando...' : '⚡ Ejecutar'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                      Resultado Real en Binario (Base 2)
                    </label>
                    <div className="bg-black p-6 rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.15)] text-center">
                      <span className="font-mono text-cyan-300 text-4xl font-black tracking-widest break-all drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                        {pureBinary}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black border border-cyan-950 rounded-2xl p-5 shadow-inner">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center justify-between">
                      <span>⚙️ Cómo lo transformó la máquina (Divisiones entre 2)</span>
                      {isConvertingBin && <span className="text-cyan-300 animate-pulse text-[11px]">Ejecutando pasos...</span>}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {conversionSteps.map((step, idx) => {
                        const isHighlighted = idx <= activeStepIndex;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border font-mono text-xs transition-all duration-300 ${
                              isHighlighted
                                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-[1.02]'
                                : 'bg-zinc-950 border-cyan-950/40 text-zinc-600 opacity-40'
                            }`}
                          >
                            <div className="text-zinc-400 text-[10px]">
                              Paso #{idx + 1}: {step.div} ÷ 2
                            </div>
                            <div className="mt-1 font-bold text-zinc-300">Cociente: {step.q}</div>
                            <div className="text-cyan-400 font-bold mt-0.5">Residuo (Bit): {step.r}</div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-3 text-center">
                      * El número binario se lee tomando los residuos desde el último paso hacia el primero.
                    </p>
                  </div>
                </div>
              )}

              {binSubMode === 'text' && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                      Texto de Entrada (Palabras / Caracteres)
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => runTextBinaryAnimation(e.target.value)}
                        placeholder="Escribe una palabra..."
                        className="flex-1 bg-black border border-emerald-950 focus:border-emerald-400 rounded-xl px-4 py-3.5 text-white font-mono text-lg focus:outline-none transition shadow-inner"
                      />
                      <button
                        onClick={() => runTextBinaryAnimation(inputText)}
                        disabled={isAnimatingText}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 text-sm"
                      >
                        {isAnimatingText ? 'Codificando...' : '⚡ Re-ejecutar'}
                      </button>
                    </div>
                  </div>

                  {inputText.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {inputText.split('').map((char, idx) => (
                        <div
                          key={idx}
                          className="bg-black border border-emerald-900/80 rounded-lg px-2.5 py-1.5 text-center font-mono shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                        >
                          <span className="text-xs text-emerald-400 font-bold block">
                            {char === ' ' ? 'ESP' : char} (ASCII {char.charCodeAt(0)})
                          </span>
                          <span className="text-[11px] text-white">
                            {char.charCodeAt(0).toString(2).padStart(8, '0')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                      Salida Completa del Bus (ASCII 8-bit)
                    </label>
                    <div className="bg-black p-6 rounded-2xl border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] relative overflow-hidden">
                      <p className="font-mono text-emerald-300 text-lg tracking-widest break-all leading-relaxed drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]">
                        {animatedBinaryText}
                        {isAnimatingText && (
                          <span className="inline-block w-2.5 h-5 bg-emerald-400 ml-1 animate-pulse align-middle shadow-[0_0_8px_#10b981]"></span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MÓDULO 2: RUTA DE DATOS & ALU */}
        {activeTab === 'datapath' && (
          <div className="space-y-6 relative">
            <div className="bg-zinc-950 border border-purple-900/50 rounded-2xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.1)] relative overflow-hidden backdrop-blur">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="text-xl font-bold mb-1 text-purple-400 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isExecutingALU ? 'bg-white animate-ping' : 'bg-purple-500'} shadow-[0_0_10px_#a855f7]`}></span>
                Simulador de Ruta de Datos y Unidad Aritmético-Lógica (ALU)
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                Configura los registros de entrada, selecciona la operación y observa cómo la CPU procesa el flujo de datos.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-black border border-purple-950 rounded-2xl p-5 space-y-4 shadow-inner flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">1. Registros & Operación</h3>
                    
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Registro de Entrada A</label>
                      <input
                        type="number"
                        value={regA}
                        disabled={isExecutingALU}
                        onChange={(e) => setRegA(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-purple-950 focus:border-purple-400 rounded-xl px-4 py-2.5 text-white font-mono text-lg outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Registro de Entrada B</label>
                      <input
                        type="number"
                        value={regB}
                        disabled={isExecutingALU}
                        onChange={(e) => setRegB(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-purple-950 focus:border-purple-400 rounded-xl px-4 py-2.5 text-white font-mono text-lg outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Sección de Control (Instrucción ALU)</label>
                      <select
                        value={aluOp}
                        disabled={isExecutingALU}
                        onChange={(e) => setAluOp(e.target.value)}
                        className="w-full bg-zinc-950 border border-purple-950 focus:border-purple-400 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition"
                      >
                        <option value="ADD">SUMA (ADD)</option>
                        <option value="SUB">RESTA (SUB)</option>
                        <option value="AND">Y LÓGICO (AND)</option>
                        <option value="OR">O LÓGICO (OR)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={executeALU}
                    disabled={isExecutingALU}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 font-bold py-3 rounded-xl transition shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400 text-white text-sm mt-4 flex items-center justify-center gap-2"
                  >
                    {isExecutingALU ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Procesando Ciclo...
                      </>
                    ) : (
                      '⚡ Ejecutar Ciclo ALU'
                    )}
                  </button>
                </div>

                <div className="lg:col-span-2 bg-black border border-purple-950 rounded-2xl p-6 shadow-inner flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">2. Núcleo de Procesamiento & Acumulador (AC)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="bg-zinc-950 border border-purple-950 rounded-xl p-4 text-center relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <span className="text-[10px] text-zinc-400 uppercase block mb-1">Bus de Datos</span>
                        <div className="font-mono text-sm text-purple-400 font-bold">A={regA} | B={regB}</div>
                        {isExecutingALU && (
                          <div className="absolute inset-0 bg-purple-600/20 rounded-xl animate-pulse border border-purple-400 shadow-[0_0_15px_#a855f7]"></div>
                        )}
                      </div>

                      <div className={`border-2 rounded-xl p-4 text-center transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                        isExecutingALU ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105' : 'bg-zinc-950 border-purple-950'
                      }`}>
                        <span className="text-[10px] text-zinc-400 uppercase block">Unidad ALU</span>
                        <span className="text-lg font-black font-mono text-white">{aluOp}</span>
                      </div>

                      <div className={`border-2 rounded-xl p-4 text-center transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                        isExecutingALU ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]' : 'bg-zinc-950 border-purple-950'
                      }`}>
                        <span className="text-[10px] text-zinc-400 uppercase block">Acumulador (AC)</span>
                        <span className="text-3xl font-black font-mono text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">{accumulator}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-purple-400 mb-3 uppercase tracking-wider">Banderas de Condición (Flags)</h4>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div className={`p-3 rounded-xl border transition-all ${
                        flags.z ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold' : 'bg-zinc-950 border-purple-950 text-zinc-600'
                      }`}>
                        <span className="text-xs block text-zinc-400">Z (Zero)</span>
                        {flags.z ? '1' : '0'}
                      </div>
                      <div className={`p-3 rounded-xl border transition-all ${
                        flags.n ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold' : 'bg-zinc-950 border-purple-950 text-zinc-600'
                      }`}>
                        <span className="text-xs block text-zinc-400">N (Negative)</span>
                        {flags.n ? '1' : '0'}
                      </div>
                      <div className={`p-3 rounded-xl border transition-all ${
                        flags.c ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold' : 'bg-zinc-950 border-purple-950 text-zinc-600'
                      }`}>
                        <span className="text-xs block text-zinc-400">C (Carry)</span>
                        {flags.c ? '1' : '0'}
                      </div>
                      <div className={`p-3 rounded-xl border transition-all ${
                        flags.v ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold' : 'bg-zinc-950 border-purple-950 text-zinc-600'
                      }`}>
                        <span className="text-xs block text-zinc-400">V (Overflow)</span>
                        {flags.v ? '1' : '0'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-purple-950 rounded-xl p-3 shadow-inner">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">Registro de Operaciones (Pipeline)</span>
                    <div className="space-y-1 font-mono text-xs text-zinc-300">
                      {aluHistory.map((item, i) => (
                        <div key={i} className={i === 0 ? 'text-purple-300 font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]' : 'text-zinc-600 opacity-85'}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 3: MULTINÚCLEO MESI */}
        {activeTab === 'mesi' && (
          <div className="space-y-6 relative">
            <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-6 shadow-[0_0_35px_rgba(239,68,68,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-red-500">Arquitectura Multinúcleo & Bus de Coherencia (MESI)</h2>
                <p className="text-zinc-400 text-sm">Observa cómo viajan los datos entre la Memoria RAM y las cachés L1 de cada núcleo.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-black border border-red-950 rounded-xl px-3 py-1.5 shadow-inner">
                  <span className="text-xs text-zinc-400">Nuevo dato a escribir:</span>
                  <input
                    type="text"
                    value={customWriteVal}
                    onChange={(e) => setCustomWriteVal(e.target.value)}
                    maxLength={8}
                    className="w-20 bg-transparent font-mono text-sm text-red-400 font-bold focus:outline-none text-center"
                  />
                </div>
                <button
                  onClick={resetMesi}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs px-4 py-2.5 rounded-xl border border-red-950 transition font-bold"
                >
                  Reiniciar Sistema
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${
              busTransfer.active
                ? busTransfer.type === 'INVALIDATE'
                  ? 'bg-red-950/60 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-zinc-900 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-zinc-950 border-red-950 text-zinc-300'
            }`}>
              <span className={`w-3 h-3 rounded-full shrink-0 ${
                busTransfer.active
                  ? busTransfer.type === 'INVALIDATE' ? 'bg-red-500 animate-ping shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 animate-ping shadow-[0_0_10px_#22d3ee]'
                  : 'bg-zinc-700'
              }`}></span>
              <p className="text-sm font-mono font-bold">{busTransfer.message}</p>
            </div>

            <div className="bg-zinc-950 border border-red-900/50 rounded-2xl p-6 shadow-[0_0_35px_rgba(239,68,68,0.1)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(mesiState).map(([core, info]) => {
                  const isTarget = busTransfer.active && (busTransfer.target === core || busTransfer.target === 'TODOS' || busTransfer.source === core);
                  return (
                    <div key={core} className="flex flex-col items-center">
                      <div className={`w-full bg-black border-2 rounded-2xl p-5 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.7)] ${
                        isTarget
                          ? busTransfer.type === 'INVALIDATE'
                            ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.6)] scale-[1.02]'
                            : 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-[1.02]'
                          : 'border-red-950'
                      }`}>
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
                            <h3 className="font-bold text-base text-white">{core}</h3>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide ${
                            info.state === 'M' ? 'bg-red-950 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' :
                            info.state === 'E' ? 'bg-zinc-900 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' :
                            info.state === 'S' ? 'bg-zinc-900 text-amber-300 border border-amber-500' :
                            'bg-zinc-950 text-zinc-600 border border-zinc-800'
                          }`}>
                            {info.state} • {
                              info.state === 'M' ? 'Modificado' :
                              info.state === 'E' ? 'Exclusivo' :
                              info.state === 'S' ? 'Compartido' : 'Inválido'
                            }
                          </span>
                        </div>

                        <div className="bg-zinc-950 border border-red-950 rounded-xl p-3 mb-4 text-center relative overflow-hidden shadow-inner">
                          <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Caché Local L1 [Dir: 0x00]</span>
                          <span className={`text-2xl font-mono font-black mt-1 block ${
                            info.state === 'I' ? 'text-zinc-600 line-through' : 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                          }`}>
                            {info.data}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => triggerMesiAction(core, 'read')}
                            className="bg-zinc-900 hover:bg-cyan-600 text-xs font-bold py-2.5 rounded-xl text-zinc-200 hover:text-white transition border border-red-950 shadow-md"
                          >
                            Leer Dato
                          </button>
                          <button
                            onClick={() => triggerMesiAction(core, 'write')}
                            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs font-bold py-2.5 rounded-xl text-white transition shadow-[0_0_10px_rgba(239,68,68,0.4)] border border-red-400"
                          >
                            Escribir Dato
                          </button>
                        </div>
                      </div>

                      <div className="h-12 w-1.5 bg-red-950 relative flex items-center justify-center my-1 rounded-full overflow-hidden shadow-[0_0_5px_rgba(239,68,68,0.3)]">
                        {isTarget && (
                          <div className={`w-full h-full animate-pulse ${
                            busTransfer.type === 'INVALIDATE' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
                          }`}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={`relative rounded-xl border-2 py-3 px-6 text-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${
                busTransfer.active
                  ? busTransfer.type === 'INVALIDATE'
                    ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : 'bg-zinc-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'bg-black border-red-950'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Bus Compartido del Sistema (Snooping Bus)
                  </span>
                  {busTransfer.active ? (
                    <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold animate-bounce ${
                      busTransfer.type === 'INVALIDATE'
                        ? 'bg-red-600/30 text-white border border-red-500 shadow-[0_0_10px_#ef4444]'
                        : 'bg-cyan-600/30 text-cyan-200 border border-cyan-400 shadow-[0_0_10px_#22d3ee]'
                    }`}>
                      {busTransfer.type === 'INVALIDATE'
                        ? `⚡ SEÑAL INVALIDATE (${busTransfer.source} → Otros)`
                        : `📦 PAQUETE DE DATOS: ${busTransfer.payload} (${busTransfer.source} → ${busTransfer.target})`}
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-zinc-600">Sin tráfico activo</span>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="h-10 w-2 bg-red-950 relative my-1 rounded-full overflow-hidden shadow-[0_0_5px_rgba(239,68,68,0.3)]">
                  {busTransfer.active && (busTransfer.source === 'RAM' || busTransfer.message.includes('RAM')) && (
                    <div className="w-full h-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
                  )}
                </div>
              </div>

              <div className={`max-w-md mx-auto bg-black border-2 rounded-2xl p-5 text-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${
                busTransfer.active && (busTransfer.source === 'RAM' || busTransfer.message.includes('RAM'))
                  ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)]'
                  : 'border-red-950'
              }`}>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 block mb-1">
                  Memoria Principal (RAM)
                </span>
                <div className="bg-zinc-950 border border-red-950 rounded-xl py-2.5 px-4 inline-block mt-1 shadow-inner">
                  <span className="text-xs text-zinc-400 mr-3 font-mono">Dirección 0x00:</span>
                  <span className="text-xl font-mono font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{ramData}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 4: MATRICES Y BLOQUES (LOOP TILING) */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 relative">
            <div className="bg-zinc-950 border border-emerald-900/50 rounded-2xl p-6 shadow-[0_0_35px_rgba(16,185,129,0.1)]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-emerald-400">Simulador Visual de Loop Tiling y Caché L1</h2>
                  <p className="text-zinc-400 text-sm">Compara cómo la CPU recorre la memoria de forma lineal vs. agrupada en bloques.</p>
                </div>

                <div className="flex bg-black p-1 rounded-xl border border-emerald-950">
                  <button
                    onClick={() => { setTilingMode('normal'); setVisitedCells([]); setCacheStats({ hits: 0, misses: 0 }); }}
                    disabled={isSimulatingMatrix}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      tilingMode === 'normal' ? 'bg-zinc-800 text-white border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Sin Tiling (Lineal)
                  </button>
                  <button
                    onClick={() => { setTilingMode('tiled'); setVisitedCells([]); setCacheStats({ hits: 0, misses: 0 }); }}
                    disabled={isSimulatingMatrix}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      tilingMode === 'tiled' ? 'bg-emerald-600 text-white border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Con Loop Tiling (Bloques)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-black p-4 rounded-xl border border-emerald-950 shadow-inner">
                <div className="flex flex-col justify-center">
                  <label className="text-xs font-bold text-zinc-400 mb-1">
                    Tamaño del Bloque: <span className="text-emerald-400 font-black">{blockSize}x{blockSize}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={blockSize}
                    disabled={isSimulatingMatrix || tilingMode === 'normal'}
                    onChange={(e) => { setBlockSize(Number(e.target.value)); setVisitedCells([]); }}
                    className="w-full accent-emerald-500 disabled:opacity-40 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-around border-y md:border-y-0 md:border-x border-emerald-950 py-2 md:py-0">
                  <div className="text-center">
                    <span className="text-[10px] uppercase text-zinc-400 block font-bold">Aciertos (Cache Hits)</span>
                    <span className="text-2xl font-mono font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]">{cacheStats.hits}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] uppercase text-zinc-400 block font-bold">Fallos (Cache Misses)</span>
                    <span className="text-2xl font-mono font-black text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)]">{cacheStats.misses}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={runMatrixSimulation}
                    disabled={isSimulatingMatrix}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-bold py-2.5 px-4 rounded-xl transition shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400 text-sm"
                  >
                    {isSimulatingMatrix ? 'Procesando en Caché...' : '▶ Simular Recorrido'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto bg-black p-5 rounded-2xl border border-emerald-950 shadow-inner">
                {Array.from({ length: matrixSize * matrixSize }).map((_, idx) => {
                  const r = Math.floor(idx / matrixSize);
                  const c = idx % matrixSize;
                  const blockId = Math.floor(r / blockSize) * Math.ceil(matrixSize / blockSize) + Math.floor(c / blockSize);
                  const colors = [
                    'bg-cyan-950/40 border-cyan-800 text-cyan-300',
                    'bg-purple-950/40 border-purple-800 text-purple-300',
                    'bg-emerald-950/40 border-emerald-800 text-emerald-300',
                    'bg-amber-950/40 border-amber-800 text-amber-300',
                  ];

                  const isCurrent = activeCell === idx;
                  const visitOrder = visitedCells.indexOf(idx);
                  const isVisited = visitOrder !== -1;

                  return (
                    <div
                      key={idx}
                      className={`h-16 flex flex-col items-center justify-center rounded-xl border-2 font-mono text-xs transition-all duration-200 relative ${
                        isCurrent
                          ? 'bg-white text-black border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.9)] z-10 font-black'
                          : isVisited
                          ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] font-bold'
                          : tilingMode === 'tiled'
                          ? colors[blockId % colors.length]
                          : 'bg-zinc-950/60 border-emerald-950/50 text-zinc-500'
                      }`}
                    >
                      <span>[{r},{c}]</span>
                      <span className="text-[10px] opacity-80 font-bold">
                        {isVisited ? `Paso #${visitOrder + 1}` : tilingMode === 'tiled' ? `Bloque ${blockId}` : 'RAM'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Pie de página */}
      <footer className="border-t border-purple-950/60 py-4 text-center text-xs text-zinc-500 bg-black">
        NexusCPU &bull; Simulador de Arquitectura de Computadoras II &bull; Edición CyberRGB ⚡
      </footer>
    </div>
  );
}