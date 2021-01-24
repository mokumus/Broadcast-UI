/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Col, Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../firebase'
import TodoList from './TodoList'
import md5 from 'md5-hash'

export default function Dashboard(){
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [title, setTitle] = useState("")
    


    async function handleLogout(){
        setError('')

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const handleOnChange = (e) => {
        setTitle(e.target.value)
    }

    const createTodo = () => {

        const todoRef = firebase.database().ref(md5(currentUser.email));

        todoRef.push(title)
        setTitle("")
    }
    


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form className="text-left">    
                    
                    <Col xs="auto" className="text-center mb-4"><strong>Email : </strong>{currentUser.email}</Col>
                    
                        <Form.Row className="align-items-center ml-0">   
                            <Col ><strong>Handle : </strong></Col>
                            <Col xs="auto"><Form.Control type="text" className="mb-2" onChange={handleOnChange} value={title}/></Col>
                            <Col xs="auto"><Button type="submit" className="mb-2" onClick={createTodo}>Add</Button></Col>
                        </Form.Row>
                    </Form>
                    <TodoList/>

                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}