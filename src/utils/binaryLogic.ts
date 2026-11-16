export interface BinaryItem {
  char: string;
  ascii: number;
  binary: string;
}

export function processTextToBinary(text: string): BinaryItem[] {
  return text.split('').map(char => ({
    char: char,
    ascii: char.charCodeAt(0),
    binary: char.charCodeAt(0).toString(2).padStart(8, '0')
  }));
}
