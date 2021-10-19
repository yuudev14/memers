import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/auth/signup_signin.scss"

const Signin = () => {
  return (
    <main className='signin'>
      <form>
        <input type="text"/>
        <input type="password"/>
        <input type="submit"/>
        <p>Don't have an account yet? <Link to="/sign-up">Sign-up</Link></p>
      </form>
      
    </main>
  )
}

export default Signin
