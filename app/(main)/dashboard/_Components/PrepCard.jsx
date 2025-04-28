"use client";
import { preprationOption } from '@/Service/PreparationData';

const PrepCard = ({ onCardClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 p-6">
      {preprationOption.map((activity, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => onCardClick(index, activity.name)}
        >
          <div className="text-blue-500 text-3xl mb-3">
            {/* Render the icon as a component */}
            <activity.icon size={28} />
          </div>
          <h2 className="text-center text-sm font-medium text-gray-800">{activity.name}</h2>
          <div className="mt-2 w-16 h-1 bg-blue-400 rounded-full opacity-75"></div>
        </div>
      ))}
    </div>
  );
};

export default PrepCard;
