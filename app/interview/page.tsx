"use client";
import {useEffect, useRef} from "react";

export default function interviewPage() {
    const videoRef = useRef<HTMLVideoElement>(null);

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
        <div className="flex items-center gap-4 rounded-lg">
          <video
            ref={videoRef}
            autoPlay
            className="w-160 h-120 rounded-lg object-cover"
          />
          <div className="flex bg-black text-white w-160 h-120">Hello </div>
        </div>
      </div>
    );}
