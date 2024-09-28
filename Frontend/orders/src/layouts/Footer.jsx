import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumns}>
         
          <div className={styles.footerAbout}>
            <h3>درباره سامانه انتخاب</h3>
            <p>
            سامانه انتخاب به عنوان یک پشتیبان در راستای یکپارچه‌سازی صنعت نرم‌افزاری گروه مدلل فعالیت می‌کند. هدف ما ارتقای توان نرم‌افزاری گروه است که در نهایت به ارتقای سطح کیفی و تخصصی پرسنل منجر خواهد شد. ما در تلاشیم تا با بهره‌برداری از بهترین فناوری‌ها و روش‌ها، به پیشرفت و رشد گروه مدلل کمک کنیم.
            </p>
          </div>

          {/* ستون لینک‌های مفید */}
          <div className={styles.footerLinks}>
            <h3>بخش های سایت</h3>
            <ul>
              <li><a href="/services">خدمات</a></li>
              <li><a href="/surveys">نظرسنجی</a></li>
              <li><a href="#">تماس با ما</a></li>
            </ul>
          </div> 


       {/*  <div className={styles.footerSocial}>
          <a href="#" className={styles.socialIcon}>فیس‌بوک</a>
          <a href="#" className={styles.socialIcon}>اینستاگرام</a>
          <a href="#" className={styles.socialIcon}>لینکدین</a>
        </div> */}
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
