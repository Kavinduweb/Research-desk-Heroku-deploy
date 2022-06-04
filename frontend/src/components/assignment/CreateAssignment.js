import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './assignment.css'

const CreateAssignment = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth

  console.log(user._id)

    const [crs, setData] = useState({
        name: '',
        userid: user._id,
        aid: '',
        description: '',
        rules: '',
        author: '',
        deadline: '',
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
            formData.append('name', crs.name);
            formData.append('aid', crs.aid);
            formData.append('description', crs.description);
            formData.append('rules', crs.rules);
            formData.append('author', user.name);
            formData.append('deadline', crs.deadline);
const res = await fetch('http://localhost:8000/ass',  {
    method: 'POST',
    body: formData ,

        });

        

        if(res.ok){
            setData({name: '', aid:'', description: '', rules: '', author: '', deadline:'', image: ''})
            
            alert('Successfully added')
           
        }




        }catch(e){
            console.log(e)
        }

    }

     const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>Create Assignment (admin)</h1>

    {user.name}

    
    <div className="mb-3">
        <label htmlFor="name">Assignment Name</label>
        <input type="text" 
         
        placeholder="name"
        name = "name"
        value={crs.name}
        onChange={handleChange('name')} />
     </div>

     
     <div className="mb-3">
     <label htmlFor="name">Assignment ID</label>
        <input type="text" 
        className="form-control" 
        placeholder="Assignment ID"
        name = "aid"
        value={crs.aid}
        onChange={handleChange('aid')} />
     </div>


    
     <div className="mb-3">
     <label htmlFor="name">Description</label>
        <input type="text" 
        className="form-control" 
        placeholder="description"
        name = "description"
        value={crs.description}
        onChange={handleChange('description')} />
     </div>
     
     <div className="mb-3">
     <label htmlFor="name">Rules</label>
        <input type="text" 
        className="form-control" 
        placeholder="rules"
        name = "rules" 
        value={crs.rules}
        onChange={handleChange('rules')}/>
     </div>

     {/* <div className="mb-3">
     <label htmlFor="name">Author</label>
        <input type="text" 
        className="form-control" 
        placeholder="Author"
        name = "author" 
        value={crs.author}
        onChange={handleChange('author')}/>
     </div> */}




     <div  className="mb-3">
     <label htmlFor="name">Assignment Deadline</label>
                 <input type="date"
                                                                    required
                                                                    className="datepicker form-control"
                                                                    name="departureDate"
                                                                    placeholder="YY/MM/DD"
                                                                    min={disablePastDate()}
                                                                    value={crs.deadline}
                                                                    onChange={handleChange('deadline')}/>
                                                            </div>
 
     <div className="mb-3">
     <label htmlFor="name">Assignment Attachments</label>
        <input type="file" 

        className="form-control" 
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        name = "image"
        onChange={handleChange('image')} />
     </div>

     
    


       
     


     

     <div className="row">
        <button onClick={handleSubmit}> Create Assignment</button>
     </div>


</div>

);

};

export default CreateAssignment;