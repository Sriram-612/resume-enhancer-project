from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  

generator = pipeline("text-generation", model="EleutherAI/gpt-neo-1.3B")

@app.route("/", methods=["GET"])
def home():
    return "✅ Resume Enhancer Backend is Running"

@app.route("/enhance", methods=["POST"])
def enhance():
    try:
        data = request.get_json()
        resume_text = data.get("text", "").strip()

        if not resume_text:
            return jsonify({"error": "No text provided"}), 400

        
        prompt = (
            f"You are an expert resume writer. Improve the following resume bullet point:\n"
            f"- Use strong action verbs\n"
            f"- Make it more concise and impactful\n"
            f"- Highlight measurable achievements\n"
            f"- Keep it under 30 words\n"
            f"Original: {resume_text}\n"
            f"Enhanced:"
        )

        result = generator(
            prompt,
            max_length=150,
            num_return_sequences=1,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            pad_token_id=50256
        )

        output = result[0]["generated_text"]

        if "Enhanced:" in output:
            enhanced_text = output.split("Enhanced:")[-1].strip()
        else:
            enhanced_text = output.strip()

        enhanced_text = enhanced_text.split('\n')[0] 

        return jsonify({
            "original": resume_text,
            "enhanced": enhanced_text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=3001)