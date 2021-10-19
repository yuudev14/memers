import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addAuthErrors, resetAuthErrors } from '../../slice/authSlice';
import { signupAction } from '../../slice/actions/authAction';

const Signup = () => {
  const initstate = {
    email: "",
    username: "",
    password: "",
    retryPassword: ""
  }
  const [signupForm, setSignupForm] = useState(initstate);
  const errors = useSelector(state => state.auth.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(resetAuthErrors());
    }
  }, [])

  const signup = async(e) => {
    e.preventDefault();
    dispatch(resetAuthErrors())
    let pass = true;
    const { username, password, retryPassword } = signupForm;
    if (username.length < 7) {
      pass = false;
      dispatch(addAuthErrors("username length is below 7"));
    }
    if (password.length < 7) {
      pass = false;
      dispatch(addAuthErrors("password length is below 7"));
    }

    if (password !== retryPassword) {
      pass = false
      dispatch(addAuthErrors("password doesn't match"));
    }

    if(pass){
      const action = await dispatch(signupAction(signupForm));
      if ("token" in action.payload) {
        history.push("/");
      }
    }
  }

  const updateSignupForm = (e) => {
    const {name, value} = e.target;
    setSignupForm({
      ...signupForm,
      [name] : value
    })
  }


  return (
    <main className='signup'>
      <form onSubmit={signup}>
        <ul>
          {errors.map(li => (
            <li key={li}>{li}</li>
          ))}
        </ul>
        <h1>Sign up</h1>
        <input type="email" name="email" onChange={updateSignupForm} required/>
        <input type="text" name="username" onChange={updateSignupForm} required/>
        <input type="password" name="password" onChange={updateSignupForm} required/>
        <input type="password" name="retryPassword" onChange={updateSignupForm} required/>
        <input type="submit"/>
        <p>Already have an account? <Link to="/sign-in">Sign-in</Link></p>
      </form>
      
    </main>
  )
}

export default Signup
