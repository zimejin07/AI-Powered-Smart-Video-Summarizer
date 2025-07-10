// Import necessary macros and traits for working with WebAssembly and serialization.
use wasm_bindgen::prelude::*;
use serde::Serialize;

// Define a function that summarizes the given text. The function is exposed to JavaScript via wasm_bindgen.
#[wasm_bindgen]
pub fn summarize_text(text: &str, limit: usize) -> JsValue {
    // Split the input text into sentences by splitting on '.' and trimming whitespace.
    // Filter out any sentences that have a length of 20 or less characters.
    let sentences: Vec<&str> = text
        .split('.')
        .map(str::trim)
        .filter(|s| s.len() > 20)
        .collect();

    // Score each sentence based on its length and collect them into a vector of tuples.
    let mut scored = sentences.iter()
        .map(|s| (s.to_string(), s.len()))
        .collect::<Vec<_>>();

    // Sort the sentences in descending order based on their length, assuming longer sentences are more important.
    scored.sort_by(|a, b| b.1.cmp(&a.1)); // longest = most important

    // Take the top 'limit' number of sentences, turn them back into a vector of strings.
    let summary: Vec<String> = scored.into_iter()
        .take(limit)
        .map(|(s, _)| s)
        .collect();

    // Convert the summary vector to a JsValue using serde for passing it to JavaScript, and unwrap the result.
    JsValue::from_serde(&summary).unwrap()
}
