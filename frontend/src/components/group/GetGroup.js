import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const GetGroup = () => {
    const [inputs, setInputs] = useState({});

    const id = useParams().id;

    const history = useHistory();

    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`http://localhost:8000/groups/${id}`)
                .then(res => res.data).then(data => setInputs(data.group));
        };
        fetchHandler();
    }, [id]);


    const sendRequest = async () => {
        await axios.put(`http://localhost:8000/groups/${id}`, {
            student_id1: String(inputs.student_id1),
            student_id12: String(inputs.student_id2),
            student_id3: String(inputs.student_id3),
            student_id14: String(inputs.student_id4),
            groupname: String(inputs.groupname)
        }).then(res => res.data);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => {
            alert("Your Group has been Updated Successfully!")
           window.location.href = "/Student-Home"
        });
    }


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div>
            {inputs && (<form className='login_page' onSubmit={handleSubmit}>
                <h2>Group Details Update</h2>
                <h6>Student ID of Member 1</h6>
                <input
                    type="text"
                    value={inputs.student_id1}
                    onChange={handleChange}
                    name="student_id1" />

                <h6>Student ID of Member 2</h6>
                <input
                    type="text"
                    value={inputs.student_id2}
                    onChange={handleChange}
                    name="student_id2" />

                <h6>Student ID of Member 3</h6>
                <input
                    type="text"
                    value={inputs.student_id3}
                    onChange={handleChange}
                    name="student_id3" />

                <h6>Student ID of Member 4</h6>
                <input
                    type="text"
                    value={inputs.student_id4}
                    onChange={handleChange}
                    name="student_id4" />

                <h6>Group Name</h6>
                <input
                    type="text"
                    value={inputs.groupname}
                    onChange={handleChange}
                    name="groupname" />

                <br/>
                <button className='btn m-2 fa fa-edit' style={{textDecoration:"none" ,textTransform:"uppercase", letterSpacing: "1.5px",color: 'white', backgroundColor:'#E2A500' , padding: '10px ' , borderRadius: '5px'}} type="submit"> Update</button>
            </form>)}
        </div>
    )
};

export default GetGroup;