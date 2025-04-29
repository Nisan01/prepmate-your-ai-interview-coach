

import React, { useState } from 'react';

const Popup = ({ topic, isVisible, onClose, onSubmit }) => {
  const [topicName, setTopicName] = useState('');

  const handleSubmit = () => {
    if (topicName.trim() === '') {
      alert('Please enter a topic name');
      return;
    }
    onSubmit(topicName, topic); // Pass both the topic name and the selected topic type
    setTopicName('');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
     <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {`Enter ${topic} Topic`}
        </h3>

        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="border border-white/30 bg-white/90 text-black p-3 w-full mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder={`Enter ${topic} topic name`}
        />

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-medium rounded-md w-full sm:w-auto transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-md w-full sm:w-auto transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
