import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    PORT = int(os.getenv("PORT", 3003))