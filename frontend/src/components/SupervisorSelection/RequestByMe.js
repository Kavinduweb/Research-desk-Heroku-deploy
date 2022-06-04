import React from 'react'
import {useEffect, useState} from 'react'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';


function RequestByMe({match}) {

  const auth = useSelector(state => state.auth)
  

  const {user, isAdmin, isSTD} = auth
    console.log(match.params.id)

    const userid = match.params.id

    const [crs, setCrs] = useState();
    const [users, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch(`http://localhost:8000/supervisorselection/user/${userid}`);
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])


    

    




  return (
    <div>
        <h1>Requests  By me</h1>
      

{crs?.map((cr , index) => (
            
            <div className="col-md-8 card me-3 mt-1 mb-3 p-0" key={cr.id}>
 
                
                 
 
                    <div className="p-2" >
                    
                     
                    <h2 scope="row"> Topic : {cr.topic} </h2> 
                    
                   
                                         <h5  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Group ID : {cr.groupid}</h5> 

                    <p  className="col-md-9 card me-3 mt-2 p-1">
                       Description : {cr.description}
                        <br />
                      Student ID : {cr.studentid}

                      <br />
                      Superviosr Name : {cr.supername}
                      <br />
                      student name : {cr.studentname}

                      

                      <br />
                      Status : {cr.approval}
                    </p>

                    <Link  className="mr-2"  to={`/createchatstudent/${cr.superid}/${cr.supername}`}>
                            <button className="btn btn-warning">                          
                           Chat with supervisor
                            </button>
                            </Link>

                            <Link   to={`/chatsstudents/${cr.superid}`}>
                            <button className="btn btn-secondary">                          
                           Messages from supervisor
                            </button>
                            </Link>

                          
                      


 
                    
  
        
                        
                        </div>
                    </div>     
          ))}
    </div>
  )
}

export default RequestByMe