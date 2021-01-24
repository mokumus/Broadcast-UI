/* eslint-disable no-unused-vars */
import React, { useRef , useState} from 'react';
import { Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import firebase from '../firebase'
import md5 from 'md5-hash'


export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [ error, setError] = useState('')
    const [ loading, setLoading] = useState(false)
    const [ phone, setPhone] = useState('')
    const history = useHistory()

    const following = [];

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            console.log(phone)
            console.log(emailRef.current.value)
            console.log(md5(emailRef.current.value))

            const entryRef = firebase.database().ref(md5(emailRef.current.value));

            entryRef.push(phone)
            entryRef.push("@GTU_SMS")
            entryRef.push("@GTUOIDB")

            

            /*
            firebase.database().ref(md5(emailRef.current.value)).push(phone)
            firebase.database().ref(md5(emailRef.current.value)).push("@GTU_SMS")
            firebase.database().ref(md5(emailRef.current.value)).push("@GTU_Ogrenci")
            */         
           
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)


    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <PhoneInput country={'tr'} onlyCountries={['tr']}  placeholder="Enter phone number" value={phone} onChange={setPhone} inputProps={{required: true}}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} class="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login"> Login</Link>
            </div>
        </div>
    )
}

