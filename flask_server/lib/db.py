import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
print(MONGO_URI)
client = MongoClient(MONGO_URI)
db = client["test"]
job_collection = db["jobs"]
resume_data_collection = db["resume_data"]


# print("Document count:", collection.count_documents({}))


# for document in user_collection.find():
#     print(document)