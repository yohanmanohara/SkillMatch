import torch  # type: ignore
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity  # type: ignore
import pandas as pd
from lib import db  # Import external DB connection
import json
from bson import ObjectId 

class JobMatcher:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.db = db  # Directly use the imported DB connection

        # Fetch jobs and encode job descriptions
        self.jobs = self.fetch_job_descriptions()
        self.job_embeddings = self.encode_jobs() if not self.jobs.empty else None

    def fetch_job_descriptions(self):
        collection = self.db["jobs"]
        
        # Fetch all job listings without specifying fields
        jobs = list(collection.find({}))  # Fetch all documents in the "jobs" collection
        # print("Raw jobs fetched from DB:", jobs)
        
        if not jobs:
            print("Warning: No job data retrieved from the database. The server will continue running.")
            return pd.DataFrame(columns=["title", "description"])

        # Create DataFrame from the fetched job listings
        df = pd.DataFrame(jobs)

        # Check if the "description" field exists in the data
        if "description" not in df.columns:
            print("Warning: The 'description' field is missing in the job data. The server will continue running.")
            return pd.DataFrame(columns=["title", "description"])

        return df


    def encode_jobs(self):
        if self.jobs.empty:
            return None
        descriptions = self.jobs['description'].tolist()
        encodings = self.tokenizer(descriptions, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)
        
        return outputs.last_hidden_state.mean(dim=1)

    def encode_text(self, text):
        encodings = self.tokenizer([text], padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)
        return outputs.last_hidden_state.mean(dim=1)



 # Import ObjectId from pymongo

    def fetch_job_descriptions(self):
        collection = self.db["jobs"]
        
        # Fetch all job listings
        jobs = list(collection.find({}))

        if not jobs:
            print("Warning: No job data retrieved from the database.")
            return pd.DataFrame(columns=["_id", "title", "description"])

        # Convert `_id` field to string to make it JSON serializable
        for job in jobs:
            job["_id"] = str(job["_id"])  # Convert ObjectId to string

        return pd.DataFrame(jobs)

