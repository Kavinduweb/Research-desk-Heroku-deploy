import React, { useEffect, useState } from 'react';
import axios from "axios";
import Group from "./Group";
import "./Group.css";
const URL = "http://localhost:8000/groups";

const fetchHandler = async() => {
   return await axios.get(URL).then((res) => res.data)
};

const GetAllGroups = () => {
    const [groups, setGroups] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setGroups(data.groups));
    }, []);
    console.log(groups);
    return (
        <div>
          <h1>  All Student Groups</h1>
            <ul>
                {groups && groups.map((group, i) => (
                    <div className = "group" key = {i}>
                        <Group className="p-3" group = {group}/>
                    </div>
                ))}
            </ul>
        </div>
    )
};

export default GetAllGroups;