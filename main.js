import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0';

const summarization = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
const inputEl = document.getElementById('long-text-input');
const generateBtn = document.getElementById('generate-button');
const spinner = document.getElementById('spinner');
const historyEl = document.getElementById('chat-history');

const charCounter = document.getElementById('char-counter');

inputEl.addEventListener('input', () => {
  const charCount = inputEl.value.length;
  const recommendedLimit = 1500;
  charCounter.textContent = `${charCount} / ${recommendedLimit} characters`;

  if (charCount > recommendedLimit) {
    charCounter.style.color = 'red';
    charCounter.textContent += ' — Too long, may reduce model accuracy.';
  } else {
    charCounter.style.color = '#444';
  }
});

generateBtn.addEventListener('click', async () => {
  const input = inputEl.value.trim();
  if (!input) return;

  // UI state
  spinner.classList.remove('hidden');
  generateBtn.disabled = true;

  // Estimate summary length
  const wordCount = input.split(/\s+/).length;
  const estimatedTokenCount = Math.floor(wordCount * 1.4);
  const min_length = Math.floor(estimatedTokenCount * 0.6);
  const max_length = Math.floor(estimatedTokenCount * 1);

  const result = await summarization(input, { min_length, max_length });
  const summary = result[0].summary_text;

  // Add to chat history
  appendMessage('user', input);
  appendMessage('bot', summary);

  // Reset UI
  inputEl.value = '';
  spinner.classList.add('hidden');
  generateBtn.disabled = false;
});

function appendMessage(role, text) {
  const line = document.createElement('div');
  line.className = `chat-line ${role}`;

  const div = document.createElement('div');
  div.className = `chat-entry ${role}`;
  div.textContent = text;

  line.appendChild(div);
  historyEl.appendChild(line);
  historyEl.scrollTop = historyEl.scrollHeight;
}