import React from 'react'
import {useEffect, useState} from 'react'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'


function UserCreatedAssignment({match}) {

    console.log(match.params.id)

    const userid = match.params.id

    const [crs, setCrs] = useState();
    const [users, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch(`http://localhost:8000/ass/user/${userid}`);
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])



    const handleDelete = async(id) => {
        try{
          const res = await fetch(`http://localhost:8000/ass/${id}`, {
          method : 'DELETE'
        })
        if(res.ok){
          const updatedUsers = crs.filter(cr => cr.id !== id);
          setCrs(updatedUsers);
          alert('Successfully deleted')
          window.location.reload();
        }
        }catch(err){
          console.log(err);
        }
       }
    

    




  return (
    <div>
        <h1>My Assignments </h1>

       



       

       {crs?.map((cr , index) => (
            
            <div className="col-md-8 card me-3 mt-1 mb-3 p-0" key={cr.id}>
 
                
                 
 
                    <div className="p-2" >
                    
                     
                    <h2 scope="row"> {cr.name} </h2> 
                    {cr.userid}
                   
                    <CloudinaryContext cloudName="demo">
                      
                        <a  style={{ textDecoration: 'none' }}href={cr.file}  download>
                       
                        <i class="fas fa-file-pdf"></i> &nbsp; 
                        <a style={{textDecoration: 'none'}}>{cr.name}</a>
                        <br />
                      
                       
                        </a>
                        </CloudinaryContext>
                         <a  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Assignment ID : {cr.aid}</a> 
 
                        <a style={{textDecoration: 'none', color:'crimson'}}>Deadline : {cr.deadline}</a>
 
                        <p>Created By : {cr.author}</p>
                       
                       
                         <Button variant="success">
                         <a href={`/editassi/${cr._id}`}  style={{textDecoration: 'none', color:'white'}} > Edit  </a>
                          </Button>{' '}
 
                          <button className="btn btn-danger" onClick={()=>{handleDelete(cr._id)}}>Delete Assignment</button>
 
                
                        
                        </div>
                    </div>     
          ))}
          



    </div>
  )
}

export default UserCreatedAssignment