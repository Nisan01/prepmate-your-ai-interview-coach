"use client";
import { preprationOption } from "@/Service/PreparationData";

const PrepCard = ({ onCardClick }) => {
  return (
    <div className="grid text-white grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-4 p-6 cursor-pointer">
      {preprationOption.map((activity, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl border border-gray-700 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-2"
          onClick={() => onCardClick(index, activity.name)}
        >
          <div className="bg-white/20 p-4 rounded-full mb-4">
            <activity.icon size={32} className="text-white" />
          </div>
          <h2 className="text-center text-lg font-bold text-white mb-2">
            {activity.name}
          </h2>
          <p className="text-xs text-white/80 text-center">
            Click to start your {activity.name.toLowerCase()} session
          </p>
          <div className="mt-4 w-20 h-1 bg-white/40 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default PrepCard;
