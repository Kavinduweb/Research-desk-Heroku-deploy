import React, {useState, useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { set } from 'express/lib/application'


function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

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
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        } else{
            history.push('/profile')
        }
    },[users, id, history])

   const handleUpdate = async () => {
       try{
           if (num %2 !== 0){
               const res = await axios.patch(`https://researchdesk.herokuapp.com/user/update_role/${editUser._id}`, {
                   role : checkAdmin ? 1 : 0
                },{
                    headers: {Authorization: token}
                })
                setSuccess(res.data.msg)
                setNum(0)
           }

       }catch( err){
           err.response.data.msg && setErr(err.response.data.msg)
       }
   }

   const handleCheck = () => {
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
               <h2>Edit User</h2>
               <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      
    </div>

              <div className="form-froup">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" defaultValue={editUser.name}
                placeholder="Your Name" />
              </div>
              <div className="form-froup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" defaultValue={editUser.email}
                placeholder="Your email" disabled/>
              </div>

              <div className="form-froup">
              <label htmlfor="isAdmin">Click To admin</label>
                  <input type="checkbox" id="isAdmin" checked={checkAdmin} 
                 onChange={handleCheck} /> 
                 
              </div>
              

                      

              <button onClick={handleUpdate} > Update </button>
             
             

        </div>
        </div>
  )
}

export default EditUser