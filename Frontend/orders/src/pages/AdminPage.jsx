import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../services/userService';
import styles from './AdminPage.module.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { response, error } = await getAllUsers();
            if (response) {
                setUsers(response.data.users);
            } else {
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className={styles.adminPage}>
            <h1>پنل ادمین</h1>
            <div className={styles.cardContainer}>
                <Link to="/admin/all-users" className={styles.card}>
                    <div className={styles.cardContent}>
                        <i className="fa-solid fa-user-check"></i> 
                        <h2>مشاهده لیست کاربران</h2>
                    </div>
                </Link>

                <Link to="/admin/create-category" className={styles.card}>
                    <div className={styles.cardContent}>
                        <i className="fa-solid fa-folder-plus"></i>
                        <h2>ایجاد دسته بندی</h2>
                    </div>
                </Link>
                
                <Link to="/admin/create-post" className={styles.card}>
                    <div className={styles.cardContent}>
                        <i className="fa-solid fa-file-circle-plus"></i>
                        <h2>ایجاد آگهی</h2>
                    </div>
                </Link>
                
                <Link to="/admin/post-list" className={styles.card}>
                    <div className={styles.cardContent}>
                        <i className="fa-solid fa-list"></i>
                        <h2>لیست آگهی‌ها</h2>
                    </div>
                </Link>

                <Link to="/admin/survey-list" className={styles.card}>
                    <div className={styles.cardContent}>
                        <i className="fa-solid fa-list"></i>
                        <h2>لیست نظرسنجی ها</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminPage;
