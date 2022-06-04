import React, { useEffect, useState } from 'react';
import axios from "axios";
import Group from "./Group";
import "./Group.css";
const URL = "http://localhost:5000/groups";

const fetchHandler = async() => {
   return await axios.get(URL).then((res) => res.data)
};

const Groups = () => {
    const [groups, setGroups] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setGroups(data.groups));
    }, []);
    console.log(groups);
    return (
        <div>
            <ul>
                {groups && groups.map((group, i) => (
                    <div className = "group" key = {i}>
                        <Group group = {group}/>
                    </div>
                ))}
            </ul>
        </div>
    )
};

export default Groups;