FROM python:3.9-slim

WORKDIR /app

# Install system dependencies (if needed for some packages)
RUN apt-get update && apt-get install -y gcc python3-dev && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

EXPOSE 3003

CMD ["flask", "run", "--host=0.0.0.0", "--port=3003"]