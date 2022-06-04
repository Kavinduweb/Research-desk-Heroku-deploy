import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import '../assignment/assignment.css'

const CreateUploads = ({match}) => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)
    const {user , isLogged, isAdmin, isSuper,isCoSuper,isPanel} = auth


  console.log(match.params.id)
  console.log(match.params.aid)
    console.log(match.params.createdid)


    const [crs, setData] = useState({
        name: '',
        userid: '',
        createdid: '',
        aid: '',
        comments: '',
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

            formData.append('name', match.params.studentno);
            formData.append('createdid', match.params.createdid);
            formData.append('aid', match.params.aid);
            formData.append('userid', user._id);
            formData.append('comments', crs.comments);
const res = await fetch('http://localhost:8000/studentup',  {
    method: 'POST',
    body: formData ,

        });
    

        

        if(res.ok){
            setData({name: '', aid:'', userid: '', comments: '', image: ''})
            
            alert('Successfully added')
           
        }




        }catch(e){
            console.log(e)
        }

    }

    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>upload Assignment (student)</h1>

    {user.name}

    
    {/* <div className="mb-3">
        <label htmlFor="name">User Name</label>
        <input type="text" 
         
        placeholder="name"
        name = "name"
        value={match.params.studentno}
        onChange={handleChange('name')} />
     </div> */}

     
     {/* <div className="mb-3">
     <label htmlFor="name">Assignment ID</label>
        <input type="text" 
        className="form-control" 
        placeholder="Assignment ID"
        name = "aid"
        value={match.params.aid}
        onChange={handleChange('aid')} />
     </div> */}


    
     {/* <div className="mb-3">
     <label htmlFor="name">Userid</label>
        <input type="text" 
        className="form-control" 
        placeholder="userid"
        name = "userid"
        value={user._id}
        onChange={handleChange('userid')} />
     </div> */}
     
     <div className="mb-3">
     <label htmlFor="name">comments</label>
        <input type="text" 
        className="form-control" 
        placeholder="comments"
        name = "comments" 
        value={crs.comments}
        onChange={handleChange('comments')}/>
     </div>




 
     <div className="mb-3">
     <label htmlFor="name">Assignment submission</label>
        <input type="file" 

        className="form-control" 
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        name = "image"
        onChange={handleChange('image')} />
     </div>

     
    


       
     


     

     <div className="row">
        <button onClick={handleSubmit}> submit Assignment</button>
     </div>


</div>

);

};

export default CreateUploads;