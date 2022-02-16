import React, { useEffect, useReducer } from "react";
import { IRegisterState, registerReducer } from "./registerReducer";
import styles from "./register.module.scss";
import axios, { Axios, AxiosError } from "axios";
import { hostURL } from "../../data/host";
import { useLocation } from "react-router-dom";
import { IAction } from "../../context/appReducer";
function Register({ appDispatch }: { appDispatch: React.Dispatch<IAction> }) {
  const defaultState: IRegisterState = {
    username: "",
    password: "",
    password2: "",
    email: "",
    loading: false,
    error: "",
  };

  const { pathname } = useLocation();

  useEffect(() => {
  dispatch({type: "default", payload: defaultState})    
  }, [pathname])
  

  const [state, dispatch] = useReducer(registerReducer, defaultState);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.password !== state.password2)
      return dispatch({ type: "error", payload: "password mismatch" });
    dispatch({ type: "error", payload: "" });
    const payload = {
      username: state.username,
      password: state.password,
      email: state.email,
    };
    try {
      dispatch({ type: "loading", payload: true });
      const res = await axios.post(`${hostURL}/auth/register/`, payload);
      console.log({ res });
      if (res.data.success === true) {
        dispatch({ type: "loading", payload: false });
        window.location.href = res.data.redirect;
      } else {
        dispatch({ type: "loading", payload: false });
        dispatch({ type: "error", payload: res.data.msg });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      username: state.username,
      password: state.password,
    };
    try {
      const res = await axios.post(`${hostURL}/auth/login`, payload, {
        withCredentials: true,
      });
      const { success, redirect, user} = res.data;
      if (success === true) {
        // appDispatch({type:"setUser", payload: user})
        if (redirect) window.location.href = redirect;
      }
    } catch (error: Error | AxiosError | any) {
      if (error.response.status === 401)
        dispatch({
          type: "error",
          payload: "Username or Password is incorrect",
        });
      console.log({ error });
    }
  };

  return (
    <section className={`${styles.contentC} cC`}>
      {pathname === "/register" && (
        <form>
          <div>
            <div>Email:</div>
            <input
              type="text"
              title="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
          </div>
          <div>
            <div>Username:</div>
            <input
              type="text"
              title="username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "username", payload: e.target.value })
              }
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              type="password"
              title="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
            />
          </div>
          <div>
            <div>Confirm Password:</div>
            <input
              type="password"
              title="password"
              value={state.password2}
              onChange={(e) =>
                dispatch({ type: "password2", payload: e.target.value })
              }
            />
          </div>
          {state.error && (
            <div>
              <div>Error:</div>
              <div>{state.error}</div>
            </div>
          )}
          <button
            type="button"
            className={`btn1`}
            onClick={(e) => handleRegister(e)}
          >
            Create Your Account!
          </button>
          <div>{state.loading}</div>
        </form>
      )}

      {pathname === "/login" && (
        <form>
          <div>
            <div>Username:</div>
            <input
              type="text"
              title="username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "username", payload: e.target.value })
              }
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              type="password"
              title="password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
            />
          </div>
          {state.error && (
            <div>
              <div>Error:</div>
              <div>{state.error}</div>
            </div>
          )}
          <button
            type="button"
            className={`btn1`}
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
          <div>{state.loading}</div>
        </form>
      )}
    </section>
  );
}

export default Register;
