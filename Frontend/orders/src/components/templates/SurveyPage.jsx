import React, { useEffect, useState } from 'react';
import { createSurvey, deleteSurvey, getAllSurveys } from '../../services/admin';
import { Link } from 'react-router-dom'; 
import styles from './SurveyPage.module.css';

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [newSurvey, setNewSurvey] = useState({ title: '', description: '', questions: [], duration: 3 }); // مقدار پیش فرض برای مدت زمان

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    const response = await getAllSurveys();
    setSurveys(response.data.surveys);
  };

  const handleCreateSurvey = async () => {
    // اعتبارسنجی برای مدت زمان
    if (newSurvey.duration < 1) {
      alert("مدت زمان فعال بودن نظرسنجی باید حداقل 1 روز باشد.");
      return;
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + newSurvey.duration); // محاسبه تاریخ انقضا

    await createSurvey({ ...newSurvey, expirationDate }); // ارسال تاریخ انقضا به سرور
    setNewSurvey({ title: '', description: '', questions: [], duration: 1 }); // Reset with default duration
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
        <input
          className={styles.inputd}
          type="number"
          min="1" // تعیین حداقل مقدار برای فیلد
          placeholder="مدت زمان (روز)"
          value={newSurvey.duration}
          onChange={(e) => setNewSurvey({ ...newSurvey, duration: parseInt(e.target.value) })}
        />
        <button className={styles.button} onClick={handleCreateSurvey}>ایجاد نظرسنجی</button>
      </div>
      <ul className={styles.surveyList}>
        {surveys.map((survey) => (
          <li className={styles.surveyItem} key={survey._id}>
            <div className={styles.surveyItemContent}>
              <span className={styles.surveyTitle}>{survey.title}</span>
              <span className={styles.surveyDescription}>{survey.description}</span>
              {new Date(survey.expirationDate) < new Date() && (
                <span className={styles.expired}>نظرسنجی منقضی شده است</span>
              )}
            </div>
            <div className={styles.actions}>
              <Link className={styles.link} to={`/survey/${survey._id}/questions`}>ایجاد سوالات</Link>
              <button className={styles.deleteButton} onClick={() => handleDeleteSurvey(survey._id)}>حذف نظرسنجی</button>
              <Link className={styles.link} to={`/survey/${survey._id}/responses`}>مشاهده پاسخ‌ها</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyPage;
