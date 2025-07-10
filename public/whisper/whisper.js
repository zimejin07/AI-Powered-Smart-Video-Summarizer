// public/whisper/whisper.js
window.whisper = {
  async loadModel(path) {
    console.log('[Whisper] Mock model loaded from:', path);
    // simulate async load
    return new Promise((res) => setTimeout(res, 500));
  },

  async transcribe(audioBytes, lang = 'en') {
    console.log('[Whisper] Mock transcription for language:', lang);
    return {
      text: "This is a mock transcription using whisper-wasm.",
    };
  }
};
