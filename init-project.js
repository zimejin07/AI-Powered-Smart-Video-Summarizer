const fs = require("fs");
const path = require("path");

const dirs = [
  "rust/src",
  "public",
  "src/components",
  "src/hooks",
  "src/lib",
  "src/pages",
  "src/styles",
  "wasm-build",
];

const files = {
  "rust/Cargo.toml": `
[package]
name = "video_summarizer"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
  `.trim(),

  "rust/src/lib.rs": `
use wasm_bindgen::prelude::*;
use serde::Serialize;

#[wasm_bindgen]
pub fn extract_keywords(text: &str) -> JsValue {
    let keywords = do_keyword_extraction(text);
    JsValue::from_serde(&keywords).unwrap()
}

fn do_keyword_extraction(text: &str) -> Vec<String> {
    text.split_whitespace()
        .filter(|w| w.len() > 4)
        .map(|w| w.to_lowercase())
        .collect()
}
  `.trim(),

  "src/lib/wasmBridge.ts": `
import init, { extract_keywords } from '../../wasm-build/pkg';

export const initWasm = async () => {
  await init();
};

export const getKeywords = (text: string): string[] => {
  return extract_keywords(text);
};
  `.trim(),

  "src/lib/tfHelpers.ts": `
export const summarizeText = async (text: string): Promise<string> => {
  const sentences = text.split('.').filter(s => s.trim().length > 20);
  return sentences.slice(0, 3).join('. ') + '.';
};
  `.trim(),

  "src/components/VideoPlayer.tsx": `
export const VideoPlayer = () => {
  return <div>TODO: Video Player</div>;
};
  `.trim(),

  "src/pages/index.tsx": `
export default function Home() {
  return <div className="p-4">Hello, AI Video Summarizer</div>;
}
  `.trim(),

  "README.md": `
# AI-Powered Smart Video Summarizer

Client-side app to transcribe, summarize, and extract keywords from videos using TensorFlow.js and Rust + WebAssembly.
  `.trim(),

  ".gitignore": `
node_modules
.next
wasm-build/pkg
dist
  `.trim(),

  "package.json": `
{
  "name": "ai-video-summarizer",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@tensorflow/tfjs": "^4.0.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
  `.trim(),
};

// Create folders
dirs.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`📁 Created: ${dir}`);
});

// Create files
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content);
  console.log(`📄 Created: ${filePath}`);
}

console.log(
  "\n✅ Project initialized. Run `cd` into the project and install dependencies."
);
