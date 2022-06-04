import React from 'react'
import {useEffect, useState} from 'react'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';


function ChatsToSupervisor({match}) {
    const auth = useSelector(state => state.auth)
  

    const {user, isAdmin, isSTD} = auth

    console.log(match.params.id)

    const studentid = match.params.studentid
    const userid = match.params.id

    const [crs, setCrs] = useState();
    const [users, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch(`http://localhost:8000/chat/super/${match.params.id}`);
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])


    

    




  return (
    <div>
        <h1>Requests to me</h1>
      

{crs?.map((cr , index) => (
            
            <div  key={cr.id}>
 
                
                 {cr.studentid === studentid ?
                    <div className="col-md-8 card me-3 mt-1 mb-3 p-0">
                         <div className="p-2" >


<h2 scope="row"> Message : {cr.message} </h2> 


                 <h5  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Message From: {cr.studentname} </h5> 
                    <p>Student ID : {cr.studentid}</p>
                   <p>  {cr.createdAt.substring(0,10)} : { cr.createdAt.substring(11,16)}</p>



</div>

                        </div>:
                    ''
                }
               
         
 
                   
                    </div>     
          ))}
    </div>
  )
}

export default ChatsToSupervisor