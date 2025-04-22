import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
from lib import db  # Assuming you're importing the MongoDB connection object from a db.py file


class JobMatcher:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.db = db  # Directly use the imported DB connection

        # Fetch jobs and candidate resumes
        self.jobs = self.fetch_job_descriptions()
        self.job_embeddings = self.encode_jobs() if not self.jobs.empty else None
        self.candidates = self.fetch_resumes()

    def fetch_resumes(self):
        collection = self.db["Description"]
        resumes = list(collection.find({}, {"_id": 0, "candidate_id": 1, "description": 1}))

        return pd.DataFrame(resumes) if resumes else pd.DataFrame(columns=["candidate_id", "description"])

    def fetch_job_descriptions(self):
        collection = self.db["jobs"]
        jobs = list(collection.find({}, {"_id": 0, "title": 1, "description": 1}))

        if not jobs:
            print("Warning: No job data retrieved from the database. The server will continue running.")
            return pd.DataFrame(columns=["title", "description"])

        df = pd.DataFrame(jobs)

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

    def suggest_jobs(self):
        if self.job_embeddings is None:
            print("Warning: No job data available for suggestions. Returning empty results.")
            return {}

        job_suggestions = {}

        for _, candidate in self.candidates.iterrows():
            candidate_id, resume_text = candidate["candidate_id"], candidate["description"]

            if not isinstance(resume_text, str) or not resume_text.strip():
                continue  # Skip empty resumes

            candidate_embedding = self.encode_text(resume_text)
            
            # Compute similarity between candidate embedding and all job embeddings
            similarities = cosine_similarity(candidate_embedding, self.job_embeddings).flatten()
            
            # Get top 3 job recommendations based on similarity
            top_jobs = similarities.argsort()[::-1][:3]  # Get indices of top 3 jobs
            recommended_jobs = self.jobs.iloc[top_jobs]['title'].tolist()

            job_suggestions[candidate_id] = recommended_jobs
        
        return job_suggestions
