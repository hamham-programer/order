import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useUser } from "../router/UserContext";

function Header() {
  const { userRole } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="../../public/modall.png" className={styles.logo} />
        </Link>
        <span>
          <img src="../../public/location.svg" alt="Location" />
          <p>کرمانشاه</p>
        </span>
      </div>

      <div>
        <div className={styles.profileContainer}>
          <div className={styles.profile} onClick={toggleDropdown}>
            <img src="../../public/profile.svg" alt="Profile" />
            <p>مدلل من</p>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/profile"><img src="../../public/profile.svg" />پروفایل</Link>
              <Link to="/settings"><img src="../../public/service.svg" />تنظیمات</Link>
              <Link to="/logout"><img src="../../public/home.svg"  />خروج</Link>
            </div>
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
