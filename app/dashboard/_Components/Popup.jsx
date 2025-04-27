"use client";

import React, { useState, useEffect } from "react";

const Popup = ({ topic, isVisible, onClose, onSubmit }) => {
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    if (!isVisible) setTopicName("");  // Clear when closed
  }, [isVisible]);

  const handleSubmit = () => {
    if (topicName.trim() !== "") {
      onSubmit(topicName);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-xl mb-6 text-center">{`Enter ${topic} Topic`}</h3>
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="border p-3 w-full mb-6 rounded-md"
          placeholder={`Enter ${topic} topic name`}
        />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-400 text-white rounded-md w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-md w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
