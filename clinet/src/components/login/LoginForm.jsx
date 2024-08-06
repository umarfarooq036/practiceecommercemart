import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../InputField";
import Cookies from "js-cookie";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        email,
        password,
      });
      if (response.data.success) {
        // Store user data in Redux
        Cookies.set("token", response.data.token, { expires: 7 }); // Token expires in 7 days
        // dispatch(setUser({ email }));s
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="d-flex flex-column align-items-center gap-3"
      onSubmit={handleLogin}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="w-50"
        variant="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;
