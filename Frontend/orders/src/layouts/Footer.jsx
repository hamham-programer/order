import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumns}>
          {/* ستون درباره ما */}
          <div className={styles.footerAbout}>
            <h3>درباره ما</h3>
            <p>
              هدف ما در صنعت هوشمند یکپارچه کردن سیستم ها جهت ارتقای توان پرسنل می باشد
            </p>
          </div>

          {/* ستون لینک‌های مفید */}
          <div className={styles.footerLinks}>
            <h3>لینک‌های مفید</h3>
            <ul>
              <li><a href="#">خدمات</a></li>
              <li><a href="#">نظرسنجی</a></li>
              <li><a href="#">تماس با ما</a></li>
            </ul>
          </div>

        {/* شبکه‌های اجتماعی */}
        <div className={styles.footerSocial}>
          <a href="#" className={styles.socialIcon}>فیس‌بوک</a>
          <a href="#" className={styles.socialIcon}>اینستاگرام</a>
          <a href="#" className={styles.socialIcon}>لینکدین</a>
        </div>
      </div>
        </div>


      {/* قسمت نهایی پایین فوتر */}
      <div className={styles.footerBottom}>
        <p> طراحی شده توسط حمیدرضا شفیعی با 💓 در مدلل ماهیدشت</p>
      </div>
    </footer>
  );
}

export default Footer;
