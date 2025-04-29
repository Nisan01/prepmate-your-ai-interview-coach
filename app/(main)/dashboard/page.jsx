"use client";

import React, { useState, useEffect } from "react";
import PrepCard from './_Components/PrepCard';
import Popup from './_Components/Popup';
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react"; // Added useQuery here
import { api } from "@/convex/_generated/api";

const ComponentName = () => {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showFeedback, setShowFeedback] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const userName = useUser();
  
  // Add router and createDiscussion mutation
  const router = useRouter();
  const createDiscussion = useMutation(api.discussions.createDiscussion);
  
  // Get all discussions with feedback
  const discussions = useQuery(api.discussions.getAllDiscussions) || [];
  const discussionsWithFeedback = discussions ? discussions.filter(d => d.feedback) : [];
  
  const handleCardClick = (index, topic) => {
    setOpenPopupIndex(index);
    setSelectedTopic(topic);
  };

  const handleClosePopup = () => {
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };

  // Update the handleSubmit function in your dashboard page
  const handleSubmit = async (topicName, topicType) => {
    try {
      // Create a new discussion in your database
      const discussionId = await createDiscussion({
        PreTitle: topicType,
        Title: topicName,
        conversation: []
      });
      
      // Redirect to the video page with the new discussion ID
      router.push(`/dashboard/video/${discussionId}`);
    } catch (error) {
      console.error("Error creating discussion:", error);
      alert("Failed to create discussion. Please try again.");
    }
    
    // Close the popup
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };
  
  const handleShowFeedback = (discussionId) => {
    setShowFeedback(discussionId === showFeedback ? null : discussionId);
  };

  // Fade in effect after 300ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b"
    style={{ backgroundImage: "url('/images/extra-bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1
            className={`text-white text-4xl md:text-5xl font-extrabold mb-2 transition-all duration-1000 ease-out
            ${showWelcome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Welcome Back,
          </h1>
          <h2
            className={`text-cyan-300 text-3xl font-bold transition-all duration-1000 ease-out delay-300
            ${showWelcome ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {userName.displayName}
          </h2>
        </div>
        
        <h4 className="text-center ml-6 text-white text-xl font-semibold uppercase tracking-widest mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 inline-block px-6 py-2 rounded-full shadow-lg">
          My Workplace
        </h4>

            {/* Prep Cards */}
            <PrepCard onCardClick={handleCardClick} />
        
        {/* Display feedback from previous interviews */}
        {discussionsWithFeedback.length > 0 && (
          <div className="mb-12 mt-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Your Interview Feedback
              </span>
            </h2>
            <div className="space-y-4">
              {discussionsWithFeedback.map((discussion) => (
                <div 
                  key={discussion._id} 
                  className="border border-gray-700 rounded-xl p-5 bg-gray-800/50 shadow-lg backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h3 className="font-bold text-white text-lg">
                      <span className="text-cyan-400">{discussion.PreTitle}:</span> {discussion.Title}
                    </h3>
                    <button 
                      onClick={() => handleShowFeedback(discussion._id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      {showFeedback === discussion._id ? 'Hide Feedback' : 'Show Feedback'}
                    </button>
                  </div>
                  
                  {showFeedback === discussion._id && (
                    <div className="mt-4 p-5 bg-gray-700/50 rounded-lg whitespace-pre-line text-gray-200 border-l-4 border-cyan-400">
                      {discussion.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
    
      </div>

      <Popup
        topic={selectedTopic}
        isVisible={openPopupIndex !== null}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ComponentName;