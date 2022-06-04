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

function Supervisorlist() {
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
    <div  >
          <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Supervisors</h1>
    <div className='profile_page'>

{
                    crs?.map((cr , index) => (
                      <div>
                        {cr.role===2?
                        <div >
                       
                       <div class="containerR">
  <div class="cardR">
    <div class="cardR-header" style={{textAlign: 'center'}}>
      <img className='p-2'
      
      src={cr.avatar} alt="rover" />
    
    </div>
    <div class="cardR-body">
    <span class="tag tag-teal">Supervisor</span>
      <h3 style={{textTransform:"uppercase"}}>
        {cr.name}
      </h3>
      <a  >Interested Fields :
   <br /> 

<a style={{ color: 'white' , fontSize:"15px", textTransform:"uppercase"}} className="badge badge-pill badge-dark"  >
  {cr.job.replace(/,/g, ' | ')}

</a>

</a>
<p className='mt-2' scope="row"> Email : &nbsp;{cr.email}</p>

    
      <div class="userR">
      <Link  className='mb-3' to={`/requestsupervisor/${cr._id}/${cr.name}`}>
  <button className="btn btn-warning">                          
 Request Supervisors
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








      </div>
  )
}

export default Supervisorlist