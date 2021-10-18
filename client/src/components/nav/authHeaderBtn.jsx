import React from 'react'
import { Link } from 'react-router-dom';

const AuthHeaderBtn = () => {
  return (
    <div className="authButtons">
      <Link><button>Sign-in</button></Link>
      <Link><button>Sign-up</button></Link>
      
    </div>
  )
}

export default AuthHeaderBtn
