import React, { useState } from "react";
import axios from "axios";

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async function(e) {
        e.preventDefault();
        try {
            // Send a POST request to your backend endpoint for user registration
            const response = await axios.post('http://127.0.0.1:5000/signup', { name: name, email: email, password: password });
            console.log(response.data); 
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle registration failure (display error message, etc.)
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Signup</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Signup</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    );
}

export default Signup;

// // import React, { useState } from "react";
// // import { NavLink, useHistory } from "react-router-dom";
// // // import "./signup.css";
// // // import loginImage from "../assets/login.jpeg";

// // const Signup = () => {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const history = useHistory();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch("http://127.0.0.1:5000/signup", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           username,
// //           email,
// //           password,
// //         }),
// //       });

// //       if (response.status === 201) {
// //         window.alert("User registered successfully!");
// //         history.push("/login");
// //       } else {
// //         window.alert("Registration failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       window.alert("An error occurred while processing your request");
// //     }
// //   };

// //   return (
// //     <>
// //       <h2>Sign Up</h2>
// //       <div className="register-container">
// //         {/* <div className="image-container">
// //           <img src={loginImage} alt="Login" className="login-image" />
// //         </div> */}
// //         <div className="form-container">
// //           <form onSubmit={handleSubmit}>
// //             <div>
// //               <label>Username:</label>
// //               <input
// //                 type="text"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label>Email:</label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label>Password:</label>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <button type="submit">Sign Up</button>
// //           </form>
// //           <p>
// //             Already have an account? <NavLink to="/login">Login</NavLink>
// //           </p>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Signup;
