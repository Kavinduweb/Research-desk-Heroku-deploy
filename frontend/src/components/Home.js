import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import SimpleImageSlider from "react-simple-image-slider";

function Home() {

  

    const auth = useSelector(state => state.auth)
    const {user , isLogged, isAdmin, isSuper,isCoSuper,isPanel} = auth

    
    const images = [
      { url: "https://www.sliit.lk/wp-content/uploads/2018/04/Home-Slider-1.jpg" },
      { url: "https://static.sliit.lk/wp-content/uploads/2017/11/Sliit-Research-Facilities.jpg" },
      { url: "https://www.sliit.lk/wp-content/uploads/2017/11/Slider-Background.jpg" },
      
    ];

  return (
    <div>
      <p className="mt-3 mb-4">Staff Dashboard</p>
     

<div className="mt-3" style={{borderRadius:"100x"}}>
      <SimpleImageSlider
      
        width={1190}
        flex={1}
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
        slideDuration={0.8}
        autoPlay={true}
      />
    </div>


<br></br>
<br/>
<div>{isAdmin ? <div className="alert alert-info alert-dismissible fade show">Admin</div> : 

<div className="alert alert-danger alert-dismissible fade show"> Staff Member</div>}</div>



<div>{isAdmin ? <div > 
  <h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>User Management</h1>


<Link style={{textDecoration:"none"}} to={`/allusers`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
All Staff Members
 
     
   </button> </Link>

   <Link style={{textDecoration:"none"}} to={`/stdall`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
All Student 
 
     
   </button> </Link>

  <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Assignment Options</h1>
  
  <div> <Link style={{textDecoration:"none"}} to={`/createassi/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
Create Assignments

    
  </button> </Link>

   <Link style={{textDecoration:"none"}} to={`/getallassi/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Assignments
   
       
     </button> </Link>


     <Link style={{textDecoration:"none"}} to={`/usercreated/${user._id}`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  My Assignments
   
       
     </button> </Link>


   <Link style={{textDecoration:"none"}} to={`/getuploads/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Submissions
   
       
     </button> </Link>
     
     
     
      </div>

      <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Marking Schemes</h1>

     <div className="mt-3"> <Link style={{textDecoration:"none"}} to={`/createmarking/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
Submit Marking Scheme

    
  </button> </Link>

   <Link style={{textDecoration:"none"}} to={`/getmarkings/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Markings
   
     </button> </Link> </div>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>User Downloads | Module Slides | Downloadables</h1>

     <div className="mt-3"> <Link style={{textDecoration:"none"}} to={`/createdownloads/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
Submit Downloadables

    
  </button> </Link>

   <Link style={{textDecoration:"none"}} to={`/getdownloads/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Downloads
   
     </button> </Link> </div>





     <div> 

    
  


     
     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Supervisor Selections</h1>
     <Link style={{textDecoration:"none"}} to={`/getallrequests`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Requested Supervisors
   
       
     </button> </Link>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Co-Supervisor Selections</h1>
     <Link style={{textDecoration:"none"}} to={`/cogetallrequests`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Requested Co-Supervisors
   
       
     </button> </Link>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Groups Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getallgroups`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Groups
   
       
     </button> </Link>


     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Topics Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getalltopics`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Topic Registrations
   
       
     </button> </Link>



     

     
     
     
     
      </div>
     



</div>
  : ''}</div>


  {
    isSuper
      ? 
      <div>
       
        <h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Supervisor Student Requests</h1>


  <Link style={{textDecoration:"none"}} to={`/requesttome/${user._id}`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 Student Requests 
   
       
     </button> </Link>


     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Marking Schemes</h1>
     <Link style={{textDecoration:"none"}} to={`/getmarkings/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Markings
   
     </button> </Link> 

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Submisstions</h1>

     <Link style={{textDecoration:"none"}} to={`/getuploads/`}> <button className="btns" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Submissions
   
       
     </button> </Link>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Groups Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getallgroups`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Groups
   
       
     </button> </Link>


     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Topics Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getalltopics`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Topic Registrations
   
       
     </button> </Link>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Assignments</h1>

     <Link style={{textDecoration:"none"}} to={`/getallassi/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Assignments
   
       
     </button> </Link>



      </div>
       : '' 
}
{
    isCoSuper
      ? 
      <div>
         <h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Co-Supervisor Student Requests</h1>


<Link style={{textDecoration:"none"}} to={`/corequesttome/${user._id}`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
Student Requests 
 
     
   </button> </Link>
         <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Marking Schemes</h1>
     <Link  style={{textDecoration:"none"}}to={`/getmarkings/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Markings
   
     </button> </Link> 

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Groups Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getallgroups`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Groups
   
       
     </button> </Link>


     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Topics Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getalltopics`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Topic Registrations
   
       
     </button> </Link>

     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Assignments</h1>

     <Link style={{textDecoration:"none"}} to={`/getallassi/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Assignments
   
       
     </button> </Link>
      
      </div>
       : '' 
}

{
    isPanel
      ? 
      <div>
                 <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Evaluation Panel</h1>

        <p title="PanelMmeber"> You have been selected as an evaluation panel mamber. Please Click below button to set the groups assigned to you</p>

        <Link style={{textDecoration:"none"}} to={`/AssignedtoMe/${user._id}`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}} >
 Groups Assigned to me
</button> </Link>
 <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Marking Schemes</h1>
     <Link  style={{textDecoration:"none"}}to={`/getmarkings/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Markings
   
     </button> </Link> 

     
   
       
     
     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Groups Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getallgroups`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Groups
   
       
     </button> </Link>


     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Student Topics Management</h1>
     <Link style={{textDecoration:"none"}} to={`/getalltopics`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
 All Student Topic Registrations
   
       
     </button> </Link>
     <h1 className="text-center p-1 pb-2 mt-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Assignments</h1>

     <Link style={{textDecoration:"none"}} to={`/getallassi/`}> <button className="btn" style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Created Assignments
   
       
     </button> </Link>


     <Link style={{textDecoration:"none"}} to={`/getuploads/`}> <button className="btn"  style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
  All Submissions
   
       
     </button> </Link>
      </div>
       : '' 
}




    </div>
  )
}

export default Home