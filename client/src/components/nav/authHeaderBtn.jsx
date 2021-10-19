import React from 'react'
import { Link } from 'react-router-dom';

const AuthHeaderBtn = () => {
  return (
    <div className="authButtons">
      <Link><button>log-out</button></Link>
      <Link><button>profile</button></Link>
    </div>
  )
}

export default AuthHeaderBtn
