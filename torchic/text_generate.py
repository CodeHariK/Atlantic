import torch
from transformers import pipeline
from transformers import AutoTokenizer, pipeline

from pydantic import BaseModel

# Initialize the tokenizer with the explicit setting for clean_up_tokenization_spaces
tokenizer = AutoTokenizer.from_pretrained("gpt2", clean_up_tokenization_spaces=True)

# Determine if GPU is available and set device argument accordingly
device = 0 if torch.cuda.is_available() else -1

# Initialize the text generation pipeline with GPU if available
MODEL_text_generator = pipeline("text-generation", model="gpt2", tokenizer=tokenizer, device=device)

class Prompt(BaseModel):
    text: str

async def generate_text(prompt: Prompt):
    results = MODEL_text_generator(prompt.text, max_length=100, truncation="longest_first")
    return {"generated_text": results[0]['generated_text']}
