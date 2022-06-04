import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import '../assignment/assignment.css'

const RequestCoSupervisor = ({match}) => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth






const [superid, setSuperid] = useState(match.params.superid)
const [studentid, setStudentid] = useState(user._id)
const [supername, setSupername] = useState(match.params.supername)
const [studentname, setStudentname] = useState(user.name)

const [groupid, setGroupid] = useState('')
const [topic, setTopic] = useState('')
const [description, setDescription] = useState('')





function handleSubmit (e){
    e.preventDefault();


    const superReq ={
    
        studentid,
        superid,
        supername,
        studentname,
        groupid,
        topic,
        description,
    
    }
        console.log(superReq);
                
        axios.post("http://localhost:8000/cosupervisorselection/",superReq).then(()=>{
            alert("Requested Co-Supervisor Successfully")
            
        
        }).catch((err)=>{
            alert(err);
        })
    
    
    
}
    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>Request Co-Supervisors</h1>

   

    
    <div className="mb-3">
        <label htmlFor="name">Group ID</label>
        <input type="text" 
         
        placeholder="groupid"
        name = "groupid"
        value={groupid}
        onChange={(e)=>setGroupid(e.target.value)}/> 
     </div>

     
     


    
     
     
     <div className="mb-3">
     <label htmlFor="name">Topic</label>
        <input type="text" 
        className="form-control" 
        placeholder="topic"
        name = "topic" 
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}/>
     </div>

     <div className="mb-3">
     <label htmlFor="name">Description</label>
        <input type="text" 
        className="form-control" 
        placeholder="description"
        name = "description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
     </div>

     <div className="row">
        <button onClick={handleSubmit}> Request Now</button>
     </div>


</div>

);

};

export default RequestCoSupervisor;