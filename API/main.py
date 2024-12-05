from flask import Flask, request, jsonify
import os
import tempfile
import shutil

app = Flask(__name__)

# Import your analysis scripts
import fraud_detect as script1  # The Flask app from the first script
import resume_score as script2  # The script with calculate_resume_score function
import summary as script3  # The script using Google's Generative AI

UPLOAD_FOLDER = './'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def save_uploaded_file(file, filename):
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return file_path
    return None

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'resume' not in request.files or 'recommendations' not in request.files:
        return jsonify({"error": "Missing resume or recommendations file"}), 400

    resume_file = request.files['resume']
    recommendations_file = request.files['recommendations']

    resume_path = save_uploaded_file(resume_file, 'resume.pdf')
    recommendations_path = save_uploaded_file(recommendations_file, 'recommendations.zip')

    if not resume_path or not recommendations_path:
        return jsonify({"error": "Failed to save uploaded files"}), 500

    try:
        # Run analysis from script1
        script1_result = script1.analyze(resume_path, recommendations_path)

        # Run analysis from script2
        resume_text = script2.extract_text_from_pdf(resume_path)
        recommendation_texts = script2.extract_recommendation_letters(recommendations_path)
        script2_result = script2.calculate_resume_score(resume_text, recommendation_texts)

        # Run analysis from script3
        script3_result = script3.main(resume_path)

        # Combine results
        combined_result = {
            "script1_result": script1_result,
            "script2_score": script2_result,
            "script3_analysis": script3_result
        }

        return jsonify(combined_result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        # Clean up uploaded files
        if os.path.exists(resume_path):
            os.remove(resume_path)
        if os.path.exists(recommendations_path):
            os.remove(recommendations_path)

if __name__ == '__main__':
    app.run(debug=True)