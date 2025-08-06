from flask import Flask
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not set")

openai_client = OpenAI(api_key=api_key)

@app.route('/')
def index():
    return 'Backend is running'

if __name__ == '__main__':
    app.run(debug=True)
