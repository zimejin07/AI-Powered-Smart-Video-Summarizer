// Define the whisper object on the global window object
window.whisper = {
  // Asynchronous function to simulate loading a model
  async loadModel(path) {
    // Log the path from which the model is supposedly loaded
    console.log("[Whisper] Mock model loaded from:", path);

    // Simulate an asynchronous loading process using a Promise
    // with a 500ms delay before it resolves.
    return new Promise((res) => setTimeout(res, 500));
  },

  // Asynchronous function to simulate transcribing audio data
  async transcribe(audioBytes, lang = "en") {
    // Log the language being used for transcription
    console.log("[Whisper] Mock transcription for language:", lang);

    // Return a mock transcription result as an object containing text
    return {
      text: "This is a mock transcription using whisper-wasm.",
    };
  },
};
