from flask import Flask, request, jsonify
from pdfminer.high_level import extract_text
import re
import pandas as pd
import tempfile
import os
from collections import defaultdict
import time

app = Flask(__name__)

# Load datasets
print("Loading datasets...")
start_time = time.time()

skills_job_df = pd.read_csv("skills_job_dataset.csv")
skills_taxonomy = pd.read_csv("skills_taxonomy.csv")

# Pre-process data for faster lookups with consistent lowercase
JOB_SUGGESTIONS = defaultdict(list)
for _, row in skills_job_df.iterrows():
    skills = str(row['Key_Skills']).strip()
    job = str(row['Job_Title']).strip()
    if skills and job:
        # Handle both pipe and comma separated skills
        for skill in (s.strip().lower() for s in re.split(r'[|,]', skills) if s.strip()):
            JOB_SUGGESTIONS[skill].append(job)

# Create reverse mapping for faster skill categorization with lowercase
SKILL_TO_CATEGORY = {}
for _, row in skills_taxonomy.iterrows():
    category = str(row['category']).strip()
    skills = [s.strip().lower() for s in str(row['skills']).split(',') if s.strip()]
    if category and skills:
        for skill in skills:
            SKILL_TO_CATEGORY[skill] = category

print(f"Datasets loaded in {time.time() - start_time:.2f} seconds")

def extract_skills(text):
    """Optimized skill extraction with consistent lowercase output"""
    found_skills = set()
    text_lower = text.lower()
    
    # Single pass through all known skills
    for skill in SKILL_TO_CATEGORY:
        if re.search(rf'\b{re.escape(skill)}\b', text_lower):
            found_skills.add(skill)  # Skills are already stored in lowercase
    
    # Look for skills sections
    skill_patterns = [
        r'(?:skills|technologies|expertise):?\s*([^\n]+)',
        r'(?:proficient in|experienced with|knowledge of)\s+([\w\s\+#]+)'
    ]
    
    for pattern in skill_patterns:
        for match in re.finditer(pattern, text, re.IGNORECASE):
            if match.group(1):
                skills = [s.strip().lower() for s in re.split(r'[,/&|]', match.group(1)) if s.strip()]
                found_skills.update(s for s in skills if len(s) > 2)
    
    return sorted(found_skills)

def get_job_suggestions(skill_list):
    """Optimized job suggestions with case-insensitive matching"""
    job_scores = defaultdict(int)
    
    # Input skills are already lowercase from extract_skills
    for skill in skill_list:
        if skill in JOB_SUGGESTIONS:
            for job in JOB_SUGGESTIONS[skill]:
                job_scores[job] += 1
    
    # Return top 10 jobs by score
    return [job for job, _ in sorted(job_scores.items(), key=lambda x: (-x[1], x[0]))][:10]

@app.route('/process_cv', methods=['POST'])
def process_cv():
    start_time = time.time()
    try:
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        
        # If user does not select file, browser submits empty part
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        if file and file.filename.lower().endswith('.pdf'):
            # Save the file temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                file.save(tmp_file.name)
                pdf_path = tmp_file.name
            
            try:
                # Extract text from PDF
                text = extract_text(pdf_path)
                
                if not text:
                    return jsonify({"error": "No text extracted"}), 400
                
                # Process the text
                skills = extract_skills(text)
                job_suggestions = get_job_suggestions(skills)
                
                return jsonify({
                    "skills": skills,
                    "job_suggestions": job_suggestions,
                    "processing_time": f"{time.time() - start_time:.2f} seconds",
                    "status": "success"
                })
            
            finally:
                # Clean up temporary file
                if os.path.exists(pdf_path):
                    os.unlink(pdf_path)
        else:
            return jsonify({"error": "Invalid file type. Only PDF files are accepted"}), 400
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003, threaded=True)