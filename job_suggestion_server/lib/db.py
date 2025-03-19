import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
print(MONGO_URI)
client = MongoClient(MONGO_URI)
db_name = "test"
db = client[db_name]
print(f"Connected to Database: {db_name}")

# Select collection
collection_name = "jobs"
collection = db[collection_name]
print(f"Using Collection: {collection_name}")