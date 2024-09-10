import React, { useEffect, useState } from 'react';
import { createSurvey, deleteSurvey, getAllSurveys } from '../../services/admin';
import { Link } from 'react-router-dom'; // اگر از react-router استفاده می‌کنید
import styles from './SurveyPage.module.css'; // وارد کردن فایل CSS module

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [newSurvey, setNewSurvey] = useState({ title: '', description: '', questions: [] });

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    const response = await getAllSurveys();
    setSurveys(response.data.surveys);
  };

  const handleCreateSurvey = async () => {
    await createSurvey(newSurvey);
    setNewSurvey({ title: '', description: '', questions: [] });
    fetchSurveys();
  };

  const handleDeleteSurvey = async (id) => {
    await deleteSurvey(id);
    fetchSurveys();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>مدیریت نظرسنجی ها</h2>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="عنوان"
          value={newSurvey.title}
          onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="توضیحات"
          value={newSurvey.description}
          onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
        />
        <button className={styles.button} onClick={handleCreateSurvey}>ایجاد نظرسنجی</button>
      </div>
      <ul className={styles.surveyList}>
        {surveys.map((survey) => (
          <li className={styles.surveyItem} key={survey._id}>
            <span className={styles.surveyTitle}>{survey.title} - {survey.description}</span>
            <div>
              <button className={styles.deleteButton} onClick={() => handleDeleteSurvey(survey._id)}>حذف نظرسنجی</button>
              {/* لینک به صفحه سوالات برای این نظرسنجی */}
              <Link className={styles.link} to={`/survey/${survey._id}/questions`}>ایجاد سوالات</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyPage;
