"""This will contain functions related to scoring the quality of the answers given by the user"""

"""
This way of writing the code loads the model every time we call it 
but for optimization we can load the model once and use it multiple times
(FUTURE IMPROVEMENT)

For interview scoring with embeddings:

≥ 0.65 → Good (clearly answers the question)

0.45 – 0.65 → Neutral / partial (on topic, incomplete or vague)

< 0.45 → Bad (off-topic or weakly related)
"""
from sentence_transformers import SentenceTransformer
import torch 

def get_sentence_embedding(text):
    MODEL = "sentence-transformers/all-MPNet-base-v2"
    model = SentenceTransformer(MODEL)
    embeddings = model.encode(text)
    return embeddings

def compute_cosine_similarity(embedding1, embedding2):
    tens1 = torch.tensor(embedding1).unsqueeze(0)
    tens2 = torch.tensor(embedding2).unsqueeze(0)
    cosi = torch.nn.CosineSimilarity(dim=1)
    return cosi(tens1, tens2).item()

if __name__ == "__main__":
    sampleQuestion = "Describe a time you fixed a production bug."
    sampleAnswer = "I fixed a production bug by reproducing the issue, identifying the root cause, and deploying a tested fix."
    embedding1 = get_sentence_embedding(sampleQuestion)
    embedding2 = get_sentence_embedding(sampleAnswer)
    similarityScore = compute_cosine_similarity(embedding1, embedding2)
    print(f"This is the similarity score: {similarityScore}")
