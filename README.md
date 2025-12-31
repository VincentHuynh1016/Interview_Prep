---

# 🎤 Interview Prep

A web-based interview practice tool that simulates a real interview experience using **video, voice, and AI-style prompts**.
Designed to help users practice answering interview questions aloud in a realistic, distraction-free environment.

---

## ✨ Features

* 🎥 **Live webcam preview** (browser-based)
* 🗣️ **AI voice reads interview questions aloud**
* 💬 **Chat-style interview interface**
* 🎙️ **Speech-to-text answers** (voice input)
* 🔊 **Speaking indicator** (animated dots → bars while AI speaks)
* ▶️ **“Join Call” flow** to satisfy browser audio permissions
* 📜 Questions loaded from a local JSON file (easy to extend)

---

## 🧠 How It Works

1. User clicks **Join Call**
   → unlocks browser audio permissions
2. First interview question appears and is spoken aloud
3. User answers by clicking **Speak**
4. Speech is transcribed and shown in chat
5. Next question is automatically asked and spoken

The experience mimics a real video interview call.

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **React**
* **Web Speech API**

  * `SpeechSynthesis` (AI voice)
  * `SpeechRecognition` (user voice input)
* **Tailwind CSS**
* Browser-native APIs (no backend required)

---

## 📁 Project Structure

```
app/
├── page.tsx          # Landing page
├── interview/
│   └── page.tsx      # Interview experience
public/
├── questions.json    # Interview questions
├── interview.svg
```

---

## 📄 Example `questions.json`

```json
{
  "questions": [
    { "text": "Tell me about yourself." },
    { "text": "Describe a challenge you overcame." },
    { "text": "Why are you interested in this role?" }
  ]
}
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open:
👉 `http://localhost:3000`

---
