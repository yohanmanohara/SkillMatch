import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
from lib import db  # MongoDB connection

class JobMatcher:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.db = db

        self.jobs = self.fetch_job_descriptions()
        print(f"Jobs fetched: {self.jobs.shape[0]}")  # Debugging line
        self.job_embeddings = self.encode_jobs() if not self.jobs.empty else None
        self.candidates = self.fetch_resumes()

    def fetch_resumes(self):
        resume_data_collection = self.db["resume_data"]
        resumes = list(resume_data_collection.find({}, {"_id": 0, "user_id": 1, "summary": 1}))

        structured_resumes = []

        for r in resumes:
            user_id = r.get("user_id")
            summary = r.get("summary", {})

            # Concatenate relevant fields into a single resume description
            education = " ".join(summary.get("education", []))
            skills = " ".join(summary.get("skills", []))
            experience = " ".join(summary.get("experience", []))
            projects = " ".join(summary.get("projects", []))

            full_resume_text = f"{education} {skills} {experience} {projects}"

            structured_resumes.append({
                "user_id": user_id,
                "description": full_resume_text.strip()
            })

        return pd.DataFrame(structured_resumes)

    def fetch_job_descriptions(self):
        job_collection = self.db["jobs"]
        jobs = list(job_collection.find({}, {"_id": 0, "title": 1, "description": 1}))

        if not jobs:
            print("Warning: No job data retrieved from the database.")
            return pd.DataFrame(columns=["title", "description"])

        df = pd.DataFrame(jobs)

        if "description" not in df.columns:
            print("Warning: The 'description' field is missing in the job data.")
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

    def suggest_jobs_for_candidate(self, user_id):
        candidate = self.candidates[self.candidates['user_id'] == user_id]

        if candidate.empty:
            print(f"Warning: Candidate with ID {user_id} not found.")
            return []

        resume_text = candidate.iloc[0]['description']

        if not isinstance(resume_text, str) or not resume_text.strip():
            print(f"Warning: Candidate with ID {user_id} has an empty or invalid resume.")
            return []

        candidate_embedding = self.encode_text(resume_text)
        similarities = cosine_similarity(candidate_embedding, self.job_embeddings).flatten()

        top_jobs = similarities.argsort()[::-1][:3]
        recommended_jobs = self.jobs.iloc[top_jobs]['title'].tolist()

        return recommended_jobs
