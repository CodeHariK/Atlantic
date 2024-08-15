import torch
from transformers import AutoImageProcessor, EfficientNetForImageClassification

import requests
from PIL import Image
from io import BytesIO
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

image_processor = AutoImageProcessor.from_pretrained("google/efficientnet-b0")
model = EfficientNetForImageClassification.from_pretrained("google/efficientnet-b0")
model.load_state_dict(torch.load('efficientnet-b0.pt', weights_only=True))

torch.save(model.state_dict(), 'efficientnet-b0.pt')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this to specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

text_generator = pipeline("text-generation", model="gpt2")

class Prompt(BaseModel):
    text: str

@app.post("/generate")
async def generate_text(prompt: Prompt):
    results = text_generator(prompt.text, max_length=100, truncation="longest_first")
    return {"generated_text": results[0]['generated_text']}

@app.post("/upload/")
async def upload_image(
    file: UploadFile = File(None),
    url: str = Form(None)
):
    if url:
        response = requests.get(url)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
    if file:
        image = Image.open(file.file).convert("RGB")
    
    inputs = image_processor(images=image, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    top5_probabilities, top5_class_indices = torch.topk(logits.softmax(dim=-1), k=5)

    result = {}
    for index, (class_idx, probability) in enumerate(zip(top5_class_indices[0], top5_probabilities[0])):
        result[model.config.id2label[class_idx.item()]] = round(probability.item() * 100, 2)

    return JSONResponse(content=result)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read())
