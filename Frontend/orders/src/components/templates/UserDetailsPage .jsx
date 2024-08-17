import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/userService';


const UserDetailsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const { response, error } = await getUserById(userId);
            if (response) {
                setUser(response.data);
            }
            if (error) {
                setError('Failed to fetch user details');
            }
        };

        fetchUser();
    }, [userId]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Personnel Code:</strong> {user.personnelCode}</p>
                    <p><strong>Work Location:</strong> {user.workLocation}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetailsPage;
