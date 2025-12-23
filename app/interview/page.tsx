"use client";
import {useEffect, useRef, useState} from "react";

export default function InterviewPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    const [messages, setMessages] = useState([{role : "bot", text: "Tell me about yourself?"}]);
    const chatRef = useRef<HTMLDivElement | null>(null)

    const [qIndex, setQIndex] = useState(0);

    const startListening = () => {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

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
    };

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
        className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans"
        style={{ backgroundColor: "rgb(43, 48, 59)" }}
      >
        <div className="flex items-center gap-4">
          <video
            ref={videoRef}
            autoPlay
            className="w-160 h-120 rounded-lg object-cover"
          />
          <div
            ref={chatRef}
            className="bg-black text-white w-160 h-120 rounded-lg overflow-y-auto p-4 space-y-2"
          >
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "bot" ? "text-blue-400" : "text-green-400"
                }
              >
                {m.text}
              </p>
            ))}
            <button onClick={startListening}>Speak</button>
          </div>
        </div>
      </div>
    );}
