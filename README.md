# lightweight-web-summarizer

This is a client-side summarization tool built using Transformers.js and the Xenova/distilbart-cnn-6-6. It runs entirely in your browser, with no backend or server interaction.

## Features
**Summarize long-form text using a powerful transformer model**

- Fast, local inference powered by WebAssembly (WASM)
- 100% privacy — your text never leaves your device
- Paragraph-by-paragraph summarization for detailed outputs
- Deployable on GitHub Pages as a static site

## How It Works

- Loads Xenova/bart-large-cnn via Transformers.js (ONNX model, pre-hosted)
- Summarizes the text
- Displays a summary in the browser

## Technologies Used
- Transformers.js (client-side Hugging Face models)
- ONNX Runtime Web (via Transformers.js backend)
- JavaScript, HTML, and minimal CSS

Hosted on GitHub Pages