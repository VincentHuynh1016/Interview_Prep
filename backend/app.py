from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

LATEST_RESULT = {}


@app.route("/api/sentiment", methods=["POST"])
def get_sentiment():
    from services.sentiment import roberta_sentiment_analysis

    data = request.get_json(silent=True) or {}
    interviewResponses = data.get("responses", [])

    sentiment = []
    for r in interviewResponses:
        s = roberta_sentiment_analysis(r)

        # normalize numpy → python
        if hasattr(s, "tolist"):
            s = s.tolist()
        elif hasattr(s, "item"):
            s = s.item()

        sentiment.append(s)

    LATEST_RESULT["sentiment"] = sentiment
    return jsonify({"sentiment_scores": sentiment})


@app.route("/api/quality", methods=["POST"])
def get_quality():
    from services.quality import get_sentence_embedding, compute_cosine_similarity

    data = request.get_json(silent=True) or {}
    interviewQuestions = [
        q["text"] if isinstance(q, dict) else q for q in data.get("questions", [])
    ]
    interviewResponses = data.get("responses", [])

    qualityScores = []
    for question, answer in zip(interviewQuestions, interviewResponses):
        q_emb = get_sentence_embedding(question)
        a_emb = get_sentence_embedding(answer)
        similarityScore = compute_cosine_similarity(q_emb, a_emb)
        qualityScores.append(float(similarityScore))

    LATEST_RESULT["qualityScore"] = qualityScores
    return jsonify({"quality_scores": qualityScores})


@app.route("/api/feedback", methods=["POST"])
def get_feedback():
    from services.feedback_AI import generate_feedback

    data = request.get_json(silent=True) or {}
    interviewQuestions = [
        q["text"] if isinstance(q, dict) else q for q in data.get("questions", [])
    ]
    interviewResponses = data.get("responses", [])

    feedback = str(generate_feedback(interviewQuestions, interviewResponses))

    LATEST_RESULT["feedback"] = feedback
    return jsonify({"feedback": feedback})


@app.route("/api/results", methods=["GET"])
def get_results():
    return jsonify({"results": LATEST_RESULT})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
