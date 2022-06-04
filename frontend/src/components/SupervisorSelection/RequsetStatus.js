import React from 'react'

import {useEffect, useState} from 'react'
import {useHistory,useParams} from 'react-router-dom';
import axios from "axios";

 function RequestStatus({match}) {


    const [prds, setprds] = useState({
        approval: '',
        
    })

   

    
    const { approval} = prds;
    
    useEffect(() => {
       fetch(`http://localhost:8000/supervisorselection/${match.params.id}`)
       .then((res) => res.json())
       .then((prds) => setprds(prds))
    
    
    
    },[]);

    const onInputChange = e=>{
        setprds({...prds,[e.target.name]: e.target.value});
    };
    
    const handleSubmit= async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/supervisorselection/${match.params.id}`,prds);
    
        alert("Status Updated");
        window.location.href = ('/staffhome')
    }


  return (
    <div>
                 <div>

        <h1>Approval or Rejection</h1>
        <form onSubmit={handleSubmit} >
        <div style={{maxWidth:"500", margin:"auto" , textAlign:"left"}}>


    <div className="mb-3">
    <label htmlFor="name"> Status</label>
        <input type="text" 
        className="form-control" 
        placeholder="Approval or Rejection"
        name = "approval"
        value={prds.approval}
        onChange={onInputChange}
       />
     </div>
{/* 
     <input type="radio" id="approved" name="role" value="approved"/>
            <label  for="approved">Appr</label>
             <input type="radio" id="rejected" name="role" value="rejected"/>
             <label  for="rejected">rejected</label> */}
           

     {/* <select>
  <option  name="approval" selected  onChange={onInputChange}
  value={prds.approval} > Approved</option>
  <option name="approval"  onChange={onInputChange}
  value={prds.approval}>Rejected</option>
 
  
</select> */}

     

     <div>
        <button className="btn btn-success" >Submit Request</button>
     </div>


</div>
</form>
    </div>

    </div>
  )
}

export default RequestStatus