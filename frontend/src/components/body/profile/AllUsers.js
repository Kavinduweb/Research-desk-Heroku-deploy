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

function AllUsers() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user, isAdmin} = auth
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







  
  const handleDelete = async (id) => {
    try {
      if(window.confirm('Are you sure you want to delete this user?')){
        setLoading(true)
        await axios.delete(`https://researchdesk.herokuapp.com/user/delete/${id}`,{
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
           



            <div className="col-right">
              <h2>All Staff Members List</h2>
              

              <div style={{overflowX:"auto"}} className="user-list">
              <table className="customers">
                <thead>
                  <tr>
                   
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Admin</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user,index) => (
                      
                      <tr key={user._id}>
                       
                           <td>{index+1})&nbsp;{user._id}</td>
                           <td style={{ textAlign: "center" }}><img src={user.avatar}
                            style={{width: 60, height: 60, borderRadius: '50%', textAlign: 'center'}}
                           alt="avatar" className="avatar"/></td>
                          <td><b>{user.name}</b></td>
                          <td>{user.email}</td>
                          <td>{
                              user.role === 1
                              ? <h2><span class="badge badge-warning">Admin</span></h2> : ""
                             }
                             {
                              user.role === 2
                              ? <h2><span class="badge badge-dark">Supervisor</span></h2>: ""
                             }
                             {
                              user.role === 0
                              ? <h2><span class="badge badge-success">Staff-Member</span></h2> : ""
                             }
                             {
                              user.role === 3
                              ? <h2><span class="badge badge-info">Co-Supervisor</span></h2>: ""
                             }
                            </td>
                          <td style={{ textAlign: "center" }}>
                            {
                              user.role === 1

                              ?
                               <i  className="fa fa-check" title="Admin"></i>
                              : 
                               <Link className=""to={`/edit_user/${user._id}`}>
                                <button className="btn btn-warning">Make Admin</button>
                              </Link> 
                            }
                          </td>
                          <td>
                         {user.role !== 1
                         ?
                        <button className="btn btn-danger"
                            onClick={()=> handleDelete(user._id)}> Block Staff Member</button>
                             : ""
                         }
                          
                            
                          </td>
                          
                        </tr>
                    ))
                  }
                  
                   
                  
                </tbody>
              </table> 

              </div>


            </div>


      
      </div>


      </>
  )
}

export default AllUsers