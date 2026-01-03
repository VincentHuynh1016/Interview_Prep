"""This module will contain functions related to giving feedack on the quality of the response using AI models. (GPT)"""

from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Thinking of having a list of questions and list of answers I am assuming the AI will correlate them based on index
def generate_feedback(questions: list[str], answers: list[str]) -> str:
    model = "gpt-5-mini"
    system_message = (
        "You are an expert interview coach. "
        "Evaluate the candidate’s answer in the context of the interview question. "
        "Assess how effectively the candidate uses the STAR method (Situation, Task, Action, Result). "
        "Clearly identify strengths, weaknesses, and missed opportunities. "
        "When identifying weaknesses, provide short example responses showing what the candidate "
        "could have said instead to strengthen the answer (concise STAR-style phrasing, not advice). "
        "Organize feedback into clear sections. "
        "Be concise, practical, and actionable."
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {
                "role": "user",
                "content": f"Here are the interview questions: {questions}, and here are the candidate's answers: {answers}.",
            },
        ],
    )

    return response.choices[0].message.content


if __name__ == "__main__":
    sample_questions = [
        "Describe a time you had to learn a new technology quickly?",
        "Tell me about a challenging bug you fixed?",
    ]
    sample_answers = [
        "I needed to learn a new framework on a tight deadline, so I read the documentation, built a small prototype, asked teammates for feedback, and then applied it to the project to meet the deadline successfully.",
        "I tracked a production bug causing intermittent crashes by adding logging.",
    ]
    print(generate_feedback(sample_questions, sample_answers))
