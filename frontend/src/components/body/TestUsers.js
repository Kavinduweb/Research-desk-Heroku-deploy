import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/testAction';

export default function TestUsers() {

  const dispatch = useDispatch();
  const getuserssstate = useSelector((state) => state.getAllUsersReducer);

  const { users } = getuserssstate;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);


  return (
    <div className="container-fluid" style={{backgroundColor: '#FFFF'}}>
      <h2>Users List</h2>
       <table className="table table-striped">
        <thead className="thead table-dark">
          <tr>
          <th></th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th>email</th>
            <th>System Admins</th>
            <th>Hotel Admins</th>
           

           



          
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user,index) => {
              return (
                <tr>
                  <td>{index+1})</td>
                  <td style={{ textAlign: "center" }}>{user.name} {user.isAdmin===true? 
                 ( <h4 style={{ color:"green"}}> (System Admin)</h4> ):("")
                 
            }</td>
                  <td>{user.email}

                  </td>
                  <td>

                {user.name}

                  </td>
                 

          

                 
                 
                 
                 
                 
                  
                    
                 
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  )
}