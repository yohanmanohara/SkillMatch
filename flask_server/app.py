from flask import Flask, jsonify, request
import os
from models import JobMatcher, Model
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
from utils import extract_resume_entities

# Initialize Flask app
app = Flask(__name__)

# Initialize models
job_matcher = JobMatcher()
candidate_matcher = Model()

# Load NER pipeline
ner_model_name = "dslim/bert-base-NER"
ner_tokenizer = AutoTokenizer.from_pretrained(ner_model_name)
ner_model = AutoModelForTokenClassification.from_pretrained(ner_model_name)
ner_pipeline = pipeline("ner", model=ner_model, tokenizer=ner_tokenizer, aggregation_strategy="simple")

# === ROUTES ===

@app.route('/api/job_suggestion', methods=['POST'])
def suggest_jobs():
    # Get the 'id' parameter from the query string
    user_id = request.args.get('id')

    if not user_id:
        return jsonify({"message": "ID parameter is required"}), 400

    # Call the suggest_jobs_for_candidate method
    suggested_jobs = job_matcher.suggest_jobs_for_candidate(user_id)

    if not suggested_jobs:
        return jsonify({"message": "No jobs found for the candidate"}), 404

    return jsonify({"user_id": user_id, "suggested_jobs": suggested_jobs}), 200




@app.route('/api/candidate_suggestion', methods=['POST'])
def suggest_candidates():
    """Suggest top 3 candidates for given job description."""
    data = request.get_json()
    job_description = data.get("description", "")

    if not job_description:
        return jsonify({"error": "Missing job description"}), 400

    suggestions = candidate_matcher.get_suggestions(job_description)
    return jsonify({"suggested_candidates": suggestions})

@app.route("/api/resume_extractor", methods=["POST"])
def extract():
    data = request.get_json()
    user_id = data.get("user_id")
    aws_link = data.get("aws_pdf_url")

    if not user_id or not aws_link:
        return jsonify({"error": "Missing user_id or aws_pdf_url"}), 400

    try:
        summary, raw_entities = extract_resume_entities(user_id, aws_link)
        return jsonify({
            "user_id": user_id,
            "summary": summary,
            "entities": [{"token": token, "label_id": label, "label": LABEL_MAP.get(label, "OTHER")} for token, label in raw_entities]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === START SERVER ===

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)