import React, { useState } from 'react';
import { submitResponse } from '../services/responseService';

const ResponsePage = ({ surveyId }) => {
  const [answers, setAnswers] = useState({});

  const handleSubmitResponse = async () => {
    await submitResponse({ surveyId, answers: JSON.stringify(answers) });
    setAnswers({});
    alert('Response submitted successfully');
  };

  return (
    <div>
      <h2>Submit Response</h2>
      <textarea
        placeholder="Your answers"
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
      />
      <button onClick={handleSubmitResponse}>Submit</button>
    </div>
  );
};

export default ResponsePage;
