import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/notification/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { use } from 'express/lib/application'

import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersActions'




const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function Panelexp() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user, isAdmin} = auth
  const [data, setData] = useState(initialState)

  const {name, password, cf_password, err, success} = data
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



  




  return (
    <>
    <div>
   
    </div>
    <h1>Assign Groups to Panel Members</h1>
    <div className="profile_page">
          



            <div className="col-right">
              
              

              <div style={{overflowX:"auto"}} className="user-list">
             
                
                
                  {
                    users.map(user  => (
                      
                      <div >
                        
                        

                          { user.roledesc === 1 ?







                          <div className="col-md-8 card me-3 mt-1 mb-3 p-2" key={user.id}>

            
                            
                            <div className="col">
                            


                        <h3 scope="row" className="col-md-5 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>
                        
                           {user.name} </h3> 
                              
                            <p scope="row"> Area of Experties :{user.job} </p> 
                           
                        
                          <p scope="row"> Email : {user.email}</p>
                          
                          <div className="row">
                          <Link   to={`/panel_edit/${user._id}`}>
                            <button className="btn btn-warning">                          
                            Remove from Panel
                            </button>
                            </Link>
                          </div>

                          <div  className="row mt-2">
                            
                            <Link   to={`/CreateGroupAssign/${user._id}/${user.name}`}>
                            <button className="btn btn-warning">                          
                           Assign Student Groups
                            </button>
                            </Link>
                            </div>
                            </div>


                            <div className="col">
             <div  style={{marginTop:"-190px"}}  className="col-left">
              

               <div className="avatar">
                  <img src={avatar ? avatar: user.avatar} alt="" />
                  
                     
               </div>
               </div>
               </div>

                           </div>
                            : ""
                        }
                                </div>
                    ))
                  }
                  
                   
                  
                
           

              </div>


            </div>


      
      </div>


      </>
  )
}

export default Panelexp