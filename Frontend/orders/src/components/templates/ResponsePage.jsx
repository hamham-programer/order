import React, { useState } from 'react';
import { submitResponse } from '../services/responseService';
import { useUser } from '../../router/UserContext';

const ResponsePage = ({ surveyId }) => {
  const [answers, setAnswers] = useState({});
  const { userId } = useUser();  // Get userId from context

  const handleSubmitResponse = async () => {
    try {
      // اطمینان از اینکه userId و answers ارسال می‌شود
      await submitResponse({
        surveyId,
        user: userId,
        answers: JSON.stringify(answers)
      });
      setAnswers({});
     
    } catch (error) {
      console.error('Error submitting response:', error);
    
    }
  };

  const handleChange = (e) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <h2>Submit Response</h2>
      {/* فرض بر این است که برای هر سوال ورودی متنی دارید */}
      <textarea
        placeholder="Your answers"
        name="response"
        value={answers.response || ''}
        onChange={handleChange}
      />
      <button onClick={handleSubmitResponse}>Submit</button>
    </div>
  );
};

export default ResponsePage;
