from flask import Flask, request, jsonify
from model import JobMatcher  # Import the updated JobMatcher model

app = Flask(__name__)

# Initialize the job matching model
matcher = JobMatcher()

@app.route('/api/job_suggestion', methods=['POST'])
def match():
    data = request.get_json()
    description = data.get("description", "").strip()

    if not description:
        return jsonify({"error": "Invalid or empty description"}), 400

    # Get job recommendations for the candidate's description
    job_suggestions = matcher.job_suggestions(description)
    return jsonify({"job_suggestions": job_suggestions})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)