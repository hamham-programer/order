import toast from "react-hot-toast"
import { sendOtp } from "../../services/auth"
import styles from "./SendOtp.module.css"

function SendOtpForm({mobile, setMobile,setStep}) {
  const submithandler = async(event) =>{
    event.preventDefault()
    if(mobile.length !== 11){
      toast.error("شماره موبایل باید ۱۱ رقم باشد.");
      return
    }
      
    const {response, error} = await sendOtp(mobile)
    if(response && response.data) {
      toast.success(response.data.message),
      setStep(2)
    }
    if(error&& error.response && error.response.data) toast.error(error.response.data.message)   
    console.log(response, error);    
  }
/*   if (error) {
    console.error("ارسال OTP با مشکل مواجه شد:", error);}
    // خطا را به صورت مناسب مدیریت کنید، مثلا یک پیام کاربرپسند نمایش دهید
    return;
} */
  return (
    <form onSubmit={submithandler} className={styles.form}>
      <h1>انتخاب | مدلل</h1>
      <p>ورود به حساب کاربری</p>
      <span>همکار گرامی برای ورود به سامانه انتخاب لطفا شماره موبایل ثبت شده در شرکت را وارد کنید. کد تایید به این شماره پیامک خواهد شد </span>

      <label htmlFor="input"> لطفا شماره موبایل خود را وارد کنید</label>
      <input type="text" name="input" id="input" placeholder="شماره موبایل" 
      value={mobile} onChange={e => setMobile(e.target.value)} />

      <button type="submit">ارسال کد تایید</button>

    </form>
  )
}

export default SendOtpForm