from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from pydantic import BaseModel, ValidationError
import os

app = Flask(__name__)
CORS(app)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class Message(BaseModel):
    role: str
    content: str

class Choice(BaseModel):
    message: Message

class CompletionResponse(BaseModel):
    choices: list[Choice]

@app.post('/complete')
def complete():
    data = request.get_json(force=True, silent=True) or {}
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'prompt required'}), 400
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
        )
        validated = CompletionResponse.model_validate(response.model_dump())
        content = validated.choices[0].message.content
        return jsonify({'response': content})
    except ValidationError:
        return jsonify({'error': 'Invalid response structure from OpenAI'}), 502
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
