import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateUserByAdmin } from '../../services/userService';


const AdminUpdateUserPage = () => {
    const { userId } = useParams();
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user data by userId if needed
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { response, error } = await updateUserByAdmin(userId, { fullName, personnelCode, workLocation, role });
        if (response) {
            alert('User updated successfully');
        }
        if (error) {
            setError('Failed to update user');
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="personnelCode">Personnel Code:</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="Personnel Code"
                    />
                </div>
                <div>
                    <label htmlFor="workLocation">Work Location:</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        placeholder="Work Location"
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                    />
                </div>
                <button type="submit">Update User</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AdminUpdateUserPage;
