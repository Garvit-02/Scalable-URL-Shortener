# Use Python 3.11 slim version
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirement files
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Ensure model directory exists
RUN mkdir -p model

# Train the model during build (demonstration purposes)
RUN python train_model.py

# Expose port
EXPOSE 8000

# Start command
CMD ["python", "main.py"]
