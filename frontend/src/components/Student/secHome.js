import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import {Button , Card} from 'react-bootstrap'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function StudentHome() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user} = auth

  const [crs, setCrs] = useState();
  const [downs, setDowns] = useState();
const [userss, setUserss] = useState();


useEffect(() => {
  const fetchUsersCr = async () => {
const res = await fetch('http://localhost:8000/ass');
  const data = await res.json();
  console.log(data);
  setCrs(data);
  };
  fetchUsersCr();  



},[])


useEffect(() => {
  const fetchDowns = async () => {
const res = await fetch('http://localhost:8000/down');
  const data = await res.json();
  console.log(data);
  setDowns(data);
  };
  fetchDowns();  



},[])

  

    const logout=()=>{
     const logout=localStorage.removeItem('firstLogin1')
     window.location.href = "/stdlogin";

    }
  



  return (
    <div className = "activite_page">
      <p>Student Dashboard</p>

      <h1 className="text-center p-1 "  style={{color: 'white', backgroundColor:'#E2A500' }}>SLIIT RESEARCHDESK</h1>

      <img className="mb-3" src={'https://www.goodwall.io/blog/wp-content/uploads/2021/10/best-laptops-for-college-students.jpg'} alt="profile" style={{flex:"1" , width:"100%", height:"500px"}}/>


<div className="card p-2 mb-3">


<h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Lecture Slides</h1>

      
         {downs?.map((down , index) => (
            
           <div  key={down.id}>
                   
                       <Card className="mb-2" key={down.id}>
<Card.Header as="h4"> {down.name}</Card.Header>
  <Card.Body>
   
    <Card.Text>
    <CloudinaryContext cloudName="demo">
                     
                     <a  style={{ textDecoration: 'none' }}href={down.file}  download>
                    
                     <i class="fas fa-file-pdf"></i> &nbsp; 
                     <a style={{textDecoration: 'none'}}>{down.name}</a>
                     <br />
                   
                    
                     </a>
                     </CloudinaryContext>

                     
    </Card.Text>
    <a style={{textDecoration: 'none'}}>{down.description}</a>
                       <p>Created By : {down.author}</p>

  </Card.Body>
 
</Card>
                   </div>     
         ))}
         










</div>






<div>

  <div className="card p-2 mb-3">

<h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Submit Assignments</h1>



<div className= "row">
  <div className="col-md-1 mr-4">
   <Link to={`/studentview/`}> <button style={{textDecoration:"none", width: '150px' ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>Assignments</button></Link>
   </div>

&nbsp;
&nbsp;
&nbsp;
<div className="col ml-2">
<Link to={`/useruploadedAssi/${user._id}`}> <button style={{textDecoration:"none", width: '250px' ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>My Assignments

  
</button> </Link>
</div>
</div>

</div>








<div  className="card p-2">
<h1 className="text-center p-1 pb-2 "  style={{color: 'white', backgroundColor:'#C23A34' }}>Assignments Timeline</h1>


{crs?.map((cr , index) => (

<Card className="mb-2" key={cr.id}>
<Card.Header as="h4"> {cr.name}</Card.Header>
  <Card.Body>
   
    <Card.Text>

   
Assignmet ID : {cr.aid}
<br />
    <div className="card p-1"> 
    <a style={{textDecoration: 'none', color:'crimson'}}>

           
            
       
        
Deadline : {cr.deadline} | 11.59 PM</a>
</div>  

                     
    </Card.Text>
    

  </Card.Body>
 
</Card>

))}

</div>








 </div>
    </div>
  )
}

export default StudentHome