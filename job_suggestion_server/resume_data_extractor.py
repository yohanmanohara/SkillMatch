import os
import requests
import pdfplumber
import docx
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def fetch_resume_from_lightsail(public_url):
    """Fetches the resume from the Lightsail storage bucket public URL."""
    response = requests.get(public_url)
    if response.status_code == 200:
        file_name = public_url.split("/")[-1]
        with open(file_name, "wb") as file:
            file.write(response.content)
        return file_name
    else:
        raise Exception(f"Failed to fetch resume from {public_url}")

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF CV."""  
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(docx_path):
    """Extracts text from a DOCX CV."""
    doc = docx.Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_description(file_path):
    """Extracts a short description about the candidate from their CV."""
    file_extension = file_path.split('.')[-1]
    if file_extension == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_extension == "docx":
        text = extract_text_from_docx(file_path)
    else:
        return "Invalid file format"
    
    lines = text.split("\n")
    
    # Extract candidate's name
    name = extract_name(lines)
    
    # Generate a simple description
    description = f"{name} is a professional candidate actively seeking opportunities."
    
    return description.strip()

def extract_name(lines):
    """Extracts the candidate's name from the first 10 lines."""
    for line in lines[:10]:
        if 'References' in line or 'Referee' in line:
            continue  # Skip lines related to references
        
        name_pattern = r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)"
        name_match = re.match(name_pattern, line)
        
        if name_match:
            return name_match.group(0)
    
    return "The candidate"

# Process CV and extract candidate description
def process_cv(cv_data):
    """Processes the CV data and returns a candidate description."""  
    file_name = fetch_resume_from_lightsail(cv_data["resume_publicUrl"])
    return extract_description(file_name)
