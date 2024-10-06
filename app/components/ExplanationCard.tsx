// components/ExplanationCard.tsx
import React, { useState } from 'react';

interface ExplanationCardProps {
  title: string;
  content: string;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside className=' bg-white/40 backdrop-blur-md p-4 m-4 rounded-lg shadow-md mb-4 float-right '>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left text-black font-semibold text-lg">
        {title} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && <p className="mt-2 text-black">{content}</p>}
      {title}
      {content}
    </aside>
  );
};

export default ExplanationCard;
