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