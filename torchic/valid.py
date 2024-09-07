import torch
from torchvision import transforms, models
from torch import nn

import json
from helper import cache_file, runModel

MODEL_transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225])
    ])

# Define the model file path and URL
model_file = 'ResNet50.pt'
label_file = 'ResNet50.labels'
model_url = 'https://huggingface.co/shadownada/detect/resolve/main/ResNet50.pt?download=true'
label_url = 'https://huggingface.co/shadownada/detect/resolve/main/ResNet50.labels?download=true'

cache_file(model_url, model_file)
cache_file(label_url, label_file)

with open(label_file, 'r') as file:
    labels = json.load(file)
    classes=labels["classes"]

MODEL_validate = models.resnet50(weights=None)
MODEL_validate.fc = nn.Sequential(
    nn.Linear(2048, 512),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(512, 10),
    nn.LogSoftmax(dim=1))

MODEL_validate.load_state_dict(torch.load(model_file, map_location=torch.device('cpu')))

MODEL_validate.eval()

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
MODEL_validate.to(device)

def validate_image(image):
    validity = runModel(image, MODEL_validate, MODEL_transform, device, classes)
    return { "parameters" : validity, "valid" : (validity[classes[0]] + validity[classes[2]] > 70)}
