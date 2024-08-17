import toast from "react-hot-toast"
import { sendOtp } from "../../services/auth"

function SendOtpForm({mobile, setMobile,setStep}) {
  const submithandler = async(event) =>{
    event.preventDefault()
    if(mobile.length !== 11) return
    const {response, error} = await sendOtp(mobile)
    if(response) {
      toast.success(response.data.message),
      setStep(2)
    }
    if(error) toast.error(error.response.data.message)   
    console.log(response, error);    
  }
  return (
    <form onSubmit={submithandler}>
      <p>ورود به حساب کاربری</p>
      <span>همکار گرامی برای ورود به سامانه سفارش لطفا شماره موبایل ثبت شده در شرکت را وارد کنید. کد تایید به این شماره پیامک خواهد شد </span>

      <label htmlFor="input"> لطفا شماره موبایل خود را وارد کنید</label>
      <input type="text" name="input" id="input" placeholder="شماره موبایل" 
      value={mobile} onChange={e => setMobile(e.target.value)} />

      <button type="submit">ارسال کد تایید</button>

    </form>
  )
}

export default SendOtpForm