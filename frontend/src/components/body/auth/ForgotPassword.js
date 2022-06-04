 import React, {useState} from 'react'
 import axios from 'axios'
 import { isEmail } from '../../utils/notification/validation/Validation'
 import { showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
 
const initialState = {
    email: '',
    err: '',
    success: ''


}


 function ForgotPassword() {
    const [data, setData] = useState(initialState) 

    const {email, err, success} = data


    const handeChangeInput = (e) => { 

        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})

    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Email is not valid', success: ''})
            
            try {
                const res = await axios.post('https://researchdesk.herokuapp.com/user/forgot', {email})
                return setData({...data, err: '', success: res.data.msg})

            }catch(err){
                err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
            
            
        }
    }
     




   return (
     <div className="login_page">
         <h2>Forgot Password</h2>

         <div className="row">

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            </div>
            <br/>

            <div className="row">
            <label style={{marginLeft:'-10px'}}  >Email Address</label>

            <input  type="email" name="email" id="email" placeholder="Email "value={email} 
            onChange={handeChangeInput}/> 
            <button style={{textDecoration:"none" ,marginLeft:'0px', width:"250px", textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}} onClick={forgotPassword}>Verify Your Email</button>

            </div>
         </div>
   )
 }
 
 export default ForgotPassword