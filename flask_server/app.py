from flask import Flask
from pymongo import MongoClient
import os

app = Flask(__name__)

# Initialize MongoDB connection
try:
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise ValueError("MongoDB URI not configured")
    
    client = MongoClient(mongo_uri, connectTimeoutMS=5000)
    db = client.get_default_database()
    print("✅ Connected to MongoDB successfully")
except Exception as e:
    print(f"❌ MongoDB connection failed: {str(e)}")
    raise

@app.route('/')
def health_check():
    return {
        "status": "running",
        "mongo_connected": client.server_info() is not None
    }

if __name__ == '__main__':
    port = int(os.getenv("PORT", 3003))
    app.run(host='0.0.0.0', port=port)