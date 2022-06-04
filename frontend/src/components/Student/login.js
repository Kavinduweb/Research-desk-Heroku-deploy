import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import '../body/auth/auth.css';
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import {STDdispatchLogin} from '../../redux/actions/authAction'
import  {useEffect} from "react";

import {useDispatch, useSelector} from 'react-redux'
import { fetchUser, dispatchGetUser} from '../../redux/actions/authAction'


const initialState = {
    studentNumber: '',
    password: '',
    err: '',
    success: ''
}

function STDLogin() {
    const [user, setUser] =useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const token = useSelector(state => state.token)
    const authstd = useSelector(state => state.authstd)
  
   

    const {studentNumber, password, err, success} = user

    
        // const loginvalid = localStorage.getItem('firstLogin1')
        // if(loginvalid){
        //     window.location.replace('/Student-Home');
            
        // }
        // else{
        //    // alert(loginvalid)
        //    // window.location.replace('/Student-Home')
        // }
        

    const handeInputChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err:'', success:''})
    }
    
  
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {

            const res = await axios.post('student/login', {studentNumber, password})
            setUser({...user, err:'', success:res.data.msg})


            localStorage.setItem('firstLogin1',true)
            dispatch(STDdispatchLogin()) 
             localStorage.removeItem('firstLogin')
            
            history.push('/Student-Home')
            




        }catch(err) {
           err.response.data.msg &&  
           setUser({...user, err:err.response.data.msg, success:''})
        }

    }
        
    

            
   

   


  return (
    <div className="login_page">
        <h2>Student Login</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Student Number</label>
                <input type="Number" placeholder="Enter Email Address" id="email" 
                value={studentNumber} name="studentNumber" onChange={handeInputChange}/ >
                
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" id="password"
                value={password} name="password" onChange={handeInputChange}/>
            </div>
            <br />
            <div className="row" style={{marginTop:"-1rem"}}>
               <button type="submit">Login</button>
               &nbsp;
               &nbsp;
               &nbsp;
              
            </div>



        </form>
        
        <p>New Student ? <Link to="/stdreg" style={{ fontSize: '20px' ,textDecoration: 'inherit'}}>Register</Link></p>
     </div>
  )
}

export default STDLogin