
import React from "react";

const Home = ({ user }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Cricket Score App</h1>
      {user ? (
        <div style={{ marginTop: "20px" }}>
          <h3>User Profile</h3>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Please <strong>Register</strong> or <strong>Login</strong> to begin scoring.</p>
      )}
    </div>
  );
};

export default Home;
