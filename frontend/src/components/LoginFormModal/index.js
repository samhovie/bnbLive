// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  useEffect(() => {
    const errors = {};
    if (credential && credential.length < 4) errors.name = "Username must be greater than 3 characters";
    if (password && password.length < 6 ) errors.password = 'Password must be greater than 5 characters';
    setErrors(errors);
  }, [ credential, password ]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    return await dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);}
          }
      );


  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors)?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={
            !credential ||
            !password ||
            errors.name ||
            errors.password
            }>Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
