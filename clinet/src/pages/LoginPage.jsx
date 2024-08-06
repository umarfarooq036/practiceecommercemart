import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => (
  <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <Row className="w-100">
      <Col xs={12} md={8} lg={6} xl={4} className="mx-auto p-4 bg-white border rounded shadow-sm">
        <h1 className="text-center mb-4">Login</h1>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
