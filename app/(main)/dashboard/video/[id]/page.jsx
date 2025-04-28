"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import axios from "axios";
import { AIMODEL } from "@/Service/GlobalService";

export default function VideoCallWithChat() {
  const params = useParams();
  const discussionId = params.id;

  const recognitionRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const discussion = useQuery(api.discussions.getDiscussion, { id: discussionId });

  useEffect(() => {
    if (discussion) {
      setIsLoading(false);
      console.log("Discussion data:", discussion);
    }
  }, [discussion]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = async (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          console.log("Recognized text:", transcript);
          setInputMessage(transcript);

          const newUserMessage = { text: transcript, isUser: true };
          setMessages((prev) => [...prev, newUserMessage]);

          setIsProcessing(true);

          try {
            if (discussion) {
              const topic = discussion.Title || "interview preparation";
              const preparationType = discussion.PreTitle || "Mock Interview";

              const aiResponse = await AIMODEL(preparationType, topic, transcript);

              const newAIMessage = { text: aiResponse, isUser: false };
              setMessages((prev) => [...prev, newAIMessage]);

              speakText(aiResponse);
            } else {
              console.log("Discussion data not available yet");
            }
          } catch (error) {
            console.error("Error processing AI response:", error);
            setMessages((prev) => [...prev, {
              text: "Sorry, I couldn't process your request.",
              isUser: false
            }]);
          } finally {
            setIsProcessing(false);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          if (isListening && !isSpeaking) {
            try {
              recognitionRef.current.start();
              console.log("Restarted listening");
            } catch (e) {
              console.error("Failed to restart recognition:", e);
            }
          }
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, isSpeaking, discussion]);

  const handleConnect = () => {
    setIsConnected(true);
    startListening();
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setMessages([]);
    setInputMessage("");
    stopListening();
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        console.log("Started listening");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        alert("Speech recognition failed to start. Please try again.");
      }
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Stopped listening");
    }
  };

  const handleAIResponse = async (userMessage) => {
    const newUserMessage = { text: userMessage, isUser: true };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsProcessing(true);

    try {
      console.log("Sending message to API:", userMessage);
      const response = await axios.post('/api/chat', {
        message: userMessage,
        discussionId: discussionId,
      });

      const aiResponse = response.data.message;
      console.log("Received AI response:", aiResponse);

      const newAIMessage = { text: aiResponse, isUser: false };
      setMessages((prev) => [...prev, newAIMessage]);

      speakText(aiResponse);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [...prev, {
        text: "Sorry, I couldn't process your request.",
        isUser: false
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;

      if (isListening) {
        stopListening();
      }

      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        if (isConnected) {
          startListening();
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser');
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" && discussion) {
      const newUserMessage = { text: inputMessage, isUser: true };
      setMessages((prev) => [...prev, newUserMessage]);

      setIsProcessing(true);
      try {
        const topic = discussion.Title || "interview preparation";
        const preparationType = discussion.PreTitle || "Mock Interview";

        const aiResponse = await AIMODEL(preparationType, topic, inputMessage);

        const newAIMessage = { text: aiResponse, isUser: false };
        setMessages((prev) => [...prev, newAIMessage]);

        speakText(aiResponse);
      } catch (error) {
        console.error("Error processing AI response:", error);
        setMessages((prev) => [...prev, {
          text: "Sorry, I couldn't process your request.",
          isUser: false
        }]);
      } finally {
        setIsProcessing(false);
        setInputMessage("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Session ID: {discussionId}</h1>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl h-[500px]">
        {/* Voice Section */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center text-white text-lg">
          <div>{isConnected ? "Voice Call Connected" : "Not Connected"}</div>
          {isListening && <div className="mt-2 text-green-400">Listening...</div>}
          {isProcessing && <div className="mt-2 text-yellow-400">Processing...</div>}
          {isSpeaking && <div className="mt-2 text-blue-400">Speaking...</div>}
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-1/3 border-l flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md w-fit max-w-full break-words ${
                    msg.isUser
                      ? "bg-blue-100 text-blue-800 ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          {isConnected && (
            <div className="flex p-2 border-t">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 border rounded-l-md px-3 py-2 outline-none"
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Connect / Disconnect Buttons */}
      <div className="flex gap-4 mt-6">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
          >
            Connect
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
