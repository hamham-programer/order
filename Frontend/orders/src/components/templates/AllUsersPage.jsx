import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { response, error } = await getAllUsers();
                if (response) {
                    setUsers(response.data.users);
                }
                if (error) {
                    setError('Failed to fetch users');
                    console.error('Error fetching users:', error);
                }
            } catch (error) {
                setError('An unexpected error occurred');
                console.error('Unexpected error:', err);
            }
        };
    
        fetchUsers();
    }, []);
    

    return (
        <div>
            <h1>لیست تمام کاربران</h1>
            <table>
                <thead>
                    <tr>
                        <th>نام و نام خانوادگی</th>
                        <th>موبایل</th>
                        <th>کد پرسنلی</th>
                        <th>محل کار</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.mobile}</td>
                            <td>{user.personnelCode}</td>
                            <td>{user.workLocation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsersPage;
