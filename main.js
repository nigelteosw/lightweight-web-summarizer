import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0';

const summarization = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
const longTextInput = document.getElementById('long-text-input');
const generateButton = document.getElementById('generate-button');
const output = document.getElementById('output-div');
const spinner = document.getElementById('spinner');

generateButton.addEventListener('click', async () => {
    spinner.classList.add('show');
    generateButton.setAttribute("disabled", true);

    const input = longTextInput.value.trim();
    const wordCount = input.split(/\s+/).length;

    // Estimate token count (Bart tokenizer uses ~1.3-1.5 tokens per word)
    const estimatedTokenCount = Math.floor(wordCount * 1.4);

    const min_length = Math.floor(estimatedTokenCount * 0.5);  // 50% of tokens
    const max_length = Math.floor(estimatedTokenCount * 0.9);  // 90%

    const result = await summarization(input, {
        min_length: 120,  // ~3–6 sentences
        max_length: 250,  // optional, to cap it
      });

    output.innerHTML = result[0].summary_text;
    spinner.classList.remove('show');
    generateButton.removeAttribute("disabled");
    output.style.display = 'block';
});

