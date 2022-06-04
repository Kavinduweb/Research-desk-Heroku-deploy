import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import '../../assignment/assignment.css'

const CreateGroupAssign = ({match}) => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth

//     const [crs, setData] = useState({
//         name: '',
//         userid: '',
//         groupid: '',
       
//     })

//     const handleChange = (name) => (e) => {
//     const value = e.target.value;
//         setData({...crs, [name]: value})
//     };

//     const handleSubmit = async () => {
//         try{
//             let formData = new FormData();
           

//             formData.append('name', crs.name);
//             formData.append('aid', crs.groupid);
//             formData.append('userid', crs.userid);
            
// const res = await fetch('http://localhost:8000/assignedgroups',  {
//     method: 'POST',
//     body: formData ,

//         });
    

        

//         if(res.ok){
//             setData({name: '', groupid:'', userid: ''})
            
//             alert('Successfully added')
           
//         }




//         }catch(e){
//             console.log(e)
//         }

//     }



const [name, setName] = useState('')
const [userid, setUserid] = useState(match.params.id)
const [panelname, setPanelname] = useState(match.params.name)

const [groupid, setGroupid] = useState('')




function handleSubmit (e){
    e.preventDefault();


    const NewReg ={
    
        name,
        userid,
        panelname,
        groupid
    
    }
        console.log(NewReg);
                
        axios.post("http://localhost:8000/assignedgroups/",NewReg).then(()=>{
            alert("Assigned Group Successfully")
            
        
        }).catch((err)=>{
            alert(err);
        })
    
    
    
}
    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>Assign Groups to users</h1>

   

    
    <div className="mb-3">
        <label htmlFor="name">User Name</label>
        <input type="text" 
         
        placeholder="name"
        name = "name"
        value={name}
        onChange={(e)=>setName(e.target.value)}/> 
     </div>

     
     


{/*     
     <div className="mb-3">
     <label htmlFor="name">Userid</label>
        <input type="text" 
        className="form-control" 
        placeholder="userid"
        name = "userid"
        value={userid}
        onChange={(e)=>setUserid(e.target.value)}/>
     </div> */}
     
     <div className="mb-3">
     <label htmlFor="name">GroupID</label>
        <input type="text" 
        className="form-control" 
        placeholder="groupid"
        name = "groupid" 
        value={groupid}
        onChange={(e)=>setGroupid(e.target.value)}/>
     </div>

     

     <div className="row">
        <button onClick={handleSubmit}> Assign Group</button>
     </div>


</div>

);

};

export default CreateGroupAssign;