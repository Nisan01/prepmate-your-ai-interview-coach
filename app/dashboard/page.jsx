"use client";

import React, { useState } from "react";
import PrepCard from './_Components/PrepCard';
import Popup from './_Components/Popup';
import Feedback from "./_Components/FeedBack";

const ComponentName = () => {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [feedbackList, setFeedbackList] = useState([]); 

  const handleCardClick = (index, topic) => {
    setOpenPopupIndex(index);
    setSelectedTopic(topic);
  };

  const handleClosePopup = () => {
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };

  const handleSubmit = (topicName) => {
    console.log("Topic submitted:", topicName);
    setFeedbackList(prev => [...prev, topicName]);
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };

  return (
    <div>
      <div className="dashBoard mx-auto px-4 md:px-8 py-2">
        {/* Your Header Section */}
        <h4 className="pt-8 pb-6 pl-2 text-blue-400 text-[1.2em] shadow font-bold">My Workplace</h4>
        <hr className="h-2 w-4" />
        <p className='md:text-2xl pt-8 pl-8 pb-4 '>Welcome Back</p>
        <p className="text-blue-800 md:text-[1.3em] font-bold pl-8">Shroyash Shrestha</p>
        <p className='mt-10 pl-8 text-2xl font-bold text-center mb-2'>Select your preparation below</p>

        <PrepCard onCardClick={handleCardClick} />
      </div>

      <Popup
        topic={selectedTopic}
        isVisible={openPopupIndex !== null}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      />

<p className="text-blue text-center text-[1.4em] mt-10">Feed Back of your preparation</p>
      <Feedback feedbackList={feedbackList} />
    </div>
  );
};
export default ComponentName;