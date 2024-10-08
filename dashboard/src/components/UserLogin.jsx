import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #003d82;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const ToggleLink = styled.span`
  color: #0056b3;
  cursor: pointer;
  text-decoration: underline;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

function UserLogin({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && !name) {
      setError('Please enter your name');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const endpoint = isLogin
        ? 'http://localhost:3000/auth/login'
        : 'http://localhost:3000/auth/signup';
      const payload = isLogin
        ? { email, password }
        : { email, password, name };
      
      const response = await axios.post(endpoint, payload);

      if (response.data.token) {
        if (typeof onLogin === 'function') {
          onLogin(response.data.user);
        } else {
          console.log('Login successful, but onLogin is not a function');
        }
        
        console.log("Login/signup success:", response.data.user);

        // Navigate to dashboard on successful login/signup
        navigate('/dashboard');
      } else {
        setError(response.data.message || "Unknown error occurred");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to authenticate');
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </Form>
        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <ToggleLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </ToggleLink>
        </ToggleText>
      </FormContainer>
    </PageContainer>
  );
}

export default UserLogin;
