# 🛠️ Manual Execution Guide

Follow these steps to run the project components individually without Docker.

## Prerequisites
- **Node.js** (v20+ or v22+ recommended for Frontend/Backend)
- **Python** (3.10+ for AI Service)
- **MongoDB** (Running on `localhost:27017`)
- **Redis** (Running on `localhost:6379`)

---

## 1. Backend Setup (`url-shortener`)
1. Navigate to the directory: `cd url-shortener`
2. Install dependencies: `npm install`
3. Configure `.env` (ensure `REDIS_URL` and `MONGO_URI` point to your local instances):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
   REDIS_URL=redis://127.0.0.1:6379
   AI_SERVICE_URL=http://localhost:8000
   ```
4. Start the API server: `npm start`
5. **Start the Analytics Worker** (In a new terminal):
   ```bash
   node src/workers/analyticsWorker.js
   ```

## 2. AI Service Setup (`ai-service`)
1. Navigate to the directory: `cd ai-service`
2. Create virtual environment: `python -m venv .venv`
3. Activate venv: `.venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Train the initial model: `python train_model.py`
6. Start the service: `python main.py` (Runs on port 8000)

## 3. Frontend Setup (`frontend`)
1. Navigate to the directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the development server: `npm run dev`
5. Access the app at: `http://localhost:5173`

---

## Verification
- **API Check**: `curl -X GET http://localhost:5000/api/url/list`
- **AI Health**: `curl -X GET http://localhost:8000/health`
- **Frontend**: Open browser to `http://localhost:5173`
