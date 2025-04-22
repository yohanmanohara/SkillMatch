import fitz  # PyMuPDF
import torch
import requests
from transformers import LayoutLMv3Processor, LayoutLMv3ForTokenClassification
from PIL import Image
import io
from collections import defaultdict

# Load model and processor globally
model_name = "microsoft/layoutlmv3-base"
processor = LayoutLMv3Processor.from_pretrained(model_name, apply_ocr=True)
model = LayoutLMv3ForTokenClassification.from_pretrained(model_name)

# Label mapping (adjust as needed)
LABEL_MAP = {
    1: "NAME",
    2: "EDUCATION",
    3: "DEGREE",
    4: "SKILL",
    5: "EXPERIENCE",
    6: "COMPANY",
    7: "POSITION",
    8: "DATE",
    9: "LOCATION",
    10: "PROJECT",
    11: "OTHER"
}

def clean_token(token: str) -> str:
    return token.replace("Ġ", "").replace("##", "").strip()

def group_entities_by_type(predictions):
    """Group tokens by their entity type for easier processing"""
    entities = defaultdict(list)
    
    for item in predictions:
        assert isinstance(item, (tuple, list)) and len(item) == 2, f"Invalid item: {item}"
        token, label = item
        label_name = LABEL_MAP.get(label, "OTHER")
        entities[label_name].append(token)
    
    return entities

def generate_summary(entities):
    """Generate structured summary from extracted entities"""
    summary = {
        "education": [],
        "skills": [],
        "experience": [],
        "projects": [],
        "location": None,
        "name": None
    }
    
    # Education
    degrees = entities.get("DEGREE", [])
    institutions = entities.get("EDUCATION", [])
    for i in range(max(len(degrees), len(institutions))):
        degree = degrees[i] if i < len(degrees) else "Unknown Degree"
        institution = institutions[i] if i < len(institutions) else "Unknown Institution"
        summary["education"].append(f"{degree} from {institution}")
    
    # Skills
    summary["skills"] = entities.get("SKILL", [])
    
    # Experience
    positions = entities.get("POSITION", [])
    companies = entities.get("COMPANY", [])
    for i in range(max(len(positions), len(companies))):
        position = positions[i] if i < len(positions) else "Unknown Position"
        company = companies[i] if i < len(companies) else "Unknown Company"
        summary["experience"].append(f"{position} at {company}")
    
    # Projects
    summary["projects"] = entities.get("PROJECT", [])
    
    # Location and Name
    summary["location"] = entities.get("LOCATION", [None])[0]
    summary["name"] = entities.get("NAME", [None])[0]

    return summary

def extract_resume_entities(user_id: str, aws_pdf_url: str):
    print(f"[INFO] Processing resume for UserID: {user_id}")

    try:
        response = requests.get(aws_pdf_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to download the PDF: {e}")
        return {}

    try:
        doc = fitz.open("pdf", response.content)
    except Exception as e:
        print(f"[ERROR] Failed to open PDF: {e}")
        return {}

    all_predictions = []

    for page_num, page in enumerate(doc, start=1):
        pix = page.get_pixmap()
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")

        # Get model predictions
        encoding = processor(img, return_tensors="pt", truncation=True, max_length=512)
        outputs = model(**encoding)
        logits = outputs.logits
        predictions = torch.argmax(logits, dim=-1).squeeze().tolist()

        # Convert input_ids to tokens
        input_ids = encoding["input_ids"].squeeze().tolist()
        tokens = processor.tokenizer.convert_ids_to_tokens(input_ids)

        print(f"Page {page_num} - Tokens: {len(tokens)}, Predictions: {len(predictions)}")

        # Ensure length match
        if len(tokens) != len(predictions):
            print(f"[WARNING] Length mismatch on page {page_num}: {len(tokens)} tokens vs {len(predictions)} predictions")
            predictions = predictions[:len(tokens)]

        # Collect predictions
        for token, label in zip(tokens, predictions):
            if label != 0:
                cleaned = clean_token(token)
                if cleaned:
                    all_predictions.append((cleaned, label))

    # Group by entity type
    entities = group_entities_by_type(all_predictions)

    # Generate structured summary
    summary = generate_summary(entities)

    print(f"[INFO] Extraction complete for UserID: {user_id}")
    return summary
