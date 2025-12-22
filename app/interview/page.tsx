"use client";
import {useEffect, useRef, useState} from "react";

export default function interviewPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
      fetch("/questions.json")
        .then((res) => res.json())
        .then((data) => setQuestions(data.questions));
    }, []);

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
          <div className="bg-black text-white w-160 h-120 rounded-lg overflow-y-auto p-4">
            {questions.map((q) => (
              <p key={q.id}>{q.text}</p>
            ))}
          </div>
        </div>
      </div>
    );}
