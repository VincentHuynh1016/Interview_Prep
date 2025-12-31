(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/interview/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InterviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function InterviewPage() {
    _s();
    //Access to video element
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    //Grabs a list of interview questions
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    //Holds the chat messages
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    //Access to chat container for scrolling
    const chatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    //To check if the audio is unlocked
    const [audioUnlocked, setAudioUnlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    //Used to access the questions array
    const [qIndex, setQIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    //To check if the interview has started
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    //Is Speaking state
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("SpeechRecognition is not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = (e)=>{
            const transcript = e.results[0][0].transcript;
            recognition.stop();
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: "user",
                        text: transcript
                    }
                ]);
            setQIndex((i)=>i + 1);
        };
    }
    // This if for accessing the speech synthesis
    function startSpeaking(text) {
        const synth = window.speechSynthesis;
        synth.cancel();
        //Get the most recent
        const utter = new SpeechSynthesisUtterance(text);
        utter.onstart = ()=>setIsSpeaking(true);
        utter.onend = ()=>setIsSpeaking(false);
        synth.speak(utter);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewPage.useEffect": ()=>{
            if (!questions[qIndex]) return;
            const txt = questions[qIndex].text;
            setMessages({
                "InterviewPage.useEffect": (prev)=>{
                    const last = prev[prev.length - 1];
                    if (last?.role === "bot" && last?.text === txt) return prev;
                    return [
                        ...prev,
                        {
                            role: "bot",
                            text: txt
                        }
                    ];
                }
            }["InterviewPage.useEffect"]);
            if (!audioUnlocked) return;
            startSpeaking(txt);
        }
    }["InterviewPage.useEffect"], [
        questions,
        qIndex,
        audioUnlocked
    ]);
    //Scroll to bottom of chat when new message is added
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewPage.useEffect": ()=>{
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }
    }["InterviewPage.useEffect"], [
        messages
    ]);
    // Fetch the interview questions from local JSON file (TEMPORARY)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewPage.useEffect": ()=>{
            fetch("/questions.json").then({
                "InterviewPage.useEffect": (res)=>res.json()
            }["InterviewPage.useEffect"]).then({
                "InterviewPage.useEffect": (data)=>setQuestions(data.questions)
            }["InterviewPage.useEffect"]);
        }
    }["InterviewPage.useEffect"], []);
    // Permission to access webcam if so then stream video to video element
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewPage.useEffect": ()=>{
            navigator.mediaDevices.getUserMedia({
                video: true
            }).then({
                "InterviewPage.useEffect": (stream)=>{
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                }
            }["InterviewPage.useEffect"]);
        }
    }["InterviewPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen p-6 gap-4",
        style: {
            backgroundColor: "rgb(43, 48, 59)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-[92%] h-[90%]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        autoPlay: true,
                        className: "w-full h-full rounded-xl object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    started && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 right-4 px-3 py-7 rounded-lg size-32 place-items-center",
                        style: {
                            backgroundColor: "rgb(43, 48, 59)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/interviewer_icon.svg",
                                alt: "interviewer_icon",
                                width: 60,
                                height: 60
                            }, void 0, false, {
                                fileName: "[project]/app/interview/page.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center py-3 gap-10 leading-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs",
                                        children: "ALEX"
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1 ",
                                        children: [
                                            0,
                                            150,
                                            300
                                        ].map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `
        bg-cyan-500 rounded-full transition-all duration-200
        ${isSpeaking ? "w-1 h-4 animate-bounce" : "w-1 h-1"}
      `,
                                                style: isSpeaking ? {
                                                    animationDelay: `${d}ms`
                                                } : {}
                                            }, i, false, {
                                                fileName: "[project]/app/interview/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/interview/page.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            !started ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[30%] h-[90%] flex flex-col justify-center items-center bg-white rounded-xl text-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-semibold mb-4",
                        children: "Ready to join?"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/interviewer_icon.svg",
                        alt: "interviewer_icon",
                        width: 100,
                        height: 100
                    }, void 0, false, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-brand bg-blue-700 text-white box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none mt-3 font-semibold",
                        onClick: startInterview,
                        children: "Join call"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/page.tsx",
                lineNumber: 153,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: chatRef,
                className: "w-[30%] h-[90%] rounded-xl bg-white p-4 mb-4 overflow-y-auto",
                children: [
                    messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex mb-3 ${m.role === "bot" ? "justify-start" : "justify-end"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: m.role === "bot" ? "bg-cyan-200 text-black rounded-full px-4 py-2" : "bg-emerald-400 text-black rounded-full px-4 py-2",
                                children: m.text
                            }, void 0, false, {
                                fileName: "[project]/app/interview/page.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, this)
                        }, i, false, {
                            fileName: "[project]/app/interview/page.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-black",
                        onClick: startListening,
                        children: "Speak"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/page.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/interview/page.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/interview/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(InterviewPage, "9vU5sujIe2SGZREGzbe3YtuEr3Y=");
_c = InterviewPage;
var _c;
__turbopack_context__.k.register(_c, "InterviewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_interview_page_tsx_f04ba80f._.js.map