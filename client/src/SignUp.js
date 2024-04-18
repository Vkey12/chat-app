import React, { useState } from 'react';
import axios from 'axios';


function SignUp() {
  const [SignUp, setSignUp] = useState(false); // State to manage visibility
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('url', formData);
      console.log('Signup successful!', response.data);
      // Reset form after successful submission
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setSignUp(true)}> Sign Up</button>
      {SignUp && (
        <div className="sign-up-container">
          <h2 className="sign-up-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="sign-up-input"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="sign-up-input"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="sign-up-input"
                required
              />
            </div>
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
