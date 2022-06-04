import React from 'react'

import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'




export default function NavBar (){
    const auth = useSelector(state => state.auth)
    const {user} = auth

    const logout=()=>{
      const logout=localStorage.removeItem('firstLogin1')
      window.location.href = "/stdlogin";
 
     }

return(
  <div>
   

  

  <Navbar bg="dark" variant="dark">
<Container> 
  <Navbar.Brand href="/Student-Home">SLIIT Research Desk</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse className="justify-content-end">
<Nav className="justify-content-end" > 
     
      
        <div className="row">
        <div className="col">
      <NavDropdown  title='Research Topics' id="basic-nav-dropdown"> 
        <NavDropdown.Item href="/topicreg">Topics Registration</NavDropdown.Item>
        <NavDropdown.Divider  style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
           
        }}/>
        <NavDropdown.Item href= {`/usertopics/${user._id}`} >My Topics </NavDropdown.Item>
        </NavDropdown>
        </div>
        <div className="col">
      <NavDropdown  title='Student Groups' id="basic-nav-dropdown"> 
        <NavDropdown.Item href="/creategroup">Student Groups Registration</NavDropdown.Item>
        <NavDropdown.Divider style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
           
        }}/> 
        <NavDropdown.Item href= {`/mygroups/${user._id}`} >My Group </NavDropdown.Item>
        </NavDropdown>
        </div>
        <div className="col">
      <NavDropdown  title='Co-Supervisors' id="basic-nav-dropdown"> 
        <NavDropdown.Item href="/cosupervisorlist">Request Co-Supervisors</NavDropdown.Item>
        <NavDropdown.Divider style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
           
        }}/> 
        <NavDropdown.Item href= {`/corequestbyme/${user._id}`} >My Co-Supervisor Requests </NavDropdown.Item>
        </NavDropdown>
        </div>
          <div className="col">
      <NavDropdown  title='Supervisors' id="basic-nav-dropdown"> 
        <NavDropdown.Item href="/supervisorlist">Request Supervisors</NavDropdown.Item>
        <NavDropdown.Divider style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
           
        }}/> 
        <NavDropdown.Item href= {`/requestbyme/${user._id}`} >My Supervisor Requests </NavDropdown.Item>
        </NavDropdown>
        </div>
        <div className="col">

      <NavDropdown  title={user.name} id="basic-nav-dropdown"> 
        <NavDropdown.Item href="/stdprofile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
           
        }}/>
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
      </div>
      </div>
     
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>




    </div>


 
  

)
}