import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  const signIn = (e) => {
    e.preventDefault();
   axios
      .post(`http://localhost:3001/auth/login`, {
        email: email,
        password: password
      })
      .then(response => {
         if (response.status == 200) {
          localStorage.setItem('token', response.data['token']);
          navigate('/');
         }
      })
      .catch(error => {
        console.error('Error:', error);
      });
 }
 return (
  <div>
    <h2 className="main-header">Sign In</h2>
    <form onSubmit={signIn} className={classes.form}>
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
      <button className={classes.button} type="submit">Sign In</button>
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
