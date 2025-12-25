"use client";
import { useEffect, useRef, useState } from "react";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Tell me about yourself?" },
  ]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  //Used to access the questions array
  const [qIndex, setQIndex] = useState(0);

  //This is for accessing the speech recognition
  function startListening() {
    //Creates a new instance of speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      recognition.stop();
      setMessages((prev) => [...prev, { role: "user", text: transcript }]);
      if (!questions[qIndex + 1]) return;
      const nextQ = questions[qIndex + 1].text;
      setMessages((prev) => [...prev, { role: "bot", text: nextQ }]);
      setQIndex((i) => i + 1);
    };
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch the interview questions from local JSON file (TEMPORARY)
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions));
  }, []);

  // Permission to access webcam if so then stream video to video element
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <div
      className="flex h-screen items-start p-6 bg-zinc-900 gap-4"
      style={{ backgroundColor: "rgb(43, 48, 59)" }}
    >
      <video
        ref={videoRef}
        autoPlay
        className="w-[92%] h-[90%] rounded-xl object-cover"
      />
      <div
        ref={chatRef}
        className="w-[30%] h-[90%] rounded-xl bg-white p-4 overflow-y-auto"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <p
              className={
                m.role === "bot"
                  ? "bg-cyan-200 text-black rounded-full px-4 py-2 inline-flex items-center max-w-[70%]"
                  : "bg-emerald-400 text-black rounded-full px-4 py-2 inline-flex items-center max-w-[70%]"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
        <button className="text-black" onClick={startListening}>
          Speak
        </button>
      </div>
    </div>
  );
}
