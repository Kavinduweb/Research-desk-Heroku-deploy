import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import '../assignment/assignment.css'

const TopicRegistration = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth

  console.log(user._id)

    const [crs, setData] = useState({
        groupid: '',
        userid: user._id,
        topic: '',
        image: ''
    })

    const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
        setData({...crs, [name]: value})
    };

    const handleSubmit = async () => {
        try{
            let formData = new FormData();
            formData.append('image', crs.image);
            
            formData.append('userid', user._id);
            formData.append('groupid', crs.groupid);
            formData.append('topic', crs.topic);
            
const res = await fetch('http://localhost:8000/topics',  {
    method: 'POST',
    body: formData ,

        });

        

        if(res.ok){
            setData({groupid: '', topic: '', image: ''})
            
            alert('Successfully added')
            console.log(res)
           
        }




        }catch(e){
            console.log(e)
        }

    }

    

    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>Topic Registration</h1>



    
    <div className="mb-3">
        <label htmlFor="name">Group ID</label>
        <input type="text" 
         
        placeholder="groupid"
        name = "groupid"
        value={crs.groupid}
        onChange={handleChange('groupid')} />
     </div>

     
     <div className="mb-3">
     <label htmlFor="name">Topic</label>
        <input type="text" 
        className="form-control" 
        placeholder="topic"
        name = "topic"
        value={crs.topic}
        onChange={handleChange('topic')} />
     </div>


 
     <div className="mb-3">
     <label htmlFor="name">Document Attachments</label>
        <input type="file" 

        className="form-control" 
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        name = "image"
        onChange={handleChange('image')} />
     </div>

     
    


       
     


     

     <div className="row">
        <button onClick={handleSubmit}>Submit Topic</button>
     </div>


</div>

);

};

export default TopicRegistration;