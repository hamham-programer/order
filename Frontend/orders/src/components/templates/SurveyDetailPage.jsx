import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurveyById, submitResponse } from '../../services/admin';
import { useUser } from '../../router/UserContext';
import styles from './SurveyDetailPage.module.css'; // Import CSS module

const SurveyDetailPage = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const { userId } = useUser();  // Get userId from context
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await getSurveyById(surveyId);
        setSurvey(response.data.survey);
      } catch (error) {
        console.error('Error fetching survey:', error);
        setError('Failed to fetch survey');
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [surveyId]);

  const handleSubmitResponses = async () => {
    // اعتبارسنجی: اطمینان از اینکه همه سوالات پاسخ داده شده‌اند
    const allQuestionsAnswered = survey.questions.every(
      question => responses[question._id] !== undefined
    );

    if (!allQuestionsAnswered) {
      alert('Please answer all questions.');
      return;
    }

    // ساختار پاسخ‌ها برای ارسال به سرور
    const formattedAnswers = survey.questions.map(question => ({
      questionId: question._id,
      answer: responses[question._id] || '',
    }));

    try {
      // ارسال پاسخ‌ها به سرور به صورت JSON
      await submitResponse({
        surveyId,
        user: userId,
        answers: JSON.stringify(formattedAnswers), // تبدیل به JSON
      });
      setSuccess(true);
      setError(null);
      // هدایت به صفحه اصلی پس از موفقیت
      navigate('/');
    } catch (error) {
      console.error('Error submitting responses:', error.response ? error.response.data : error.message);
      setError('Failed to submit responses');
      setSuccess(false);
    }
  };

  const handleChange = (questionId, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const currentQuestion = survey.questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{survey.title}</h2>
      {success && <div className={styles.success}>پاسخ ها با موفقیت ثبت شدند!</div>}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmitResponses(); }}>
        <div className={styles.questionContainer}>
          <p className={styles.questionText}>{currentQuestion.text}</p>
          {currentQuestion.type === 'text' && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={responses[currentQuestion._id] || ''}
                onChange={(e) => handleChange(currentQuestion._id, e.target.value)}
              />
            </div>
          )}
          {currentQuestion.type === 'multiple-choice' && (
            <div className={styles.inputGroup}>
              {currentQuestion.options.map(option => (
                <div key={option}>
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    value={option}
                    checked={responses[currentQuestion._id] === option}
                    onChange={() => handleChange(currentQuestion._id, option)}
                  />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          {currentQuestionIndex > 0 && (
            <button type="button" className={styles.button} onClick={handlePrevious}>سوال قبلی</button>
          )}
          {currentQuestionIndex < survey.questions.length - 1 ? (
            <button type="button" className={styles.button} onClick={handleNext}>سوال بعدی</button>
          ) : (
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}><i class="fas fa-check-circle"></i>  ثبت پاسخ ها</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SurveyDetailPage;
