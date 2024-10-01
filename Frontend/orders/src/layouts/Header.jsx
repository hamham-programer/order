import { useState } from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import { useCart } from "../router/CartContext"; 
import styles from "./Header.module.css";
import { useUser } from "../router/UserContext";
import { logOut } from "../services/user";

function Header() {
  const { userRole } = useUser();
  const { cartItems } = useCart(); // گرفتن اقلام سبد خرید
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async (e) => {
    e.preventDefault(); 
    try {
      await logOut(); 
      navigate("/auth"); 
      window.location.reload(); 

    } catch (error) {
      console.error("Error logging out:", error);
    }
    }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // محاسبه تعداد کل اقلام

  // بررسی صفحه فعلی با استفاده از useLocation
  const location = useLocation();
  const isServicesPage = location.pathname === "/services"; // فرض می‌کنیم مسیر صفحه خدمات "/services" است

  return (
    <header className={styles.header}>
     <div className={styles.links}>
        <Link to="/">خانه</Link>
        <Link to="/services">خدمات</Link>
        <Link to="/surveys">نظرسنجی</Link>
{/* 
        <a href="/">خانه</a>
        <a href="/">خدمات</a>
        <a href="/">نظرسنجی</a> */}
      </div>


      <div className={styles.branding}>
        <p>انتخاب | مدلل</p>
      </div>
      <div>
        <div className={styles.profileContainer}>
          <div className={styles.profile} onClick={toggleDropdown}>
            <img src="../../public/profile.svg" alt="Profile" />
            <p>مدلل من</p>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/admin"><img src="../../public/profile.svg" alt="Profile" />پروفایل</Link>
              <Link to="/settings"><img src="../../public/service.svg" alt="Settings" />تنظیمات</Link>
              <Link to="/logout" onClick={handleLogout}><img src="../../public/home.svg" alt="Logout" />خروج</Link>
            </div>
          )}
          {isServicesPage && ( // نمایش آیکون سبد خرید فقط در صفحه خدمات
            <Link to="/cart" className={styles.cartIcon}>
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>} 
            </Link>
          )}
        </div>
        {userRole === "ADMIN" && (  
          <Link to="/dashboard" className={styles.button}>
            ثبت آگهی
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
