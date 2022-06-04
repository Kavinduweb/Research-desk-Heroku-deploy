import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

const EditAssignment = ({match}) => {
   console.log(match);
   const history = useHistory();
   const auth = useSelector(state => state.auth)
  console.log(auth)

  const {user, isLogged} = auth

   const [data, setData] = useState({
       name: '',
       description: '',
       rules: '',
       author: '',
         deadline: '',
       image: ''
   })

   useEffect(() => {
      fetch(`http://localhost:8000/ass/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data))



   },[]);

   const handleChange = (name) => (e) => {
      const value = name === "image" ? e.target.files[0] : e.target.value;
          setData({...data, [name]: value})
      };

      const handleSubmit = async () => {
         try{
             let formData = new FormData();
             formData.append('image', data.image);
             formData.append('name', data.name);
             formData.append('description', data.description);
             formData.append('rules', data.rules);
             formData.append('deadline', data.deadline);
             formData.append('author', user.name);
 const res = await fetch(`http://localhost:8000/ass/${match.params.id}`,  {
     method: 'PUT',
     body: formData 
         });
 
         if(res.ok){
             setData({name: '', description: '', rules: '', author: '' , deadline:'' , image: ''})
             
             alert('Successfully added')
             window.location.href = ('/')
         }
 
 
 
 
         }catch(e){
             console.log(e)
         }
 
     }


    return (
    <div  className="assignment_page"style={{maxWidth:"500", margin:"auto"}}>
       <h1>Edit Assignments</h1>
    
    
        <div className="mb-3">
        <label htmlFor="name">Assignment Name</label>
            <input type="text" 
            className="form-control" 
            placeholder="name"
            name = "name" 
            value={data.name}
            onChange={handleChange('name')}/>
         </div>
         <div className="mb-3">
         <label htmlFor="name">Description</label>
            <input type="text" 
            className="form-control" 
            placeholder="description"
            name = "description"
            value={data.description}
            onChange={handleChange('description')} />
         </div>
         <div className="mb-3">
         <label htmlFor="name">Rules</label>
            <input type="text" 
            className="form-control" 
            placeholder="rules"
            name = "rules"
            value={data.rules}
            onChange={handleChange('rules')} />
         </div>

         <div className="mb-3">
         <label htmlFor="name">Deadline</label>
            <input type="text" 
            className="form-control" 
            placeholder="deadline"
            name = "deadline"
            value={data.deadline}
            onChange={handleChange('deadline')} />
         </div>

         {/* <div className="mb-3">
         <label htmlFor="name">Author</label>
            <input type="text" 
            className="form-control" 
            placeholder="author"
            name = "author"
            value={data.author}
            onChange={handleChange('author')} />
         </div> */}
         <div className="mb-3">
         <label htmlFor="name">File</label>
            <input type="file" 
            className="form-control" 
            accept="image/*"
            name = "image"
            onChange= {handleChange('image')} />
         </div>
    
         <div className="row">
            <button onClick={handleSubmit}>update</button>
         </div>
    
    
    </div>
    
    );
    
    };
    
    export default EditAssignment;