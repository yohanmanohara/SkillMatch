import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
print(MONGO_URI)
client = MongoClient(MONGO_URI)
db = client["recruitwise"]
# collection = db["jobs"]  
