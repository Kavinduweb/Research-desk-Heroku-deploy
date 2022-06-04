import React, {useState, useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { set } from 'express/lib/application'


function PanelEdit() {
    const {id} = useParams()
    const history = useHistory()
    const [PaneleditUser, setPanelEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

  


    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){ 
                    setPanelEditUser(user)
                    setCheckAdmin(user.roledesc === 1 ? true : false)
                }
            })
        } else{
            history.push('/profile')
        }
    },[users, id, history])

   const handleUpdated = async () => {
       try{
           if (num === 1){ 
               const res = await axios.patch(`https://researchdesk.herokuapp.com/user/update_panel/${PaneleditUser._id}`, {
                   roledesc : checkAdmin ? 1 : 0
                },{
                    headers: {Authorization: token}
                })
                setSuccess(res.data.msg)
                setNum(1)
           }

       }catch( err){
           err.response.data.msg && setErr(err.response.data.msg)
       }
   }

   const handleChecked = () => {
       setSuccess('')
         setErr('')
         setCheckAdmin(!checkAdmin)
         setNum(num + 1)

   }


  return (
    <div className="profile_page">
        
        
        <div className="row">  
            <button onClick={() => history.goBack()} className="go_back">
               <i className="fa fa-long-arrow-alt-left"></i> Go Back
            </button>
        </div>


             <div className="col-left">
             {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
               <h2>Add or Remove Panel Member</h2>
               <div>
      
      
    </div>

              <div className="form-froup">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" defaultValue={PaneleditUser.name}
                placeholder="Your Name" disabled/>
              </div>
              <div className="form-froup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" defaultValue={PaneleditUser.email}
                placeholder="Your email" disabled/>
              </div>

              <div className="form-froup">
              <label htmlfor="isAdmin">Check the Tick Box To Add User to the Panel</label>
                  <input type="checkbox" id="isAdmin" checked={checkAdmin} 
                 onChange={handleChecked} /> 
                 
              </div>
              

                      

              <button onClick={handleUpdated} > Update </button>
             
             

        </div>
        </div>
  )
}

export default PanelEdit