import os
import requests
import smtplib
import schedule
import time
import datetime
import pdfplumber
import docx
from dotenv import load_dotenv
from email.message import EmailMessage
import re

# Load environment variables
load_dotenv()

# Webhook and Email Configuration
WEBHOOK_URL = os.getenv("WEBHOOK_URL")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
CANDIDATE_EMAIL_ADDRESS = os.getenv("CANDIDATE_EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

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

def extract_cv_info(file_path):
    """Extracts relevant information from CV text (name, email, education, qualifications, and projects)."""
    file_extension = file_path.split('.')[-1]
    if file_extension == "pdf":
        text = extract_text_from_pdf(file_path)
    elif file_extension == "docx":
        text = extract_text_from_docx(file_path)
    else:
        return None
    
    lines = text.split("\n")
    
    # Extracting information
    personal_info = extract_personal_info(lines, text)
    education = extract_education(lines)
    qualifications = extract_qualifications(lines)
    projects = extract_projects(lines)
    
    return {
        "personal_info": personal_info,
        "education": education,
        "qualifications": qualifications,
        "projects": projects
    }

def extract_personal_info(lines, text):
    """Extracts the candidate's name, email, and phone number."""
    name = extract_name(lines)
    email = extract_email(text)
    phone = extract_phone(text)
    
    return {"name": name, "email": email, "phone": phone}

def extract_name(lines):
    """Extracts the candidate's name from the first 10 lines."""
    for line in lines[:10]:
        if 'References' in line or 'Referee' in line:
            continue  # Skip lines related to references
        
        name_pattern = r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)"
        name_match = re.match(name_pattern, line)
        
        if name_match:
            return name_match.group(0)
    
    return "Not Found"

def extract_email(text):
    """Extracts the email address from the text."""
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}"
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else "Not Provided"

def extract_phone(text):
    """Extracts the phone number from the text."""
    phone_pattern = r"\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}"
    phones = re.findall(phone_pattern, text)
    return phones[0] if phones else "Not Provided"

def extract_education(lines):
    """Extracts education details from the CV text."""
    education_keywords = ["BSc", "MSc", "PhD", "Bachelor", "Master", "Degree"]
    education = [line for line in lines if any(keyword in line for keyword in education_keywords)]
    
    return education

def extract_qualifications(lines):
    """Extracts qualifications or certifications from the CV text."""
    qualification_keywords = ["Certified", "Certification", "Certified in", "Diploma"]
    qualifications = [line for line in lines if any(keyword in line for keyword in qualification_keywords)]
    
    return qualifications

def extract_projects(lines):
    """Extracts project details from the CV text."""
    project_keywords = ["Project", "Experience", "Worked on"]
    projects = [line for line in lines if any(keyword in line for keyword in project_keywords)]
    
    return projects

def send_webhook(cv_data):
    """Sends processed CV data to webhook endpoint."""
    payload = {
        "cv_data": {
            **cv_data,
            "cv_public_link": cv_data["resume_publicUrl"]
        },
        "metadata": {
            "applicant_name": cv_data["name"],
            "email": cv_data["email"],
            "status": "prod",
            "cv_processed": True,
            "processed_timestamp": datetime.datetime.utcnow().isoformat()
        }
    }
    headers = {"X-Candidate-Email": CANDIDATE_EMAIL_ADDRESS}
    requests.post(WEBHOOK_URL, headers=headers, json=payload)

def send_followup_email(recipient_email):
    """Sends a follow-up email."""
    msg = EmailMessage()
    msg["Subject"] = "Your Job Application is Under Review"
    msg["From"] = CANDIDATE_EMAIL_ADDRESS
    msg["To"] = recipient_email
    msg.set_content("Hello,\n\nYour job application is under review. We will update you soon.\n\nBest regards,\nMetana Team")
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(CANDIDATE_EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)

# Schedule Email to be Sent the Next Day
def schedule_email(recipient_email):
    """Schedules an email to be sent at 09:00 the next day."""
    def job():
        send_followup_email(recipient_email)
    
    schedule.every().day.at("09:00").do(job)
    
    while True:
        schedule.run_pending()
        time.sleep(60)

# Process CV and store in Google Sheets
def process_cv(cv_data):
    """Processes the CV data received from the API request."""  
    file_name = fetch_resume_from_lightsail(cv_data["resume_publicUrl"])
    extracted_cv_data = extract_cv_info(file_name)
    
    # Store in Google Sheets using imported function
    sheetConnect.append_to_google_sheets([  # Assuming the function `append_to_google_sheets` is defined in googleSheetConnect
        cv_data["name"],
        cv_data["email"],
        cv_data["phone"],
        cv_data["education"],
        cv_data["qualifications"],
        cv_data["projects"],
        cv_data["resume_publicUrl"]
    ])
    
    send_webhook(cv_data)
    schedule_email(cv_data["email"])
