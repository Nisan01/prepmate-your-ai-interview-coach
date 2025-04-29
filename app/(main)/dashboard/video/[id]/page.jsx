"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AIMODEL } from "@/Service/GlobalService";
import { preprationOption } from "@/Service/PreparationData";

export default function VideoCallWithChat() {
  const params = useParams();
  const discussionId = params.id;
  const router = useRouter();
  const recognitionRef = useRef(null);

  // State variables
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  // Convex queries and mutations
  const discussion = useQuery(api.discussions.getDiscussion, { id: discussionId });
  const updateConversation = useMutation(api.discussions.updateConversation);

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
          
          // Handle specific error types
          if (event.error === 'not-allowed') {
            console.log('Microphone permission denied. Please allow microphone access.');
            alert('Microphone permission denied. Please allow microphone access in your browser settings.');
          } else if (event.error === 'aborted') {
            console.log('Speech recognition was aborted. Attempting to restart...');
            // Add a small delay before restarting to avoid rapid restart loops
            setTimeout(() => {
              if (isConnected && !isSpeaking && !isProcessing) {
                console.log('Attempting to restart speech recognition...');
                try {
                  recognitionRef.current.stop();
                  setTimeout(() => {
                    if (isConnected && !isSpeaking && !isProcessing) {
                      recognitionRef.current.start();
                      setIsListening(true);
                      console.log('Successfully restarted speech recognition');
                    }
                  }, 300);
                } catch (e) {
                  console.error('Failed to restart speech recognition:', e);
                }
              }
            }, 1000);
          }
          
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

  // Add new loading state variables
  const [isConnecting, setIsConnecting] = useState(false);
  const [isStartingListening, setIsStartingListening] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Request microphone permission explicitly
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately as we just needed it for permissions
      stream.getTracks().forEach(track => track.stop());
      
      setIsConnected(true);
      startListening();
    } catch (error) {
      console.error("Error connecting:", error);
      alert("Failed to access microphone. Please check your browser permissions.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsDisconnecting(true);
    setIsConnected(false);
    setMessages([]);
    setInputMessage("");
    stopListening();
    setTimeout(() => setIsDisconnecting(false), 500);
  };

  const startListening = () => {
    setIsStartingListening(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        console.log("Started listening");
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        alert("Speech recognition failed to start. Please try again.");
      } finally {
        setIsStartingListening(false);
      }
    } else {
      alert("Speech recognition is not supported in your browser.");
      setIsStartingListening(false);
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
      setIsSendingMessage(true);
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
        setIsSendingMessage(false);
      }
    }
  };

  const handleSaveConversation = async () => {
    if (messages.length === 0) {
      alert("No conversation to save. Please have a conversation first.");
      return;
    }
    
    setIsSaving(true);
    try {
      // Format the conversation for saving
      const conversationData = messages.map(msg => ({
        text: msg.text,
        isUser: msg.isUser,
        timestamp: Date.now()
      }));
      
      // Get the topic and preparation type
      const topic = discussion?.Title || "interview preparation";
      const preparationType = discussion?.PreTitle || "Mock Interview";
      
      // Find the preparation option to get the summary prompt
      const prepOption = preprationOption.find(option => option.name === preparationType) || preprationOption[0];
      
      // Check if summeryPrompt exists, if not use a default
      const summaryPrompt = prepOption.summeryPrompt 
        ? prepOption.summeryPrompt.replace('{user_topic}', topic)
        : `Provide a summary of the ${topic} interview performance, highlighting strengths and areas for improvement.`;
      
      // Generate feedback using AI model
      const conversationText = messages.map(msg => 
        `${msg.isUser ? "User" : "AI"}: ${msg.text}`
      ).join("\n\n");
      
      const feedbackPrompt = `${summaryPrompt}\n\nHere is the conversation:\n${conversationText}`;
      const feedbackResponse = await AIMODEL(preparationType, topic, feedbackPrompt);
      
      // Save conversation and feedback to Convex
      await updateConversation({
        id: discussionId,
        conversation: conversationData,
        feedback: feedbackResponse
      });
      
      setFeedback(feedbackResponse);
      alert("Conversation saved and feedback generated successfully!");
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving conversation:", error);
      alert("Failed to save conversation. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading session data...</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {discussion?.PreTitle}: {discussion?.Title}
          </h1>

          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl h-[500px]">
            {/* Voice Section */}
            <div className="flex-1 bg-black flex flex-col items-center justify-center text-white text-lg">
              <div>{isConnected ? "Voice Call Connected" : "Not Connected"}</div>
              {isStartingListening && <div className="mt-2 text-purple-400">Starting microphone...</div>}
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
                      if (e.key === "Enter" && !isSendingMessage) handleSendMessage();
                    }}
                    disabled={isSendingMessage}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSendingMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md disabled:bg-blue-300 flex items-center"
                  >
                    {isSendingMessage ? (
                      <>
                        <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                        Sending
                      </>
                    ) : (
                      "Send"
                    )}
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
                disabled={isConnecting}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition disabled:bg-green-300 flex items-center"
              >
                {isConnecting ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    Connecting...
                  </>
                ) : (
                  "Connect"
                )}
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition disabled:bg-red-300"
              >
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            )}
            
            {/* Add Save Conversation button */}
            {messages.length > 0 && (
              <button
                onClick={handleSaveConversation}
                disabled={isSaving}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition disabled:bg-blue-300 flex items-center"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                    Saving...
                  </>
                ) : (
                  "Save & Generate Feedback"
                )}
              </button>
            )}
          </div>
          
          {/* Show feedback if available */}
          {feedback && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg w-full max-w-4xl">
              <h3 className="text-lg font-bold mb-2">Interview Feedback:</h3>
              <p className="whitespace-pre-line">{feedback}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
