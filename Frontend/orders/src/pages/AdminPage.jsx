import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../services/userService';


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
        <div>
            <h1>پنل ادمین</h1>
            <Link to="/admin/all-users">مشاهده لیست کاربران</Link> {/* لینک به صفحه جدید */}
            {/* سایر محتواها */}
        </div>
    );
};

export default AdminPage;
