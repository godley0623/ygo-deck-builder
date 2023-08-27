import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useAuth } from '../context/authContext'

export default function LogIn() {
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (emailRef.current?.value && passwordRef.current?.value) {

            try {
                setError('')
                setLoading(true)
               await login(emailRef.current.value, passwordRef.current.value)
               navigate('/')
            } catch (error) {
                console.error(error)
                setError('Failed to sign in')
            }
            setLoading(false)

        } else {
            return
        }
    }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" 
    style={ { flexDirection: 'column', minHeight: "100vh" } }
  >
    <div className='w-100' style={ { maxWidth: "400px" } }>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
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
                    <Button disabled={loading} type="submit" className='w-100 mt-4'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
    </div>
    </Container>
    </>
  )
}

