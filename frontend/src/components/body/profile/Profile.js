import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/notification/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { use } from 'express/lib/application'

import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersActions'
import Swal from 'sweetalert2'



const initialState = {
  name: '',
  password: '',
  cf_password: '',
  job: '',
  err: '',
  success: ''
}

function Profile() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user, isAdmin , isSuper , isCoSuper, isLogged} = auth
  const [data, setData] = useState(initialState)

  const {name, password, cf_password,job, err, success} = data
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
   
  
    if(isAdmin){
         fetchAllUsers(token).then(res => {
          dispatch(dispatchGetAllUsers(res))
        })
      }

    

  },[token, isAdmin, dispatch, callback])


  const handeChangeInput = (e) => {
    const {name, value} = e.target 
    setData({...data, [name]: value, err: '', success: ''})
  }

  const changeAvatar = async(e) => {
    e.preventDefault()
    try{
      const file = e.target.files[0]

      if (!file) return setData({...data, err:"No file Uploaded", success: ''})

      if (file.size > 1024 * 1024) 
       setData({...data, err:"size is too large", success: ''})
       
    

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
    setData({...data, err:"File fomat is incorrect", success: ''})

    let formData = new  FormData()
    formData.append('file', file)

    setLoading(true)
    const res = await axios.post('https://researchdesk.herokuapp.com/api/upload_avatar', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization:token}
    })

    setLoading(false)
    setAvatar(res.data.url)
      
    


    }catch(err){
      setData({...data, err: err.response.data.message, success: ''})
    }
    
  }

  const updateInfor = () => {
    try{
      axios.patch('/user/update',{
        name: name? name : user.name,
        avatar: avatar? avatar : user.avatar,
        job: job? job : user.job

      },{
        headers: {Authorization: token}
      }) 

      setData({...data, err:'', success:"Profile Updateed Successfully" })

      
      

    }catch(err){
        setData({...data, err: err.response.data.message, success: ''})
    }
  }

  const updatePassword = () => {

    if(isLength(password))
    return setData({...data, err: 'Password must be at least 6 characters', success: ''})
    
    if(!isMatch(password, cf_password))
    return setData({...data, err: 'Password and Confirm Password must be match', success: ''})
    
    try{ 
      axios.post('/user/reset',{password},{
        headers: {Authorization: token}
      }) 



      setData({...data, err:'', success:"Update Success" })

    }catch(err){
        setData({...data, err: err.response.data.message, success: ''})
    }
  }

  const handleUpdate = () => {
    if(name || avatar || job) updateInfor()
    if(password) updatePassword()
  }
  
  const handleDelete = async (id) => {
    try {
      if(window.confirm('Are you sure you want to delete this user?')){
        setLoading(true)
        await axios.delete(`/user/delete/${id}`,{
          headers: {Authorization: token}
        })

        setLoading(false)
        setCallback(!callback)
      }

    }catch(err) {
      setData({...data, err: err.response.data.msg, success: ''})
    }

  }

  // if(user.role ===  !1)
  // return (
  //   <h2>You are not allowed to access this page</h2>
  // );
  



  return (
    <>
    <div>
      
    </div>
    <div className="profile_page">
             <div className="col-left">
               <h2>{isAdmin ? "Admin Profile" : "Staff-Member Profile " }</h2>
               

{err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      {loading && <h3> loading....</h3>}
               <div className="avatar">
                  <img src={avatar ? avatar: user.avatar} alt="" />
                  <span>
                    <p>Change</p>
                    <input type="file" name="file" id="file_up" onChange={changeAvatar}/>

                  </span>
                     
               </div>

              <div className="form-froup">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" defaultValue={user.name}
                placeholder="Your Name" onChange={handeChangeInput}/>
              </div>
              <div className="form-froup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" defaultValue={user.email}
                placeholder="Your email" disabled/>
              </div>
              <label htmlFor="job">Interests </label>
              <em style={{fontSize:"15px",color:"crimson"}}>**Split Interests with a Comma (,)</em> <br/>
                <input type="text" name="job" id="job" defaultValue={user.job}
                placeholder="Your job" onChange={handeChangeInput}/>
              <div className="form-froup">
                <label htmlFor="password">New Password</label>
                <input type="password" name="password" id="password" 
                placeholder="Your password" value={password} onChange={handeChangeInput} />
              </div>
              <div className="form-froup">
                <label htmlFor="cf_password">Confirm Password</label>
                <input type="password" name="cf_password" id="cf_password" 
                placeholder="Confirm password" value={cf_password} onChange={handeChangeInput} />
              </div>

              <div className="">
                    <em style={{color: 'crimson'}}>
                      if you update your password here you wont be able to use google or facebook login
                    </em>

                </div>
                      

              <button disabled={loading} onClick={handleUpdate} > Update </button>
             </div>


{/* 
            <div className="col-right">
              <h2>{isAdmin ? "Users" : "" }</h2>
              

              <div style={{overflowX:"auto"}} className="user-list">
              <table className="customers">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Admin</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => (
                      
                      <tr key={user._id}>
                           <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{
                              user.role === 1
                              ? <p>Admin</p> : ""
                             }
                             {
                              user.role === 2
                              ? <p>Supervisor</p> : ""
                             }
                             {
                              user.role === 0
                              ? <p>Staff Member</p> : ""
                             }
                             {
                              user.role === 3
                              ? <p>Co-Supervisor</p> : ""
                             }
                            </td>
                          <td>
                            {
                              user.role === 1
                              ? <i className="fa fa-check" title="Admin"></i>
                              : <i className="fa fa-times" title="User"></i>
                            }
                          </td>
                          <td>
                            <Link to={`/edit_user/${user._id}`}>
                              <i className="fa fa-edit" title="Edit"></i>
                            </Link>
                            <i className="fa fa-trash" title="Delete"
                            onClick={()=> handleDelete(user._id)}></i>
                          </td>
                          
                        </tr>
                    ))
                  }
                  
                   
                  
                </tbody>
              </table> 

              </div>


            </div> */}


      
      </div>


      </>
  )
}

export default Profile