import React, { useState } from "react";
import "../styles/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../../shared/components/Navbar";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <main className="login-page">
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <FormGroup
              type={"email"}
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormGroup
              type={"password"}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
