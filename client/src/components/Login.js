import React, {useState, axios} from "react";
// import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async function(e) {
        e.preventDefault();
        try {
            // Send a POST request to your backend endpoint for user authentication
            const response = await axios.post('http://127.0.0.1:5000/login', { email: email, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data); // Assuming your backend sends back some data upon successful login
            // Optionally, you can redirect the user to another page upon successful login
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure (display error message, etc.)
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    );
}

export default  Login


// // import React, { useState } from "react";
// // import { NavLink, useHistory } from "react-router-dom";
// // // import "./Login.css";
// // // import loginImage from "../assets/login.jpeg";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const history = useHistory();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch("http://127.0.0.1:5000/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           username,
// //           password,
// //         }),
// //       });

// //       if (response.status === 200) {
// //         const data = await response.json();
// //         localStorage.setItem("access_token", data.access_token);
// //         window.alert("Login successful");
// //         history.push("./Home"); // Redirect to home.jsx upon successful login
// //       } else {
// //         window.alert("Login failed. Invalid credentials");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       window.alert("An error occurred while processing your request");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="setup">
// //         <div className="login-container">
// //         {/* <div className="image-container">
// //           <img src={loginImage} alt="login" className="login-image" />
// //         </div> */}
// //           <div className="form-container">
// //             <form className="register-form form-container" onSubmit={(e) => handleSubmit(e)}>
// //             <h2>Welcome Back!</h2>
// //           <h4>please enter your details</h4>
// //               <label htmlFor="username" className="label">
// //                 Username
// //                 <input
// //                   type="text"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   required
// //                   className="input" // Apply input styling
// //                 />
// //               </label>
// //               <label htmlFor="password" className="label">
// //                 Password
// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="input" // Apply input styling
// //                 />
// //               </label>
// //               <button type="submit" className="button">
// //                 Log in
// //               </button>
// //               <p>
// //               Don't have an account?{" "}
// //               <NavLink to="/register" className="link">
// //                 <strong>Sign Up here</strong>
// //               </NavLink>
// //             </p>
// //             </form>  
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Login;
