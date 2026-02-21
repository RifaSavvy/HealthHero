from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import pytesseract
from PIL import Image
import os

app = FastAPI()

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = "../data"

# ---------- HOME ROUTE ----------
@app.get("/")
def home():
    return {"message": "HealthHero Backend Running 🚀"}

# ---------- TEXT EXTRACTION ----------
def extract_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_image(path):
    return pytesseract.image_to_string(Image.open(path))

# ---------- ANALYZE ROUTE ----------
@app.post("/analyze")
async def analyze(file: UploadFile):

    os.makedirs(DATA_PATH, exist_ok=True)
    path = f"{DATA_PATH}/{file.filename}"

    with open(path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".pdf"):
        text = extract_pdf(path)
    else:
        text = extract_image(path)

    summary = text[:800] if text else "No text detected."

    return {"summary": summary}