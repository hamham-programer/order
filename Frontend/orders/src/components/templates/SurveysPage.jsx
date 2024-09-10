import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // برای ایجاد لینک به صفحه جزئیات نظرسنجی
import { getAllSurveys } from '../../services/admin';
import styles from './SurveysPage.module.css'; // Import CSS module

function SurveysPage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await getAllSurveys();
      setSurveys(response.data.surveys);
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>نظرسنجی‌ها</h1>
      <ul className={styles.surveyList}>
        {surveys.map((survey) => (
          <li key={survey._id} className={styles.surveyItem}>
            <Link to={`/survey/${survey._id}`} className={styles.surveyTitle}>
              {survey.title}
            </Link>
            <p className={styles.surveyDescription}>{survey.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveysPage;
