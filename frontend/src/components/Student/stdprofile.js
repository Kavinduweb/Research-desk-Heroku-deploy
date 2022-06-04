import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function STDprofile() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const {user} = auth

  



  return (
    <div className = "activite_page">
        <h3>Update Student Details</h3>
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>StudentId</Form.Label>
    <Form.Control type="email" placeholder="Enter Student Id" value={user.studentNumber}  />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="email" placeholder="Enter Name" value={user.name} />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter Email"  value={user.email} />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Update
  </Button>
</Form>
       


    </div>
  )
}

export default STDprofile