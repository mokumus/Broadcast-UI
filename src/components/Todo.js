/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form, Col } from 'react-bootstrap'
import firebase from '../firebase'
import '../App.css';
import { useAuth } from '../contexts/AuthContext'
import md5 from 'md5-hash'

export default function Todo({ todo }) {

  const { currentUser } = useAuth()

  function deleteTodo() {
    const todoRef = firebase.database().ref(md5(currentUser.email)).child(todo[0]);
    todoRef.remove();
  }

  return (
    <div>
        <Form>   
          
            <Form.Row className="align-items-center">
              <Col className="ml-2" >  <a href={"https://twitter.com/" + todo[1].substring(1)} target="_blank" rel="noopener noreferrer">{todo[1]}</a> </Col>
              <Col xs="auto"><Button className="mb-2"  onClick={deleteTodo}>Delete</Button></Col>
            </Form.Row>
        </Form>
    </div>
  )
}