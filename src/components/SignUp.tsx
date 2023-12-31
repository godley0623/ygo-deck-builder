import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../context/authContext'
import NavBar from './NavBar'
import yjkBg from '../assets/yjk-bg.jpeg'

export default function SignUp() {
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (emailRef.current?.value && passwordRef.current?.value && passwordConfirmRef.current?.value) {
            
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError('Passwords do not match')
            }

            try {
                setError('')
                setLoading(true)
               await signup(emailRef.current.value, passwordRef.current.value)
                navigate('/login')
            } catch (error) {
                console.error(error)
                setError('Failed to create an account')
            }
            setLoading(false)

        } else {
            return
        }
    }

  return (
    <>
    <NavBar />
    <Container className="d-flex align-items-center justify-content-center" 
    style={ { minWidth: '100%', flexDirection: 'column', minHeight: "100vh", backgroundImage: `url(${yjkBg})`, backgroundSize: '100% 100%' } }
  >
    <div className='w-100' style={ { maxWidth: "400px" } }>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className='w-100 mt-4'>Sign Up</Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Card.Body>
        </Card>
    </div>
    </Container>
    </>
  )
}
