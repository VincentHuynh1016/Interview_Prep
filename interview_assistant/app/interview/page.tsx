"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();
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
  //To check if we have no other questions left
  const [noQuestions, setNoQuestions] = useState(false);

  //To record the user's response
  const [response, setResponse] = useState<string[]>([]);

  //Is Speaking state
  const [isSpeaking, setIsSpeaking] = useState(false);

  function handleClick() {
    router.push("/results");
    console.log("Results button has been clicked");
  }

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
      setResponse((prev) => [...prev, transcript]);
      setQIndex((i) => i + 1);
    };
  }

  // This if for accessing the speech synthesis
  function startSpeaking(text: string) {
    const synth = window.speechSynthesis;
    synth.cancel();

    //Get the most recent
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    synth.speak(utter);
  }

  useEffect(() => {
    if (qIndex >= questions.length) {
      setNoQuestions(true);
      return;
    }

    setNoQuestions(false);

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

  //This will call the backend once we have no questions left
  useEffect(() => {
    const run = async () => {
      //Get the sentiment score
      await fetch("http://localhost:5000/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: response
        }),
      });

      await fetch("http://localhost:5000/api/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: questions,
          responses: response
        })
      });

      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: questions,
          responses: response,
        }),
      });
    };

    if (noQuestions) run();
  }, [noQuestions]);

  return (
    <div
      className="flex h-screen p-6 gap-4"
      style={{ backgroundColor: "rgb(43, 48, 59)" }}
    >
      <div className="relative w-[92%] h-[90%]">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full rounded-xl object-cover"
        />

        {started && (
          <div
            className="absolute bottom-4 right-4 px-3 py-7 rounded-lg size-32 place-items-center"
            style={{ backgroundColor: "rgb(43, 48, 59)" }}
          >
            <Image
              src="/interviewer_icon.svg"
              alt="interviewer_icon"
              width={60}
              height={60}
            />
            <div className="flex items-center py-3 gap-10 leading-none">
              <p className="text-xs">ALEX</p>
              <div className="flex gap-1 ">
                {[0, 150, 300].map((d, i) => (
                  <span
                    key={i}
                    className={`
        bg-cyan-500 rounded-full transition-all duration-200
        ${isSpeaking ? "w-1 h-4 animate-bounce" : "w-1 h-1"}
      `}
                    style={isSpeaking ? { animationDelay: `${d}ms` } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {!started ? (
        <div className="w-[30%] h-[90%] flex flex-col justify-center items-center bg-white rounded-xl text-black">
          <p className="text-2xl font-semibold mb-4">Ready to join?</p>
          <Image
            src="/interviewer_icon.svg"
            alt="interviewer_icon"
            width={100}
            height={100}
          />
          <button
            className="bg-brand bg-blue-700 text-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3 font-semibold"
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
          <div className="flex justify-center text-black mb-5 font-semibold">
            LIVE TRANSCRIPT
          </div>
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
        </div>
      )}
      {started && (
        <div className="flex absolute bottom-10 justify-center w-full items-center leading-none gap-3">
          <button
            className="box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3 bg-blue-700"
            onClick={startListening}
          >
            Speak
          </button>
        </div>
      )}
      {noQuestions && started && (
        <div className="flex absolute bottom-10 justify-center w-full items-center leading-none gap-3">
          <button
            className="box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3 bg-blue-700"
            onClick={handleClick}
          >
            Results
          </button>
        </div>
      )}
    </div>
  );
}
