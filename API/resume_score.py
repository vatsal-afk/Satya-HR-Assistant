# Flask Resume Analyzer

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import pdfplumber
import re
import zipfile
import spacy
import pandas as pd

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

nlp = spacy.load('en_core_web_sm')

# ... [Include all helper functions here] ...

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files or 'recommendation' not in request.files:
        return jsonify({'error': 'Missing resume or recommendation file'}), 400

    resume_file = request.files['resume']
    recommendation_file = request.files['recommendation']

    with tempfile.TemporaryDirectory() as temp_dir:
        resume_path = os.path.join(temp_dir, 'resume.pdf')
        resume_file.save(resume_path)

        recommendation_path = os.path.join(temp_dir, 'recommendation.zip')
        recommendation_file.save(recommendation_path)

        resume_text = extract_text_from_pdf(resume_path)
        recommendation_texts = extract_recommendation_letters(recommendation_path, temp_dir)

        score, details = calculate_resume_score(resume_text, recommendation_texts)

        return jsonify({
            'score': score,
            'details': details
        })

if __name__ == '__main__':
    app.run(debug=True, port=3000)