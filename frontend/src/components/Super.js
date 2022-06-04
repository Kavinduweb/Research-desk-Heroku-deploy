import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from './utils/notification/validation/Validation'
import {showErrMsg, showSuccessMsg} from './utils/notification/Notification'
import { use } from 'express/lib/application'

import {fetchAllUsers, dispatchGetAllUsers} from '../redux/actions/usersActions'




const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function Super() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user, isSuper} = auth
  const [data, setData] = useState(initialState)

  const {name, password, cf_password, err, success} = data
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  const dispatch = useDispatch()


  useEffect(() => {
   
  
    if(isSuper){
         fetchAllUsers(token).then(res => {
          dispatch(dispatchGetAllUsers(res))
        })
      }

    

  },[token, isSuper, dispatch, callback])


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
    const res = await axios.post('/api/upload_avatar', formData, {
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

      },{
        headers: {Authorization: token}
      }) 

      setData({...data, err:'', success:"Update Success" })

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
    if(name || avatar) updateInfor()
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



  return (
    <>
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      {loading && <h3> loading....</h3>}
    </div>
    <div className="profile_page">
             <div className="col-left">
               <h2>{isSuper ? "Supervisor Profile" : "User Profile" }</h2>

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





      
      </div>


      </>
  )
}

export default Super