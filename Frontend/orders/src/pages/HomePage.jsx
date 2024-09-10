import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <img
        src="/public/g2.png"
        alt="تصویر سمت چپ"
        className={styles.leftImage}
      />
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>گروه صنعتی مدلل</h1>
        <p className={styles.subheading}>پیشگام با فناوری</p>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/services" className={styles.buttonLink}>
          <button className={styles.button}>خدمات</button>
        </Link>
        <Link to="/surveys" className={styles.buttonLink}>
          <button className={styles.button}>نظرسنجی</button>
        </Link>
      </div>
      <img
        src="/public/g.png"
        alt="تصویر سمت راست"
        className={styles.rightImage}
      />
    </div>
  );
}

export default HomePage;
