import fitz  # PyMuPDF
import torch
import requests
from transformers import LayoutLMv3Processor, LayoutLMv3ForTokenClassification
from PIL import Image
import io
import 

# Load model and processor once globally
model_name = "microsoft/layoutlmv3-base"
processor = LayoutLMv3Processor.from_pretrained(model_name, apply_ocr=True)
model = LayoutLMv3ForTokenClassification.from_pretrained(model_name)

def clean_token(token: str) -> str:
    return token.replace("Ġ", "").replace("##", "").strip()

def extract_resume_entities(user_id: str, aws_pdf_url: str):
    """
    Extract entities from a resume PDF hosted on AWS.
    
    Args:
        user_id (str): The unique user ID.
        aws_pdf_url (str): Public/signed AWS S3 URL to the user's resume PDF.
        
    Returns:
        List of tuples: Cleaned token and its predicted label ID.
    """
    print(f"[INFO] Processing resume for UserID: {user_id}")

    try:
        response = requests.get(aws_pdf_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to download the PDF: {e}")
        return []

    try:
        doc = fitz.open("pdf", response.content)
    except Exception as e:
        print(f"[ERROR] Failed to open PDF: {e}")
        return []

    all_predictions = []

    for page_num, page in enumerate(doc, start=1):
        pix = page.get_pixmap()
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")

        encoding = processor(img, return_tensors="pt")
        outputs = model(**encoding)

        logits = outputs.logits
        predictions = torch.argmax(logits, dim=-1)

        tokens = processor.tokenizer.convert_ids_to_tokens(encoding["input_ids"][0])
        labels = predictions[0].tolist()

        for token, label in zip(tokens, labels):
            if label != 0 and clean_token(token):
                all_predictions.append((clean_token(token), label))

    print(f"[INFO] Extraction complete for UserID: {user_id}")
    return all_predictions
