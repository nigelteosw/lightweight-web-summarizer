import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0';

const summarization = await pipeline('summarization', 'Xenova/t5-base');
const longTextInput = document.getElementById('long-text-input');
const generateButton = document.getElementById('generate-button');
const output = document.getElementById('output-div');
const spinner = document.getElementById('spinner');

generateButton.addEventListener('click', async () => {
    spinner.classList.add('show');
    generateButton.setAttribute("disabled", true);

    const input = longTextInput.value;
    
    // Estimate length by word count (you can also use input.length / 4 for a rough token estimate)
    const wordCount = input.trim().split(/\s+/).length;

    // Set summarization length dynamically as a fraction
    const min_length = Math.floor(wordCount * 0.2); // e.g. 20% of the input
    const max_length = Math.floor(wordCount * 0.5); // cap at 50% of the input

    const result = await summarization(input, {
        min_length,
        max_length,
    });

    output.innerHTML = result[0].summary_text;
    spinner.classList.remove('show');
    generateButton.removeAttribute("disabled");
    output.style.display = 'block';
});
