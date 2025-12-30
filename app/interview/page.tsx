"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InterviewPage() {
  //Access to video element
  const videoRef = useRef<HTMLVideoElement>(null);
  //Grabs a list of interview questions
  const [questions, setQuestions] = useState<any[]>([]);
  //Holds the chat messages
  const [messages, setMessages] = useState<any[]>([]);
  //Access to chat container for scrolling
  const chatRef = useRef<HTMLDivElement | null>(null);
  //To check if the audio is unlocked
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  //Used to access the questions array
  const [qIndex, setQIndex] = useState(0);
  //To check if the interview has started
  const [started, setStarted] = useState(false);

  //Unlocks audio on first user interaction
  function unlockAudioOnce() {
    if (!audioUnlocked) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
      setAudioUnlocked(true);
    }
  }

  function startInterview() {
    unlockAudioOnce(); // browser permission
    setStarted(true); // switch panel → chat
  }

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
      setQIndex((i) => i + 1);
    };
  }

  // This if for accessing the speech synthesis
  function startSpeaking(text: string) {
    const synth = window.speechSynthesis;
    synth.cancel();

    //Get the most recent
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  }

  useEffect(() => {
    if (!questions[qIndex]) return;
    const txt = questions[qIndex].text;

    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "bot" && last?.text === txt) return prev;
      return [...prev, { role: "bot", text: txt }];
    });

    if (!audioUnlocked) return;
    startSpeaking(txt);
  }, [questions, qIndex, audioUnlocked]);

  //Scroll to bottom of chat when new message is added
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
      className="flex h-screen p-6 gap-4"
      style={{ backgroundColor: "rgb(43, 48, 59)" }}
    >
      <video
        ref={videoRef}
        autoPlay
        className="w-[92%] h-[90%] rounded-xl object-cover"
      />

      {!started ? (
        <div className="w-[30%] h-[90%] flex flex-col justify-center items-center bg-white rounded-xl text-black">
          <p className="text-2xl mb-4">Ready to join?</p>
          <Image src ="/interviewer_icon.svg" alt="interviewer_icon" width = {100} height = {100}/>
          <button
            className="bg-brand bg-blue-700 text-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3"
            onClick={startInterview}
          >
            Join call
          </button>
        </div>
      ) : (
        <div
          ref={chatRef}
          className="w-[30%] h-[90%] rounded-xl bg-white p-4 mb-4 overflow-y-auto"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                m.role === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <p
                className={
                  m.role === "bot"
                    ? "bg-cyan-200 text-black rounded-full px-4 py-2"
                    : "bg-emerald-400 text-black rounded-full px-4 py-2"
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
      )}
    </div>
  );
}

// NEXT STEP:
// What you *can* do instead:

// * **Show the first question as text immediately**, and show a big **“Start interview (enables audio)”** button.
// * Or **auto-start after any user gesture** (first click anywhere / keypress) by attaching `unlockAudioOnce` to the container.
// * Or start audio only after they click your existing **Speak** button (same idea).

// If you want it to feel automatic, the “click anywhere to start” pattern is the closest you’ll get while staying consistent across browsers.
