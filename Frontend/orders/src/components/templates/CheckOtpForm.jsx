import toast from "react-hot-toast"
import { chechOtp } from "../../services/auth"
import {setCookie} from "../../utils/cookie"

function CheckOtpForm({code, setCode, setStep, mobile}) {
  const submitHandler = async (event) =>{
    event.preventDefault()
    if(code.length !== 5) return
    const {response, error} = await chechOtp(mobile, code)
    if(response){
      toast.success(response.data.message)
    }
     if(error) toast.error(error.response.data.message)
    
  }
  return (
    <form onSubmit={submitHandler}> 
      <p>تایید کد پیامک شده به تلفن  همراه </p>
      <span> کد پیامک شده به شماره موبایل "{mobile}" را وارد کنید</span>

      <label htmlFor="input">لطفا کد تایید را وارد کنید</label>
      <input type="text" name="input" id="input" placeholder="کد تایید" 
       value={code} onChange={e => setCode(e.target.value)}/>
       <button type="submit">ورود به سامانه</button>
       <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  )
}

export default CheckOtpForm