import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../body/auth/auth.css';
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
 import {isEmpty, isEmail, isLength, isMatch, isRole} from '../utils/notification/validation/Validation'
import Select from "react-dropdown-select";
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";



const initialState = {
    studentNumber:'',
    name: '',
    email: '',
    password: '',
    err: '',
    success: '',

}



function StdRegister() {
    const [user, setUser] =useState(initialState)
  
    const {studentNumber,name, email, password, err, success} = user

  

    const handeInputChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err:'', success:''})
        
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
       

            // if(isEmpty(name) || isEmpty(password) || ) 
            // return setUser({...user, err:"Please fill all fields", success:''})

            // if(!isEmail(email) ) 
            // return setUser({...user, err:"invalid email", success:''})

            // if(isLength(password) )
            // return setUser({...user, err:"Password must be atleast 6 charactors", success:''})



            try {


                const res = await axios.post('student/stdreg', {
                    studentNumber,name, email, password
                })
                setUser({...user, err:'', success:res.data.msg})



        }catch(err) {
           err.response.data.msg &&  
           setUser({...user, err:err.response.data.msg, success:''})
        }

    }



  return (
      <div>
          {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
    <div className="login_page">
        
        <h2>Student Registration</h2>
        

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Your Name" id="name"
                value={name} name="name" onChange={handeInputChange}/>
            </div>
            <div>
                <label htmlFor="name">Student ID</label>
                <input type="Number" placeholder="Enter Student Id" id="name"
                value={studentNumber} name="studentNumber" onChange={handeInputChange}/>
            </div>


            <div>
                <label htmlFor="email">Email Address</label>
                <input type="text" placeholder="Enter Email Address" id="email"
                value={email} name="email" onChange={handeInputChange}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" id="password"
                value={password} name="password" onChange={handeInputChange}/>
            </div>

            <div className="row">
               <button type="submit">Register</button>
               
            </div>


        </form>
        
                <p>Already registered? <Link to="/stdlogin">Login</Link></p>
               
        
     </div>
     </div>
  )
}

export default StdRegister