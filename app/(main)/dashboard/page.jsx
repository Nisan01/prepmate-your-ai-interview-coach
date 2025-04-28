"use client";

import React, { useState } from "react";
import PrepCard from './_Components/PrepCard';
import Popup from './_Components/Popup';
import { useUser } from "@stackframe/stack";


const ComponentName = () => {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const userName = useUser();

  const handleCardClick = (index, topic) => {
    setOpenPopupIndex(index);
    setSelectedTopic(topic);
  };

  const handleClosePopup = () => {
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };

  const handleSubmit = (topicName) => {
    setOpenPopupIndex(null);
    setSelectedTopic("");
  };

  return (
    <div>
      <div className="dashBoard mx-auto px-[200px] py-[100px] md:px-8">
        <h4 className="text-[1em] text-gray-300 font-bold">My Workplace</h4>
        <div className="flex">
        <span className='md:text-2xl pt-2 pl-8 pb-2 '>Welcome Back</span>
        <span className="text-blue-800 md:text-[1.3em] font-bold pl-8">{userName.displayName}</span>
        </div>
   
       
        <PrepCard onCardClick={handleCardClick} />
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