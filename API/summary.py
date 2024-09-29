from flask import Flask, request, jsonify
import google.generativeai as genai
import pdfplumber
import re
import os

# Initialize the Flask app
app = Flask(_name_)

# Set the upload folder where files will be stored
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to preprocess extracted text
def preprocess_text(text):
    text = re.sub(r'\s+', ' ', text)  # Replace multiple whitespace/newlines with a single space
    text = text.strip()
    return text

# Function to extract text from the resume PDF
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return preprocess_text(text)

# Function to determine role from the first word of the resume
def get_applied_role(resume_text):
    return resume_text.split()[0]  # Get the first word

# List of 200+ technical skills for extraction
technical_skills_list = [
    "Python", "Java", "C++", "SQL", "JavaScript", "AWS", "Cloud", "Docker", "Kubernetes", "Azure",
    # Add remaining 200+ technical skills
]

# Function to extract technical skills and calculate score
def calculate_resume_score(resume_text):
    # Find technical skills in the resume
    technical_skills = [skill for skill in technical_skills_list if skill.lower() in resume_text.lower()]

    # Example logic to calculate years of experience
    experience_years = len(re.findall(r"\b\d+ years\b", resume_text))

    # Give more score for more technical skills and experience
    score = max(5, len(technical_skills) * 10 + experience_years * 5)  # Ensure minimum score of 5
    return score, technical_skills

# Function to calculate risk factor based on soft skills
def calculate_risk_factor(resume_text):
    soft_skills = re.findall(r"\b(communication|teamwork|adaptability|leadership|problem-solving)\b", resume_text)
    risk_factor = len(soft_skills) * 2  # Increase risk for more soft skills
    return risk_factor

# Main route to upload a file
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if a file is uploaded
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        # Save the uploaded file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Step 1: Extract text from the resume PDF
        resume_text = extract_text_from_pdf(file_path)

        # Step 2: Get the applied role from the first word of the resume
        applied_role = get_applied_role(resume_text)

        # Step 3: Calculate the resume score based on technical skills and experience
        score, technical_skills = calculate_resume_score(resume_text)

        # Step 4: Calculate the risk factor based on soft skills
        risk_factor = calculate_risk_factor(resume_text)

        # Step 5: Use the Google Generative AI model to analyze the resume
        # Replace with your actual Google API key
        api_key = ''
        genai.configure(api_key=api_key)

        # Generate a summary of the resume
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"{resume_text}, give me a summary of this resume in 50 words."
        response = model.generate_content(prompt)

        # Step 6: Return the analysis as JSON
        result = {
            "applied_role": applied_role,
            "technical_skills": technical_skills,
            "resume_score": score,
            "risk_factor": risk_factor,
            "resume_summary": response.text
        }

        return jsonify(result)

    return '''
    <!doctype html>
    <title>Upload Resume</title>
    <h1>Upload Resume PDF</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

if _name_ == "_main_":
    app.run(debug=True)