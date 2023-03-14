import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    const errors = {};
    // if (!username || !email || !firstName || !lastName || !password || !confirmPassword) errors.empty = "true";
    if (username && username.length < 4) errors.name = "Username must be greater than 3 characters";
    if (email && (!email.includes("@") || !email.includes(".")) ) errors.email = "Please provide a valid email";
    if (password && password.length < 6 ) errors.password = 'Password must be greater than 5 characters';
    if (password && confirmPassword && password !== confirmPassword) errors.password = 'Confirm Password field must be the same as the Password field';
    setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword, hasSubmitted]);


  const handleSubmit = async  (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(errors).length) return;

    if (password === confirmPassword) {
      setErrors({});
      setHasSubmitted(false);
      // return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      //   .then(closeModal)
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   });

      await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      return dispatch(sessionActions.login({ credential: username, password }))
      // .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) console.log(data.errors);
      });
    }


    return setErrors({password: 'Confirm Password field must be the same as the Password field'});
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        { (<ul>
          {Object.values(errors)?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>)}


        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="johndoe@domain.com"
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="johnDoe"
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="John"
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Doe"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // placeholder="hey"
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            // placeholder="******"
          />
        </label>
        <button
          type="submit"
          disabled={
            !username ||
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword ||
            errors.name ||
            errors.password
            }>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
