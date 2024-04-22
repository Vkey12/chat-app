import React, { useState } from "react";
import axios from "axios";
import "../Signup.css";  // Ensure you have this CSS file in the correct path

function Signup({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Add state for username
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', { username, email, password }); // Include username in the request
            if (response.status === 201) { // Check for successful signup (status 201)
                localStorage.setItem('access_token', response.data.access_token);
                onLoginSuccess(response.data.access_token);
            } else {
                setError("Could not sign up. Please try again.");
            }
        } catch {
            setError("An error occurred during signup.");
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Create Account</h2>
                {error && <p className="error">{error}</p>}
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="JohnDoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;

