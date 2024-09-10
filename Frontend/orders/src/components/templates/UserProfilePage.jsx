import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfile, updateProfile } from '../../services/userService';
import Select from 'react-select'; 
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';
import styles from "./UserProfilePage.module.css";
const UserProfilePage = () => {
    const [fullName, setFullName] = useState('');
    const [personnelCode, setPersonnelCode] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [organization, setOrganization] = useState('')
    const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
    const [profileIncomplete, setProfileIncomplete] = useState(false);
    const navigate = useNavigate();
    const companyList = [
        { value: "دفتر مرکزی تهران", label: "دفتر مرکزی تهران" },
        { value: "مدلل ماهیدشت(نازگل)", label: "مدلل ماهیدشت(نازگل)" },
        { value: "مدلل شمال(غنچه)", label: "مدلل شمال(غنچه)" },
        { value: "سیمان مدلل", label: "سیمان مدلل" },
        { value: "گلاره کلهر", label: "گلاره کلهر"},
        { value: "مهرپلاست مدلل", label: "مهرپلاست مدلل"},
        { value: "روغنکشی بندر امام خمینی", label:"روغنکشی بندر امام خمینی"},
        { value: "پروژه غلات", label: "پروژه غلات"},
        { value: "آوا تجارت صبا", label: "آوا تجارت صبا"},
        { value: "نابدانه مدلل" , label: "نابدانه مدلل"},
        { value: "دامپروری باوان کلهر",  label: "دامپروری باوان کلهر"},
        { value: "دامپروری میلکان", label: "دامپروری میلکان"},
        {value:"کلهر شیمی", label: "کلهر شیمی"}, 
        {value: "ناب شکر",label: "ناب شکر",}, 
        {value: "اسکله بندر",label: "اسکله بندر"}, 
        {value: "سنگین بار کلهر", label: "سنگیم بار کلهر"}, 
        {value:"کلهر بار" ,label: "باربری کلهر بار"}, 
    ];
    const companyUnit =[
        {id:1, label: "مدیریت"},
        {id:2, label: "مالی"},
        {id:3, label: "تدارکات",},{id:4, label: "کارگزینی",},{id:5, label: "برنامه ریزی و انبارها"},{id:6, label:"انفورماتیک" }, {id:7, label:"اداری گلاره کلهر"},
        {id:8, label:"فروش روغن نباتی" },{id:9 ,label:" فروش روغنکشی" },{id:10 , label:"ایمنی و بهداشت" },{id:11 , label:  "تحقیق و توسعه"},{id:12 , label:"مخابرات" },{id:13 , label: "آموزش"},
        {id: 14, label: "حراست"},{id:15 , label: "لیسیتین"},{id:16 , label:"ساختمانی" },{id:17 , label:   "بارگیری کنجاله"},{id:18 , label: "پلیت کنی فاز1"},
        {id:19 , label:"پلیت کنی فاز2" },{id:20 , label:"آماده سازی فاز1" },{id:21, label: "آماده سازی فاز2"},{id:22 , label:"جوشکاری روغنکشی"},
        {id:23 , label:"جوشکاری روغن نباتی" },{id:24 , label: "آزمایشگاه روغنکشی"},
        {id:25 , label: "آزمایشگاه کنترل کیفیت روغن نباتی"},{id:26 , label: "آزمایشگاه تضمین کیفیت روغن نباتی"},
        {id:27 , label: "انبار کنجاله"}
        
    ]
/* 
        ,"سیلو","انبار قطعات وملزومات روغنکشی","انبار قطعات و ملزومات روغن نباتی",
        "انبار محصول","انبار مواد اولیه روغن نباتی","واحد برق روغنکشی","واحد برق روعن نباتی",
        "تاسیسات روغن نباتی","مکانیک","مارگارین","پرکنی جامد","پرکنی بطری","الکترولایزر",
        "دیگ بخار روغن نباتی ","دیگ بخار روغنکشی","رستوران","سس","پالایش","چاپ","قطعه سازی",
        "آب آشامیدنی","گلخانه","تخلیه دانه","خدمات","سایر",
         */
        
 
    useEffect(() => {
        const verifyProfile = async () => {
            const { response, error } = await checkProfile();
            if (error) {
                console.error("Error checking profile:", error?.response);
                return;
            }
            if (response && response.isProfileCompleted) {
                navigate('/'); 
            } else {
                setProfileIncomplete(true); // پروفایل نیاز به تکمیل دارد
            }
            setIsLoading(false); 
        };

        verifyProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { response, error } = await updateProfile({ fullName, personnelCode, workLocation, organization });
        if (response) {
            navigate('/');
        } else {
            // Handle error
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!profileIncomplete) {
        return null; 
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
                    <label htmlFor="organization">نام شرکت خود را واردکنید</label>
                    {/* <select
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}>
                         <option value="">انتخاب شرکت</option>
                         {companyList.map((company) => (
                            <option key={company} value={company}>{company}</option>
                         ))}

                    </select> */}
                    <Select
                        id='organization'
                        options={companyList}
                        value={companyList.find(company => company.value === organization) || null}
                        onChange={(e) => setOrganization(e? e.value : "")}
                        placeholder="انتخاب شرکت"
                    />
                        
                   
                </div>
                {/* <div>
                    <label htmlFor="workLocation">نام واحد کار را وارد کنید:</label>
                    <input
                        id="workLocation"
                        type="text"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        placeholder="واحد شرکتی"
                    />
                </div> */}
                <div>
                    <label htmlFor="workLocation">نام واحد کار را وارد کنید:</label>
                    <Autocomplete
                        id="workLocation"
                        options={companyUnit}
                        getOptionLabel={(option) =>  option.label }
                        value={companyUnit.find(unit => unit.label === workLocation) || null}
                        onChange={(e, newValue) => setWorkLocation(newValue? newValue.value: "")}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="واحد شرکتی" />
                        )}
                    />
                </div>
                <button type="submit">اعمال تغییرات</button>
            </form>
        </div>
    );
};

export default UserProfilePage;
