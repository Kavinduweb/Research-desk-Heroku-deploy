import axios from 'axios';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import "./Group.css";

const CreateGroup = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth)
    
  
    const {user} = auth

    const [inputs, setInputs] = useState({
        student_id1: '',
        student_id2: '',
        student_id3: '',
        student_id4: '',
        groupname: '',
    });


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };


    const sendRequest = async() => {
        await axios.post("http://localhost:8000/groups", {
            userid:String(user._id),
            student_id1: String(inputs.student_id1),
            student_id2: String(inputs.student_id2),
            student_id3: String(inputs.student_id3),
            student_id4: String(inputs.student_id4),
            groupname: String(inputs.groupname),
        }).then(res => res.data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => {
            alert("Your Group has been Created Successfully!")
            history.push("/getallgroups")
        })
    };

    return (
        <div>
            <form className='login_page' onSubmit = {handleSubmit}>
                <h2>Group Registration Form</h2>
                <h6>Student ID of Member 1</h6>
                
                <input 
                    type = "text"
                    value = {inputs.student_id1} 
                    onChange = {handleChange} 
                    name = "student_id1"
                    required />
                
                <h6>Student ID of Member 2</h6>
                <input 
                    className=''
                    type = "text"
                    value = {inputs.student_id2} 
                    onChange = {handleChange} 
                    name = "student_id2"
                    required />
                
                <h6>Student ID of Member 3</h6>
                <input 
                    type = "text"
                    value = {inputs.student_id3} 
                    onChange = {handleChange} 
                    name = "student_id3"
                    required />
                
                <h6>Student ID of Member 4</h6>
                <input 
                    type = "text"
                    value = {inputs.student_id4} 
                    onChange = {handleChange} 
                    name = "student_id4"
                    required />
                
                <h6>Group Name</h6>
                <input 
                    value = {inputs.groupname} 
                    onChange = {handleChange} 
                    type = "text" 
                    name = "groupname"
                    required />

                <br/>
                <button className=" btn btn-warning m-2" type = "submit">Create Group</button>
            </form>
        </div>
    )
}

export default CreateGroup;