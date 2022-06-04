import React from 'react'
import {useEffect, useState} from 'react'

import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'


function GetMyGroups({match}) {

    console.log(match.params.id)

    const userid = match.params.id

    const [crs, setCrs] = useState();
    const [users, setUsers] = useState();
    
    useEffect(() => {
       const fetchUsersCr = async () => {
     const res = await fetch(`http://localhost:8000/groups/get/${userid}`);
       const data = await res.json();
       console.log(data);
       setCrs(data);
       };
       fetchUsersCr();  
    
    
    
    },[])




    const handleDelete = async(id) => {
        try{
          const res = await fetch(`http://localhost:8000/groups/${id}`, {
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
        <h1>My groups</h1>
      

{crs?.map((cr , index) => (
            
            <div>
            <form className='login_page'>
                <h6>Group ID</h6>
                <input
                    value={cr.groupid}
                    type="text"
                    name="groupname"
                    disabled
                    required />
                <h6>Student ID of Member 1</h6>

                <input
                    type="text"
                    value={cr.student_id1}
                    name="student_id1"
                    required />

                <h6>Student ID of Member 2</h6>
                <input
                    className=''
                    type="text"
                    value={cr.student_id2}
                    name="student_id2"
                    required />

                <h6>Student ID of Member 3</h6>
                <input
                    type="text"
                    value={cr.student_id3}
                    name="student_id3"
                    required />

                <h6>Student ID of Member 4</h6>
                <input
                    type="text"
                    value={cr.student_id4}
                    name="student_id4"
                    required />

                <h6>Group Name</h6>
                <input
                    value={cr.groupname}
                    type="text"
                    name="groupname"
                    required />



                <br />
                <Link to={`/groups/${cr._id}`}    > 
                <button className='btn m-3 fa fa-edit' style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}}>
                   Update 
                    </button> 
                </Link>
                <button onClick={()=>{handleDelete(cr._id)}} style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', padding: '10px ' , borderRadius: '5px'}} className='btn btn-danger fa fa-trash'  >  Delete</button>
            </form >  
        </div> 
          
            


          ))}
    </div>
  )
}

export default GetMyGroups