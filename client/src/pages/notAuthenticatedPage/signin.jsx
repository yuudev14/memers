import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../../styles/auth/signup_signin.scss";
import { useDispatch } from 'react-redux';
import { loginAction } from '../../slice/actions/authAction';

const Signin = () => {
  const initstate = {
    usernameOrEmail: "",
    password: "",
  }
  const [loginForm, setLoginForm] = useState(initstate);
  const dispatch = useDispatch();
  const history = useHistory();

  const updateLoginForm = (e) => {
    const {name, value} = e.target;
    setLoginForm({
      ...loginForm,
      [name] : value
    })
  }

  const login = async(e) => {
    try {
      e.preventDefault();
      const action = await dispatch(loginAction(loginForm));
      if ("token" in action.payload) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <main className='signin'>
      <form onSubmit={login}>
        <input type="text" name="usernameOrEmail" onChange={updateLoginForm}/>
        <input type="password" name="password"  onChange={updateLoginForm}/>
        <input type="submit"/>
        <p>Don't have an account yet? <Link to="/sign-up">Sign-up</Link></p>
      </form>
      
    </main>
  )
}

export default Signin
