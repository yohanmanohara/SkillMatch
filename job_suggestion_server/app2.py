from flask import Flask, request, jsonify
from model import JobMatcher  # Import the updated JobMatcher model
from lib import process_cv  # Import the process_cv function
from lib import db, process_cv  # Import the DB connection
from bson import ObjectId  # To handle MongoDB ObjectIDs

app = Flask(__name__)

# Initialize the job matching model
matcher = JobMatcher()

# Reference the MongoDB collection
resume_collection = db["resumes"]  # Ensure 'db' is the MongoDB client instance

@app.route('/api/job_suggestion', methods=['POST'])
def match():
    data = request.get_json()
    description = data.get("description", "").strip()

    if not description:
        return jsonify({"error": "Invalid or empty description"}), 400

    # Get job recommendations for the candidate's description
    job_suggestions = matcher.job_suggestions(description)
    return jsonify({"job_suggestions": job_suggestions})


@app.route('/api/resume_data_extractor', methods=['POST'])
def resume_data_extractor():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request data"}), 400

    # Identify the record to update (using email or ObjectId)
    identifier = data.get("email") or data.get("_id")
    
    if not identifier:
        return jsonify({"error": "Missing unique identifier (email or _id)"}), 400

    try:
        # Convert `_id` to ObjectId if necessary
        query = {"_id": ObjectId(identifier)} if "_id" in data else {"email": identifier}
        
        # Process the CV to extract relevant information
        extracted_data = process_cv(data)

        if not extracted_data:
            return jsonify({"error": "Failed to extract data"}), 500

        # Update the existing record in MongoDB
        result = resume_collection.update_one(query, {"$set": extracted_data})

        if result.matched_count == 0:
            return jsonify({"error": "No matching record found to update"}), 404

        return jsonify({
            "message": "CV processed and updated successfully",
            "matched_documents": result.matched_count
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
