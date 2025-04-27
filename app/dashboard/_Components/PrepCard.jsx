"use client";

import { activities } from './predata';

const PrepCard = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 p-6">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => onCardClick(index, activity.title)}
        >
          <div className="text-blue-500 text-3xl mb-3">
            {activity.icon}
          </div>
          <h2 className="text-center text-sm font-medium text-gray-800">{activity.title}</h2>
          <div className="mt-2 w-16 h-1 bg-blue-400 rounded-full opacity-75"></div>
        </div>
      ))}
    </div>
  );
};

export default PrepCard;
