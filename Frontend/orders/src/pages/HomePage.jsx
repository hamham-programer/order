import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

/* import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; */
const images = [
  '/g1.png',
  '/naz.jpg',
  '/k.jfif',
  '/naz.jpg',
   '/ke.jfif',
  '/naz.jpg',
  '/s.jpg',
  '/naz.jpg',
  '/k.jfif',
  '/ke.jfif',

];

function HomePage() {
  return (
    <>
      <div className={styles.homePage}>
        <img src="/g2.png" alt="تصویر سمت چپ" className={styles.leftImage} />
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>گروه صنعتی مدلل</h1>
          <p className={styles.subheading}>نوآور در فناوری و پیشگام در تحول دیجیتال</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/services" className={styles.buttonLink}>
            <button className={styles.button}>خدمات</button>
          </Link>
          <Link to="/surveys" className={styles.buttonLink}>
            <button className={styles.button}>نظرسنجی</button>
          </Link>
        </div>
        <img src="/g.png" alt="تصویر سمت راست" className={styles.rightImage} />
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={7} 
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]} 
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.contactSection}>
        <p class={styles.contactTitle}>راه‌های ارتباطی با گروه مدلل</p>
        <div className={styles.socialLinks}>
          <a href="https://chat.whatsapp.com/EMwaGckJjLV42iBFt1hY6T" className={styles.socialIconInstagram}><i class="fa-brands fa-instagram"></i></a>
          <a href="https://ir.linkedin.com/company/modalal" className={styles.socialIconLinkedin}><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://chat.whatsapp.com/EMwaGckJjLV42iBFt1hY6T" className={styles.socialIconWhatsapp}><i class="fa-brands fa-whatsapp"></i></a>
          <a href="#" className={styles.socialIconTelegram}><i class="fa-brands fa-telegram"></i></a>
          <a href="#" className={styles.socialIconComment}><i class="fa-solid fa-circle-check"></i></a>
          <a href="#" className={styles.socialIconEmail}><i class="fa-regular fa-envelope"></i></a>
        </div>
     </div>

    </>
  );
}

export default HomePage;
