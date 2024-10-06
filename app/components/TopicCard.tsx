// components/TopicCard.tsx
import React from 'react';

interface TopicCardProps {
  text: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ text }) => {
  return (
    <button className="px-6 py-3 bg-white/40 backdrop-blur-md text-black rounded-lg shadow-md hover:shadow-lg transition-all">
      {text}
    </button>
  );
};

export default TopicCard;
