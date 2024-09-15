from PIL import Image
from fastapi import FastAPI
from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from starlette.datastructures import UploadFile as StarletteUploadFile
from typing import Any

from valid import validate_image
from classify import classify_image
from helper import fetchImage
# from text_generate import Prompt, generate_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/generate")
# async def generate_text_route(prompt: Prompt):
#     return await generate_text(prompt)


@app.post("/upload/")
async def upload_image(item: Any = Form(None)):
    try:
        if isinstance(item, StarletteUploadFile):
            image = Image.open(item.file).convert("RGB")
        else:
            image = fetchImage(item)
    except:
        return JSONResponse(content="Image not supported")

    try:
        validResponse = validate_image(image)
    except:
        return JSONResponse(content="Image not supported")

    try:
        classifyResponse = classify_image(image)
    except:
        return JSONResponse(content="Image not supported")

    return JSONResponse(
        content={
            "valid": validResponse,
            "class": classifyResponse,
        }
    )


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read())
