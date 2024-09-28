import requests
import json

# The URL of your Node.js API endpoint
url = 'http://localhost:3000/addApplicant'

# Example JSON object (result from your Python file)
applicant_data = {
        "ID": 1003,
        "Number_of_Jobs": 1,
        "Number_of_Adjectives": 75,
        "Number_of_Degrees": 0,
        "Number_of_Certificates": 0,
        "Years_of_Experience": 2,
        "Soft_skill_count": 3,
        "Technical_skill_count": 1,
        "Weighted_Score": 30.25,
        "Risk_Category": "Risky"
    }

# Send a POST request with the JSON data
response = requests.post(url, json=applicant_data)

# Check the response from the server
if response.status_code == 200:
    print("Applicant added successfully!")
else:
    print(f"Failed to add applicant. Status code: {response.status_code}")
    print(f"Response: {response.text}")
