import torch
from torchvision import transforms, models
from torchvision.models import EfficientNet_V2_S_Weights

from PIL import Image

import json
from helper import cache_file, runModel

label_file = 'EfficientNet_V2_S.labels'
label_url = 'https://huggingface.co/shadownada/detect/resolve/main/EfficientNet_V2_S.labels?download=true'
cache_file(label_url, label_file)
with open(label_file, 'r') as file:
    labels = json.load(file)
    classes=labels["classes"]

# Load the pre-trained EfficientNet V2 Small model
MODEL_classify = models.efficientnet_v2_s(weights=EfficientNet_V2_S_Weights.DEFAULT)
MODEL_classify.eval()  # Set the model to evaluation mode

# Define the transformation pipeline
MODEL_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
MODEL_classify.to(device)

def classify_image(image: Image):
    return runModel(image, MODEL_classify, MODEL_transform, device, classes)
