
import React from 'react';

const Button = ({ text, variant }) => {
  const styles = variant === 'primary'
    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
    : ' bg-white/40 backdrop-blur-md text-black';

  return (
    <button className={`px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${styles}`}>
      {text}
    </button>
  );
};

export default Button;