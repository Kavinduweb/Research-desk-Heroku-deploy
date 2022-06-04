import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

import { use } from 'express/lib/application'

import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/usersActions'




const initialState = {
  name: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function CoSupervisorlist() {
  const auth = useSelector(state => state.auth)
  

  const {user, isAdmin, isSTD} = auth





    const [crs, setCrs] = useState();
    const [userss, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch('http://localhost:5000/user/alldata');
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])



  




  return (
    <div>
    <div>
    <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}> Co-Supervisors</h1>

    {
                    crs?.map((cr , index) => (
                      <div>
                        {cr.role===3?
                        <div >
                       
                       <div class="containerR">
  <div class="cardR">
    <div class="cardR-header" style={{textAlign: 'center'}}>
      <img className='p-2'
      
      src={cr.avatar} alt="rover" />
    
    </div>
    <div class="cardR-body">
    <span class="tag tag-teal">Co-Supervisor</span>
      <h3 style={{textTransform:"uppercase"}}>
        {cr.name}
      </h3>
      <a  >Interested Fields :


<div>
<p  style={{ color: 'white' , fontSize:"15px", textTransform:"uppercase", overflowx: 'scroll' }} className="badge badge-pill badge-dark"  >
  {cr.job.replace(/,/g, ' | ')}

</p>
</div>

</a>
<p className='mt-2' scope="row"> Email : &nbsp;{cr.email}</p>

    
      <div class="userR">
      <Link  className='mb-3'  to={`/requestcosupervisor/${cr._id}/${cr.name}`}>
  <button className="btn btn-warning">                          
 Request Co-Supervisor
  </button>
  </Link>
      </div>
    </div>
  </div>
  </div>

 
      










                          </div>
                          :''}
                          

                      </div>

                    ))}

    
     
    </div>

    <div className="profile_page">
 



            <div className="col-right">
              
              

              <div style={{overflowX:"auto"}} className="user-list">

             
                
             
                   
                  
                
           

              </div>


            </div>


      
      </div>


      </div>
  )
}

export default CoSupervisorlist