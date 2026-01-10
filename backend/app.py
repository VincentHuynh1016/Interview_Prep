"""This module will be taking care of the API calls"""

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# This is where we will store all of the data
LATEST_RESULT = dict()

# This will take in each inverview response and return the sentiment score
@app.route("/api/sentiment", methods=["POST"])
def get_sentiment():
    from services.sentiment import roberta_sentiment_analysis
    # List of interview responses from the user
    data = request.get_json()
    interviewResponses = data.get("responses")
    sentiment = [roberta_sentiment_analysis(response) for response in interviewResponses]
    LATEST_RESULT["sentiment"] = sentiment

    return jsonify({"sentiment_scores": sentiment})

# This will take in each interview response and return the quality of the score using embeddings
@app.route("/api/quality", methods=["POST"])
def get_quality():
    from services.quality import get_sentence_embedding, compute_cosine_similarity
    data = request.get_json()
    interviewQuestions = data.get("questions")
    interviewResponses = data.get("responses")
    qualityScores = []
    for question, answer in zip(interviewQuestions, interviewResponses):
        questionEmbedding = get_sentence_embedding(question)
        answerEmbedding = get_sentence_embedding(answer)
        similarityScore = compute_cosine_similarity(questionEmbedding, answerEmbedding)
        qualityScores.append(similarityScore)

    LATEST_RESULT["qualityScore"] = qualityScores

    return jsonify({"quality_scores": qualityScores})


# This will take in each interview quesiton and response and give feedback
@app.route("/api/feedback", methods=["POST"])
def get_feedback():
    from services.feedback_AI import generate_feedback
    data = request.get_json()
    interviewQuestions = data.get("questions")
    interviewResponses = data.get("responses")
    feedback = generate_feedback(interviewQuestions, interviewResponses)

    LATEST_RESULT["feedback"] = feedback

    return jsonify({"feedback": feedback})

@app.route("/api/results", methods = ["GET"])
def get_results():
    return jsonify({"results": LATEST_RESULT})
