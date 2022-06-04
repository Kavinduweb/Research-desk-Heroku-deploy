import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
//import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersActions'
import Swal from 'sweetalert2'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Allstd() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)



 

  const dispatch = useDispatch()

  const [crs, setCrs] = useState();
  useEffect(() => {
  


      const fetchstd = async () => {
        const res = await fetch('http://localhost:5000/student/all');
          const data = await res.json();
          console.log(data);
          setCrs(data);
          };
          fetchstd();  

  },[])





 
  return (
    <div >
      
<h1>All Students </h1>
      
         {crs?.map((cr , index) => (
            
           <div className="col-md-8 card me-3 mt-1 mb-3 p-0" key={cr.id}>

               
                

                   <div className="p-2" >
                   
                    
                   <h2 scope="row"> {cr.studentNumber} </h2> 
                  
                  
                       <a style={{textDecoration: 'none'}}>{cr.email}</a>
                       

                     

                       <p>  {cr.name}</p>
                      
                      
                       

                         {/* <button className="btn btn-danger" onClick={()=>{handleDelete(cr._id)}}>Delete Download</button> */}

                
                       
                       </div>
                   </div>     
         ))}





       


           


        
         



    </div>
  )
}

export default Allstd