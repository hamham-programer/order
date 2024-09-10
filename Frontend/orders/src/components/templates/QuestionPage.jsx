import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createQuestion, deleteQuestion, getQuestionsBySurvey } from '../../services/admin';
import styles from './QuestionPage.module.css'; // وارد کردن فایل CSS ماژول

const QuestionPage = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', type: 'text', options: [], surveyId });
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [surveyId]);

  const fetchQuestions = async () => {
    const response = await getQuestionsBySurvey(surveyId);
    setQuestions(response.data.questions);
  };

  const handleCreateQuestion = async () => {
    await createQuestion(newQuestion);
    setNewQuestion({ text: '', type: 'text', options: [], surveyId });
    fetchQuestions();
  };

  const handleDeleteQuestion = async (id) => {
    await deleteQuestion(id);
    fetchQuestions();
  };

  const handleAddOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, newOption],
    }));
    setNewOption('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>مدیریت سوالات</h2>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="متن سوال"
          value={newQuestion.text}
          onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          className={styles.input}
        />
        <select
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
          className={styles.select}
        >
          <option value="text">متن</option>
          <option value="multiple-choice">چند گزینه‌ای</option>
        </select>

        {newQuestion.type === 'multiple-choice' && (
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="گزینه جدید"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleAddOption} className={styles.button}>افزودن گزینه</button>
            <ul className={styles.optionList}>
              {newQuestion.options.map((option, index) => (
                <li key={index} className={styles.optionItem}>{option}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleCreateQuestion} className={styles.button}>ایجاد سوال</button>
      </div>
      <ul className={styles.questionList}>
        {questions.map((question) => (
          <li key={question._id} className={styles.questionItem}>
            {question.text} - {question.type}
            {question.type === 'multiple-choice' && (
              <ul className={styles.questionOptions}>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
            <button onClick={() => handleDeleteQuestion(question._id)} className={styles.deleteButton}>
              حذف سوال
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPage;
