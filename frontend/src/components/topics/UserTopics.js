import React from 'react'
import {useEffect, useState} from 'react'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'


function UserTopics({match}) {

    console.log(match.params.id)

    const userid = match.params.id

    const [crs, setCrs] = useState();
    const [users, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch(`http://localhost:8000/topics/user/${userid}`);
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])



 
    

    




  return (
    <div>
        <h1> My Topics </h1>

       



       

       {crs?.map((cr , index) => (
            
            <div className="col-md-8 card me-3 mt-1 mb-3 p-0" key={cr.id}>
 
                
                 
 
                    <div className="p-2" >
                    
                     
                    <h2 scope="row"> {cr.topic} </h2> 
                    
                   
                    <CloudinaryContext cloudName="demo">
                      
                        <a  style={{ textDecoration: 'none' }}href={cr.file}  download>
                       
                        <i class="fas fa-file-pdf"></i> &nbsp; 
                        <a style={{textDecoration: 'none'}}>{cr.topic}</a>
                        <br />
                      
                       
                        </a>
                        </CloudinaryContext>
 
                        <a style={{textDecoration: 'none', color:'crimson'}}>Group ID {cr.groupid}</a>
 

                        <a  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Status: {cr.status}</a> 

                        
               
                
                        
                        </div>
                    </div>     
          ))}
          



    </div>
  )
}

export default UserTopics