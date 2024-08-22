import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfile, updateProfile } from '../../services/userService';
import styles from "./UserProfilePage.module.css"
const UserProfilePage = () => {
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
    const [profileIncomplete, setProfileIncomplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyProfile = async () => {
            const { response, error } = await checkProfile();
            if (error) {
                console.error("Error checking profile:", error?.response);
                return;
            }
            if (response && response.isProfileCompleted) {
                navigate('/dashboard'); // هدایت به داشبورد اگر پروفایل تکمیل شده باشد
            } else {
                setProfileIncomplete(true); // پروفایل نیاز به تکمیل دارد
            }
            setIsLoading(false); // پایان بارگذاری
        };

        verifyProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { response, error } = await updateProfile({ fullName, personnelCode, workLocation });
        if (response) {
            navigate('/dashboard');
        } else {
            // Handle error
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // در حال بارگذاری
    }

    if (!profileIncomplete) {
        return null; // پروفایل کامل است، نمایش ندهید
    }

    return (
        <div className={styles.form}>
            <h1>بروزرسانی اطلاعات کاربر</h1>
            <p>همکار محترم برای ورود اولیه اطلاعات خود را دقیق وارد کنید. در دفعات بعدی نیازی به وارد کردن این اطلاعات نمی باشد</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">نام و نام خانوادگی را وارد کنید:</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="نام و نام خانوادگی"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="personnelCode">کد پرسنلی را وارد کنید:</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="کد پرسنلی"
                    />
                </div>
                <div>
                    <label htmlFor="personnelCode">نام سازمان خود را واردکنید</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="سازمان"
                    />
                </div>
                <div>
                    <label htmlFor="workLocation">نام واحد سازمانی را وارد کنید:</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        placeholder="واحد سازمانی"
                    />
                </div>
                <button type="submit">اعمال تغییرات</button>
            </form>
        </div>
    );
};

export default UserProfilePage;
