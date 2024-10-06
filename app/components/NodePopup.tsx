// NodePopup.tsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface NodePopupProps {
  selectedNode: any;
  onClose: () => void;
  onNextNode: () => void; // New prop for navigating to the next node
}

const NodePopup: React.FC<NodePopupProps> = ({ selectedNode, onClose, onNextNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);

  // Reset state when the selected node changes
  useEffect(() => {
    setSelectedAnswers([]);
    setFeedback(null);
  }, [selectedNode]);

  if (!selectedNode) return null;

  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, option: string) => {
    const question = selectedNode.data.assessment[questionIndex];
    const isCorrect = option === question.answer;

    setSelectedAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[questionIndex] = option;
      return updatedAnswers;
    });

    setFeedback({
      message: isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again.',
      correct: isCorrect,
    });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white p-4 rounded-lg shadow-lg max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h3 className="text-lg font-semibold mb-2">{selectedNode.data.title}</h3>
        <ReactMarkdown
          className="prose"
          children={selectedNode.data.description}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />

        <div className="mt-4">
          <iframe
            width="100%"
            height="315"
            src={selectedNode.data.videoUrl}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">Assessment:</h4>
          {selectedNode.data.assessment.map((question, index) => (
            <div key={index} className="mb-4">
              <ReactMarkdown
                className="prose"
                children={question.question}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              />
              {question.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    id={`${index}-${i}`}
                    name={`question-${index}`}
                    onChange={() => handleAnswerSelect(index, option)}
                    checked={selectedAnswers[index] === option}
                    disabled={feedback?.correct} // Disable options if the correct answer was selected
                  />
                  <label htmlFor={`${index}-${i}`} className="ml-2">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {feedback && (
            <p
              className={`font-semibold mb-4 ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}
            >
              {feedback.message}
            </p>
          )}
          {feedback?.correct && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onNextNode}
            >
              Next Node
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodePopup;
