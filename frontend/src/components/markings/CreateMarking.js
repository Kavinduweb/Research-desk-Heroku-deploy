import {useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import '../assignment/assignment.css'

const CreateMarking = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth

    const [crs, setData] = useState({
        name: '',
        description: '',
        author: '',
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

            formData.append('name', crs.name);
            formData.append('description', crs.description);
            formData.append('author', user.name);
const res = await fetch('http://localhost:8000/marking',  {
    method: 'POST',
    body: formData ,

        });

        

        if(res.ok){
            setData({name: '', description: '', author: '', image: ''})
            
            alert('Successfully added')
           
        }




        }catch(e){
            console.log(e)
        }

    }



    
return (
<div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>

    <h1>Create Markings (admin)</h1>

    {user.name}

    
    <div className="mb-3">
        <label htmlFor="name">Marking Name</label>
        <input type="text" 
         
        placeholder="name"
        name = "name"
        value={crs.name}
        onChange={handleChange('name')} />
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
     <label htmlFor="name">Assignment Attachments</label>
        <input type="file" 

        className="form-control" 
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        name = "image"
        onChange={handleChange('image')} />
     </div>

     
    


       
     


     

     <div className="row">
        <button onClick={handleSubmit}> Create Marking Schema</button>
     </div>


</div>

);

};

export default CreateMarking;