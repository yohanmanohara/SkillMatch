import torch  # type: ignore
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity  # type: ignore
import pandas as pd
from lib import db  # Import external DB connection

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

    def job_suggestions(self, candidate_description):
        if self.job_embeddings is None:
            print("Warning: No job data available for matching. Returning empty results.")
            return {}

        # Encode the candidate's description
        candidate_embedding = self.encode_text(candidate_description)

        # Compute similarity between candidate embedding and all job embeddings
        similarities = cosine_similarity(candidate_embedding, self.job_embeddings).flatten()

        # Get top 3 job recommendations
        top_jobs = similarities.argsort()[::-1][:3]
        job_matches = self.jobs.iloc[top_jobs]['title'].tolist()

        return job_matches
