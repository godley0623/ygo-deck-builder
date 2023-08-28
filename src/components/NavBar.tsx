import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import kcLogo from '../assets/kc-logo.png'
import '../styles/navBar.css'

export default function NavBar() {
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    function handleLogout() {
        logout()
        window.location.assign('/');
    }

  return (
    <div className='navbar-container'>
        <img onClick={() => navigate('/')} src={kcLogo} alt='Kaiba Corp Logo'/>
        <Link to='/create-deck'>Create Deck</Link>
        {!currentUser &&
        <div className='signup-login'>
            <Link to='/signup'>signup</Link> / <Link to='/login'>login</Link>
        </div>
        }
        {currentUser &&
        <div className='email-logout'>
            <Link to=''>profile</Link> / <Link onClick={handleLogout} to=''>logout</Link>
        </div>
        }
    </div>
  )
}
