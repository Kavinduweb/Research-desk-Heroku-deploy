import React from 'react'
import { Link } from 'react-router-dom'

import {useEffect, useState} from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'




const GetAllAssignedGrups = () => {
const [crs, setCrs] = useState();
const [users, setUsers] = useState();

useEffect(() => {
   const fetchUsersCr = async () => {
 const res = await fetch('http://localhost:8000/assignedgroups/');
   const data = await res.json();
   console.log(data);
   setCrs(data);
   };
   fetchUsersCr();  



},[])



const handleDelete = async(id) => {
  try{
    const res = await fetch(`http://localhost:8000/assignedgroups/${id}`, {
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
    <div >
      
<h1>All Assigned Groups </h1>
      
         {crs?.map((cr , index) => (
            
           <div className="col-md-8 card me-3 mt-1 mb-3 p-0" key={cr.id}>

               
                

                   <div className="p-2" >
                   
                    
                   <h2 scope="row"> {cr.name} </h2> 
                  
                        <a  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Group ID : {cr.groupid}</a> 
                        <a  className="col-md-9 card me-3 mt-2 p-1" style={{textDecoration: 'none', color:'crimson'}}>Assigned to : {cr.panelname} (ID : {cr.userid})</a> 
                      
{/*                       
                       <Button variant="success">
                        <a href={`/editassi/${cr._id}`}  style={{textDecoration: 'none', color:'white'}} > Edit  </a>
                         </Button>{' '} */}

                         <button className="btn btn-danger" onClick={()=>{handleDelete(cr._id)}}>Delete Assignment</button>

                
                       
                       </div>
                   </div>     
         ))}





       


           


        
         



    </div>
  )
}

export default GetAllAssignedGrups