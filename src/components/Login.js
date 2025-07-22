import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios";
import './Login.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      if (res.status === 200) {
        alert("Login successful!");
        onLogin(res.data);
        history.push("/"); 
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
