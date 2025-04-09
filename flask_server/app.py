from flask import Flask, jsonify
from models import JobMatcher  # Import the updated JobMatcher model

app = Flask(__name__)

# Initialize the job matching model
matcher = JobMatcher()

@app.route('/api/resume_extractor', methods=['POST'])
def match():
    # Find matching candidates for job descriptions
    candidate_matches = matcher.match_candidates()
    return jsonify(candidate_matches)

@app.route('/api/job_suggestion', methods=['POST'])
def match():
    # Find matching candidates for job descriptions
    candidate_matches = matcher.match_candidates()
    return jsonify(candidate_matches)

@app.route('/api/candidate_suggestion', methods=['POST'])
def match():
    # Find matching candidates for job descriptions
    candidate_matches = matcher.match_candidates()
    return jsonify(candidate_matches)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)