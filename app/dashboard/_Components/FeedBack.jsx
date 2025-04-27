"use client";

import React from "react";

const Feedback = ({ feedbackList }) => {
  if (feedbackList.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 text-lg">
        No feedback yet.
      </div>
    );
  }

  return (
    <div className="mt-12 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Feed Back</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackList.map((feedback, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feedback}</h3>
            <p className="text-gray-500 text-sm">#Topic {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
