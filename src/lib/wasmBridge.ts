import init, { extract_keywords } from '../../wasm-build/pkg';

export const initWasm = async () => {
  await init();
};

export const getKeywords = (text: string): string[] => {
  return extract_keywords(text);
};