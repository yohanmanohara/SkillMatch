from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# Load model and tokenizer
model_name = "dslim/bert-base-NER"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)

# Create NER pipeline
ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

# Example text from resume
resume_text = """John Doe is a Software Engineer with 5 years of experience in Python, React, and Docker.
He graduated from MIT and worked at Google and Facebook. Email: john.doe@gmail.com"""

# Run NER
ner_results = ner_pipeline(resume_text)

# Format the result
structured_data = {}
for entity in ner_results:
    label = entity["entity_group"]
    word = entity["word"]
    structured_data.setdefault(label, []).append(word)

print(structured_data)
