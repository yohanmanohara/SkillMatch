import torch  # type: ignore
import requests
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity  # type: ignore
import pandas as pd

class JobMatcher:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')

        # Fetch jobs from API
        self.jobs = self.fetch_job_descriptions()
        self.job_embeddings = self.encode_jobs() if not self.jobs.empty else None

    def fetch_job_descriptions(self):
        """Fetch job descriptions from an external API."""
        api_url = "https://example.com/api/jobs"  # Replace with actual API URL

        try:
            response = requests.get(api_url, timeout=10)
            response.raise_for_status()
            jobs = response.json()

            if not isinstance(jobs, list) or not jobs:
                print("Warning: No job data retrieved from the API.")
                return pd.DataFrame(columns=["title", "description"])

            df = pd.DataFrame(jobs)

            if "description" not in df.columns:
                print("Warning: The 'description' field is missing in the API data.")
                return pd.DataFrame(columns=["title", "description"])

            return df

        except requests.exceptions.RequestException as e:
            print(f"Error fetching job descriptions: {e}")
            return pd.DataFrame(columns=["title", "description"])

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

    def match_candidate(self, candidate_description):
        if self.job_embeddings is None:
            print("Warning: No job data available for matching. Returning empty results.")
            return []

        if not isinstance(candidate_description, str) or not candidate_description.strip():
            return []  # Return empty list for invalid input

        candidate_embedding = self.encode_text(candidate_description)
        
        # Compute similarity between candidate embedding and all job embeddings
        similarities = cosine_similarity(candidate_embedding, self.job_embeddings).flatten()
        
        # Get top 3 job recommendations
        top_jobs = similarities.argsort()[::-1][:3]
        return self.jobs.iloc[top_jobs]['title'].tolist()
