import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

# 1. Generate Synthetic Dataset for demonstration
# In a real scenario, you'd load a CSV of phishing/safe URLs
data = [
    {"url": "google.com", "label": 0},
    {"url": "facebook.com", "label": 0},
    {"url": "amazon.com", "label": 0},
    {"url": "apple.com", "label": 0},
    {"url": "github.com", "label": 0},
    {"url": "microsoft.com", "label": 0},
    {"url": "malicious-site.com/login", "label": 1},
    {"url": "phishing-link.net/verify", "label": 1},
    {"url": "get-free-money.biz", "label": 1},
    {"url": "secure-bank-update.info", "label": 1},
    {"url": "update-your-password.xyz", "label": 1},
    {"url": "win-iphone-now.click", "label": 1},
]

# Duplicate data to have enough for training
data = data * 50

df = pd.DataFrame(data)

# 2. Feature Extraction
def extract_features(url):
    return [
        len(url),                          # Length of URL
        url.count('.'),                    # Number of dots
        url.count('/'),                    # Number of slashes
        1 if '-' in url else 0,            # Presence of hyphen
        sum(c.isdigit() for c in url),     # Number of digits
        1 if any(x in url for x in ['login', 'verify', 'update', 'secure', 'bank', 'free', 'win']) else 0 # Suspicious keywords
    ]

X = np.array([extract_features(u) for u in df['url']])
y = df['label']

# 3. Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Save Model
if not os.path.exists('model'):
    os.makedirs('model')

joblib.dump(model, 'model/model.pkl')
print("Model trained and saved to model/model.pkl")

# Test prediction function
def predict(url):
    features = np.array([extract_features(url)])
    prediction = model.predict(features)
    return "malicious" if prediction[0] == 1 else "safe"

print(f"Test 'google.com': {predict('google.com')}")
print(f"Test 'get-free-money.biz': {predict('get-free-money.biz')}")
