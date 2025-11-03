import os
import requests
import base64
from io import BytesIO
from PIL import Image

import torch


def fetchImage(url):
    if url.startswith("data:image"):
        url = url.split(",")[1]
        image_data = base64.b64decode(url)
        image = Image.open(BytesIO(image_data))
        return image
    else:
        response = requests.get(url)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
        return image


def cache_file(url, filename):
    if not os.path.isfile(filename):
        print(f"{filename} not found. Downloading from {url}...")
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, "wb") as file:
                file.write(response.content)
            print(f"{filename} downloaded successfully.")
        else:
            raise Exception(
                f"Failed to download {filename}. Status code: {response.status_code}"
            )


def runModel(image, MODEL, MODEL_transform, device, classes):
    image_tensor = MODEL_transform(image).float()
    image_tensor = image_tensor.unsqueeze_(0)

    image_tensor = image_tensor.to(device)

    # Perform inference
    with torch.no_grad():  # Disable gradient calculation
        output = MODEL(image_tensor)  # Forward pass

    probabilities = torch.nn.functional.softmax(output, dim=-1)

    top5_probabilities, top5_class_indices = torch.topk(probabilities, k=5, dim=-1)

    result = {}
    for index, (class_idx, probability) in enumerate(
        zip(top5_class_indices[0], top5_probabilities[0])
    ):
        result[classes[class_idx.item()]] = round(probability.item() * 100, 2)

    return result
