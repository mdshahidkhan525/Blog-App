import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  const registerUser = (e) => {
     e.preventDefault();
    axios
       .post(`${process.env.REACT_APP_BASE_URL}/users`, {
         username: username,
         email: email,
         password: password,
         password_confirmation: password_confirmation
       })
       .then(response => {
          if (response.status === 201) {
            localStorage.setItem('token', response.data['token']);
            navigate('/', { state: { message: 'Signup Successfully..!!' } });
          }
       })
       .catch(error => {
         console.error('Error:', error);
       });
  }
  return (
    <div>
      <h2 className="main-header">Sign Up</h2>
      <form onSubmit={registerUser} className={classes.form}>
        <input
          className={classes.inputBox}
          type="username"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className={classes.inputBox}
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={classes.inputBox}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className={classes.inputBox}
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className={classes.button} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

const useStyles = makeStyles({
  button: {
    "backgroundColor": "#007bff",
    "color": "#fff",
    "border": "none",
    "padding": "10px 20px",
    "cursor": "pointer"
  },

  inputBox: {
    "width": "300px",
    "padding" : "10px",
    "margin": "10px 0px"
  },

  form: {
    "max-width": "300px",
    "margin":"0 auto"
  }
});
