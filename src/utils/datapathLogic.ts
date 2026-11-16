export type AluOperation = 'ADD' | 'SUB' | 'AND' | 'OR' | 'XOR';

export interface AluResult {
  operandA: number;
  operandB: number;
  operation: AluOperation;
  result: number;
  binaryA: string;
  binaryB: string;
  binaryResult: string;
  zeroFlag: boolean;
}

const to8BitBinary = (num: number): string => {
  const unsigned = num & 0xff;
  return unsigned.toString(2).padStart(8, '0');
};

export function executeAluOperation(
  a: number,
  b: number,
  op: AluOperation
): AluResult {
  let res = 0;

  switch (op) {
    case 'ADD':
      res = a + b;
      break;
    case 'SUB':
      res = a - b;
      break;
    case 'AND':
      res = a & b;
      break;
    case 'OR':
      res = a | b;
      break;
    case 'XOR':
      res = a ^ b;
      break;
  }

  return {
    operandA: a,
    operandB: b,
    operation: op,
    result: res,
    binaryA: to8BitBinary(a),
    binaryB: to8BitBinary(b),
    binaryResult: to8BitBinary(res),
    zeroFlag: (res & 0xff) === 0,
  };
}
