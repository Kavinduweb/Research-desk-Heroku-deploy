import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {useEffect, useState} from 'react'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button , Card} from 'react-bootstrap'




const StudentView = () => {
const [crs, setCrs] = useState();
const [users, setUsers] = useState();

const auth = useSelector(state => state.auth)


const {user} = auth

useEffect(() => {
   const fetchUsersCr = async () => {
 const res = await fetch('http://localhost:8000/ass');
   const data = await res.json();
   console.log(data);
   setCrs(data);
   };
   fetchUsersCr();  



},[])











  return (
    <div >
      
<h1>Assignments </h1>


{crs?.map((cr , index) => (

<Card className="mb-2" key={cr.id}>
<Card.Header as="h4"> {cr.name}</Card.Header>
  <Card.Body>
    <Card.Title>{cr.rules}</Card.Title>
    <br/>
    {cr.aid}
    <Card.Text>
    <CloudinaryContext cloudName="demo">
                     
                     <a  style={{ textDecoration: 'none' }}href={cr.file}  download>
                    
                     <i class="fas fa-file-pdf"></i> &nbsp; 
                     <a style={{textDecoration: 'none'}}>{cr.name}</a>
                     <br />
                   
                    
                     </a>
                     </CloudinaryContext>
    </Card.Text>
    

    <Link   to={`/createuploads/${user._id}/${cr.aid}/${cr.userid}/${user.studentNumber}`}>
                            <button className="btn btn-success">                          
                           Add Submission
                            </button>
                            </Link>
  </Card.Body>


  <blockquote className="blockquote mb-0">
     
      <footer className="blockquote-footer">
        <cite title="Source Title">Created By {cr.author}</cite>
       
      </footer>
    </blockquote>
  <Card.Footer className="text-muted">
       <a style={{textDecoration: 'none', color:'crimson'}}>

           
            
       
           
           Deadline : {cr.deadline} | 11.59 PM</a>
       </Card.Footer>
</Card>

))}






       


           


        
         



    </div>
  )
}

export default StudentView