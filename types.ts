
export type LuckyLetter = 'T' | 'B' | 'D' | 'P' | 'C' | 'S';

export interface LetterOption {
  value: LuckyLetter;
  label: string;
  description: string;
  textOverlay: string;
  getPrompt: () => string;
}
