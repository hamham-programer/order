import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/userService';

const UserProfilePage = () => {
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { response, error } = await updateProfile({ fullName, personnelCode, workLocation });
        if (response) {
            // Handle success
            navigate('/dashboard');
        }
        if (error) {
            // Handle error
        }
    };

    return (
        <div>
            <h1>بروزرسانی اطلاعات کاربر</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName"> نام و نام خانوادگی را وارد کنید:</label>
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
                    <label htmlFor="personnelCode">کد پرسنلی را وارد کنید</label>
                    <input
                        id="personnelCode"
                        type="text"
                        value={personnelCode}
                        onChange={(e) => setPersonnelCode(e.target.value)}
                        placeholder="کد پرسنلی"
                    />
                </div>
                <div>
                    <label htmlFor="workLocation">نام واحد سازمانی کاربر را وارد کنید:</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        placeholder=" واحد سازمانی"
                    />
                </div>
                <button type="submit">اعمال تغییرات</button>
            </form>
        </div>
    );
};

export default UserProfilePage;
