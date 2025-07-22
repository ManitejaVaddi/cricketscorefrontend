import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios";
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const history = useHistory(); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);

      if (res.status === 201) {
        alert("Registered successfully! Please log in.");
        history.push("/login"); 
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      alert(`${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
