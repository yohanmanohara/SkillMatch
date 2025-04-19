from flask import Flask, jsonify, request
from models import JobMatcher, Model
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

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
    """Suggest top 3 jobs for each candidate in DB."""
    suggestions = job_matcher.suggest_jobs()
    return jsonify(suggestions)

@app.route('/api/candidate_suggestion', methods=['POST'])
def suggest_candidates():
    """Suggest top 3 candidates for given job description."""
    data = request.get_json()
    job_description = data.get("description", "")

    if not job_description:
        return jsonify({"error": "Missing job description"}), 400

    suggestions = candidate_matcher.get_suggestions(job_description)
    return jsonify({"suggested_candidates": suggestions})

@app.route('/api/resume_extractor', methods=['POST'])
def resume_extractor():
    """Extract structured data from resume using NER."""
    data = request.get_json()
    resume_text = data.get("resume", "")

    if not resume_text:
        return jsonify({"error": "Missing resume text"}), 400

    ner_results = ner_pipeline(resume_text)

    structured_data = {}
    for entity in ner_results:
        label = entity["entity_group"]
        word = entity["word"]
        structured_data.setdefault(label, []).append(word)

    return jsonify(structured_data)

# === START SERVER ===

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
