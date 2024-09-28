import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyAnalysis } from '../../services/admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import styles from './SurveyAnalysisPage.module.css'; 

const SurveyAnalysisPage = () => {
  const { surveyId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!surveyId) {
        setError("خطا: surveyId معتبر نیست.");
        setLoading(false);
        return;
      }

      try {
        const data = await getSurveyAnalysis(surveyId);
        console.log("داده‌های تحلیل:", data);
        setAnalysis(data);
      } catch (err) {
        setError("خطا در دریافت تحلیل: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [surveyId]);

  if (loading) return <p className={styles.loading}>در حال بارگذاری...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.surveyAnalysisContainer}>
      <h2 className={styles.surveyTitle}> گزارش تحلیل نظر سنجی برگزار شده در مجتمع کشت و صنعت مدلل ماهیدشت
        </h2>

      <p className={styles.participantsCount}>تعداد شرکت‌کنندگان: {analysis.totalParticipants}</p>
      <div className={styles.printableSection}>
        {analysis.analysis.map((item, index) => (
          <div key={index} className={styles.questionSection}>
            <h3 className={styles.questionText}>سوال: {item.questionText}</h3>
            <ul className={styles.optionsList}>
              {item.options.map((option, idx) => (
                <li key={idx} className={styles.optionItem}>
                  {option}: {item.optionCounts[option]} پاسخ (درصد: {item.optionPercentages[option].toFixed(1)}%)
                </li>
              ))}
            </ul>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={item.options.map(option => ({
                  name: option,
                  تعداد: item.optionCounts[option],
                  درصد: item.optionPercentages[option].toFixed(1)
                }))}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="درصد" fill="#82ca9d">
                  <LabelList dataKey="name" position="insideLeft" angle={0} fill="#000" fontSize={12} />
                  <LabelList dataKey="درصد" position="right" formatter={(value) => `${value}%`} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
      <button onClick={handlePrint} className={styles.printButton}>چاپ تحلیل</button>
    </div>
  );
};

export default SurveyAnalysisPage;
