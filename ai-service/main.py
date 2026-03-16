from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="Malicious URL Detector API")

# Load model
MODEL_PATH = "model/model.pkl"
model = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("AI Model loaded successfully.")
else:
    print("Warning: Model file not found. Please run train_model.py first.")

class URLRequest(BaseModel):
    url: str

def extract_features(url: str):
    return [
        len(url),                          # Length of URL
        url.count('.'),                    # Number of dots
        url.count('/'),                    # Number of slashes
        1 if '-' in url else 0,            # Presence of hyphen
        sum(c.isdigit() for c in url),     # Number of digits
        1 if any(x in url for x in ['login', 'verify', 'update', 'secure', 'bank', 'free', 'win']) else 0 # Suspicious keywords
    ]

@app.post("/predict")
async def predict(request: URLRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        features = np.array([extract_features(request.url)])
        prediction = model.predict(features)
        
        result = "malicious" if prediction[0] == 1 else "safe"
        return {"url": request.url, "prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
