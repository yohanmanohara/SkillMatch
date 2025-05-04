import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
from lib import db  # MongoDB connection

class JobMatcher:
    def __init__(self):
        # Load tokenizer and model
        print("\n[Init] Loading BERT tokenizer and model...\n")
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.db = db

        # Fetch job descriptions
        print("\n[Init] Fetching job descriptions...\n")
        self.jobs = self.fetch_job_descriptions()
        print(f"\n[Init] Jobs fetched: {self.jobs.shape[0]}\n")  # Debugging job count

        # Encode job descriptions if available
        if not self.jobs.empty:
            print("\n[Init] Encoding job descriptions...\n")
            self.job_embeddings = self.encode_jobs()
            print(f"\n[Init] Job embeddings shape: {self.job_embeddings.shape}\n")  # Debugging embedding shape
        else:
            print("\n[Init] No job descriptions tfo encode.\n")
            self.job_embeddings = None

        # Fetch resume data
        print("\n[Init] Fetching resumes...\n")
        self.candidates = self.fetch_resumes()
        print(f"\n[Init] Resumes fetched: {self.candidates.shape[0]}\n")  # Debugging resume count

    def fetch_resumes(self):
        resume_data_collection = self.db["resume_data"]
        resumes = list(resume_data_collection.find({}, {"_id": 0, "user_id": 1, "summary": 1}))
        print(f"\n[fetch_resumes] Raw resumes retrieved: {len(resumes)}\n")  # Debugging raw resume count

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

        print(f"\n[fetch_resumes] Structured resumes created: {len(structured_resumes)}\n")  # Debugging final resume count
        return pd.DataFrame(structured_resumes)

    def fetch_job_descriptions(self):
        job_collection = self.db["jobs"]
        jobs = list(job_collection.find({}, {"_id": 1, "title": 1, "description": 1}))
        print(f"\n[fetch_job_descriptions] Jobs retrieved: {len(jobs)}\n")  # Debug

        if not jobs:
            print("\n[fetch_job_descriptions] Warning: No job data retrieved.\n")
            return pd.DataFrame(columns=["_id", "title", "description"])

        # Convert ObjectId to string for JSON compatibility
        for job in jobs:
            job['_id'] = str(job['_id'])

        df = pd.DataFrame(jobs)

        if "description" not in df.columns:
            print("\n[fetch_job_descriptions] Warning: 'description' field missing.\n")
            return pd.DataFrame(columns=["_id", "title", "description"])

        return df


    def encode_jobs(self):
        if self.jobs.empty:
            print("\n[encode_jobs] Warning: No jobs to encode.\n")
            return None

        descriptions = self.jobs['description'].tolist()
        print(f"\n[encode_jobs] Encoding {len(descriptions)} job descriptions...\n")  # Debugging encoding job count

        # Tokenize and encode job descriptions using BERT
        encodings = self.tokenizer(descriptions, padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)

        job_embeddings = outputs.last_hidden_state.mean(dim=1)  # Use mean pooling
        print(f"\n[encode_jobs] Job embeddings generated with shape: {job_embeddings.shape}\n")  # Debugging shape
        return job_embeddings

    def encode_text(self, text):
        # Encode a single piece of text
        print(f"\n[encode_text] Encoding text: {text[:100]}...\n")  # Show preview of text
        encodings = self.tokenizer([text], padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)

        embedding = outputs.last_hidden_state.mean(dim=1)
        print(f"\n[encode_text] Text embedding shape: {embedding.shape}\n")  # Debugging shape
        return embedding

    def suggest_jobs_for_candidate(self, user_id):
        print(f"\n[suggest_jobs_for_candidate] All candidate user_ids: {self.candidates['user_id'].tolist()}\n")
        print(f"\n[suggest_jobs_for_candidate] Finding candidate with ID: {user_id}\n")
        candidate = self.candidates[self.candidates['user_id'].astype(str) == str(user_id)]

        if candidate.empty:
            print(f"\n[suggest_jobs_for_candidate] Warning: No candidate found with ID {user_id}\n")
            return []

        resume_text = candidate.iloc[0]['description']
        print(f"\n[suggest_jobs_for_candidate] Resume text length: {len(resume_text)}\n")  # Debugging length

        if not isinstance(resume_text, str) or not resume_text.strip():
            print(f"\n[suggest_jobs_for_candidate] Warning: Invalid resume for ID {user_id}\n")
            return []

        candidate_embedding = self.encode_text(resume_text)

        # Compare with all job embeddings
        print("\n[suggest_jobs_for_candidate] Calculating cosine similarity with job embeddings...\n")
        similarities = cosine_similarity(candidate_embedding, self.job_embeddings).flatten()
        print(f"\n[suggest_jobs_for_candidate] Similarities: {similarities}\n")  # Debugging similarity scores

        # Get top 3 recommended jobs
        top_jobs = similarities.argsort()[::-1][:3]
        print(f"\n[suggest_jobs_for_candidate] Top job indices: {top_jobs}\n")  # Debugging indices

        recommended_jobs = self.jobs.iloc[top_jobs][['_id', 'title']].to_dict(orient='records')
        print(f"\n[suggest_jobs_for_candidate] Recommended jobs: {recommended_jobs}\n")  # Final output
        return recommended_jobs

