// components/InputField.tsx
import React from 'react';

const InputField: React.FC = () => {
  return (
    <div className="w-full max-w-2xl bg-white/30 p-4 rounded-lg shadow-md backdrop-blur-md flex items-center">
      <input
        type="text"
        placeholder="Type what you already know about linear algebra..."
        className="flex-grow p-4 bg-transparent text-black placeholder-gray-600 outline-none"
      />
      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
        ➜
      </button>
    </div>
  );
};

export default InputField;
