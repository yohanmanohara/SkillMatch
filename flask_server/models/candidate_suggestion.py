import torch
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class Model:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.candidates = pd.DataFrame({
            'candidate_id': [101, 102],
            'resume': ["Experienced software engineer with extensive Python knowledge.", 
                       "Data scientist with experience in machine learning and Python."]
        })
        self.candidate_embeddings = self.encode_candidates()

    def encode_candidates(self):
        encodings = self.tokenizer(self.candidates['resume'].tolist(), padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)
        return outputs.last_hidden_state.mean(dim=1)

    def encode_text(self, text):
        encodings = self.tokenizer([text], padding=True, truncation=True, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**encodings)
        return outputs.last_hidden_state.mean(dim=1)

    def get_suggestions(self, job_description):
        job_embedding = self.encode_text(job_description)
        similarities = cosine_similarity(job_embedding, self.candidate_embeddings).flatten()
        suggested_candidates = similarities.argsort()[::-1][:3]
        return self.candidates.iloc[suggested_candidates]['candidate_id'].tolist()
