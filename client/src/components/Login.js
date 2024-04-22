import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                onLoginSuccess(); // Make sure you define this function in your parent component
            } else {
                setError("Failed to login. Please check your credentials.");
            }
        } catch (error) {
            setError("Login failed. Redirecting to sign up...");
            // Redirect to the signup page after a brief delay
            setTimeout(() => navigate('/signup'), 3000); // Adjust the delay as needed
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Welcome! </h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
            <p className="signup-redirect">
                Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign up here.</span>
            </p>
        </div>
    );
}

export default Login;