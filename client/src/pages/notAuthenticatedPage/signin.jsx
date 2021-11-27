import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../styles/auth/signup_signin.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../slice/actions/authAction";
import { resetAuthErrors } from "../../slice/authSlice";

const Signin = () => {
  const initstate = {
    usernameOrEmail: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initstate);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);
  const history = useHistory();

  const updateLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthErrors());
    };
  }, [dispatch]);

  const login = async (e) => {
    try {
      e.preventDefault();
      dispatch(resetAuthErrors());
      const action = await dispatch(loginAction(loginForm));
      if ("token" in action.payload) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="signin">
      <form onSubmit={login}>
        <ul>
          {errors.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
        <h1>Sign in</h1>
        <input
          type="text"
          name="usernameOrEmail"
          onChange={updateLoginForm}
          required
          placeholder="username or email"
        />
        <input
          type="password"
          name="password"
          onChange={updateLoginForm}
          required
          placeholder="password"
        />
        <input type="submit" />
        <p>
          Don't have an account yet? <Link to="/sign-up">Sign-up</Link>
        </p>
      </form>
    </main>
  );
};

export default Signin;
