"""
We are going to be implementing sentiment analysis using pythons natural language
toolkid (NLTK) then we will create a more complex model using roBERTa provided by
Hugging Face
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

plt.style.use("ggplot")
import nltk


# Tokenize the text into words (Need to convert text into some format that the computer can interpret)
def word_tokenize(text):
    return nltk.word_tokenize(text)


# Part of speech tagging
def pos_tagging(tokens):
    return nltk.pos_tag(tokens)


# Take recommnded name entity chunker to chunk the given list of tagged tokens (Groups the text into meaningful phrases)
# Takes POS-tagged words → groups them into named entities
def named_entity_chunker(tagged_tokens):
    return nltk.chunk.ne_chunk(tagged_tokens)


"""FIRST APPROACH: Sentiment Analysis using VADER (valence aware dictionary and sentiment reasoner) 

We will be using NLTK's SentimentIntensityAnalyzer to get the negative, neutral, positive scores of the text.

This uses a Bag of words approach:
    1. Stop words are removed
    2. Each word is scored and combined to a total score
"""

from nltk.sentiment import SentimentIntensityAnalyzer
from tqdm.notebook import tqdm


def vader_sentiment_analysis(text):
    sia = SentimentIntensityAnalyzer()
    sentiment = sia.polarity_scores(text)
    return sentiment


"""SECOND APPROACH: Sentiment Analysis using RoBERTa from Hugging Face

- Use a model trained on a large corpus of data
- Transformer model accounts for the words but also the context related to other words
"""

from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModel,
    AutoModelForMaskedLM,
)
from scipy.special import softmax


# USE IS TO DETECT NEGATIVE TONES, WE WILL USE SOMETHING ELSE TO SCORE THE ANSWERS
def roberta_sentiment_analysis(text):
    MODEL = "siebert/sentiment-roberta-large-english"
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)

    encoded_text = tokenizer(text, return_tensors="pt")
    model_output = model(**encoded_text)
    scores = model_output[0][0].detach().numpy()
    # It is going to be given in the order, Negative, Positive
    scores = softmax(scores)
    return scores


if __name__ == "__main__":
    sample = "I love programming! It is so much fun and rewarding"
    print(roberta_sentiment_analysis(sample))
