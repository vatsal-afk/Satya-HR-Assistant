import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            console.log({response})
            if (response.data.token) {
              
              
              console.log("congrats login success");
              
            } else {
              console.log({response})
              console.log('Login failed:', response.data.message ||"Unknown error");
            }
          } catch (error) {
            
            if (error.response) {
              
              console.log('Login failed:', error.response.data.message || 'Unknown error');
              console.log('Status code:', error.response.status);
            } else if (error.request) {
              
              console.log('No response received from the server');
            } else {
              
              console.error('Error during login:', error.message);
            }
          }
        
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                
            </form>
        </div>
    );
};

export default UserLogin;
