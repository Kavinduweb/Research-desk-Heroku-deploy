import React from 'react'
import { Link } from 'react-router-dom'

import {useEffect, useState} from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';




const GetAllTopics = () => {
  const auth = useSelector(state => state.auth)
const {isLogged, isAdmin, isSuper,isCoSuper, isPanel,isSTD} = auth

const [crs, setCrs] = useState();
const [users, setUsers] = useState();

useEffect(() => {
   const fetchUsersCr = async () => {
 const res = await fetch('http://localhost:8000/topics');
   const data = await res.json();
   console.log(data);
   setCrs(data);
   };
   fetchUsersCr();  



},[])



const handleDelete = async(id) => {
  try{
    const res = await fetch(`http://localhost:8000/topics/${id}`, {
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
      
<h1>All Topics  </h1>
      
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

                <a style={{textDecoration: 'none', color:'crimson'}}>Group ID : {cr.groupid}</a>


                <a  className="col-md-9 card me-3 mt-2 p-1 mb-2" style={{textDecoration: 'none', color:'crimson'}}>Status : {cr.status}</a> 



          {isAdmin || isPanel ?  
                <div>
         <button className="btn btn-warning mr-2" variant="success">
                        <a href={`/topicstatus/${cr._id}`}  style={{textDecoration: 'none', color:'white'}} > Approve or Reject Topic  </a>
                         </button>

                         <button className="btn btn-danger" onClick={()=>{handleDelete(cr._id)}}>Delete Topic Submission</button>
                         </div>
         : '' }
                
        
                
                </div>
            </div>     
                     
                
         ))}





       


           


        
         



    </div>
  )
}

export default GetAllTopics