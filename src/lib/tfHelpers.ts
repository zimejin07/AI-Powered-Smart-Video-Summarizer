export const summarizeText = async (text: string): Promise<string> => {
  const sentences = text.split('.').filter(s => s.trim().length > 20);
  return sentences.slice(0, 3).join('. ') + '.';
};