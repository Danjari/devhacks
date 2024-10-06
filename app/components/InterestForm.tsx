import React, { useState } from 'react';

interface InterestFormProps {
  onSubmit: (submittedInterest: string) => void;
}

const InterestForm: React.FC<InterestFormProps> = ({ onSubmit }) => {
  const [interests, setInterests] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const submittedInterest = interests; // Get the interest from the state
    onSubmit(submittedInterest);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="interests">Enter your interests:</label>
      <input
        type="text"
        id="interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InterestForm;