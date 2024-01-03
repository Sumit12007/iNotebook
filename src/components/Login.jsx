import React, { useState } from "react";
import "../form.css";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  // Firing the Animation for LogIn and SignUp form.
  const handleSignup = () => {
    document.querySelector(".wrapper").classList.add("sign-up-mode");
  };
  const handleSignin = () => {
    document.querySelector(".wrapper").classList.remove("sign-up-mode");
  };


  // Making a function which log's in the authentic user to the app.
  const [credentials, setCredentials] = useState({email: "", password: ""})
  let history = useNavigate()

  const onChange = (e) =>{
    // Using spread operator (...note) we are giving a command that whatever the field is if the user kept it unwritten than remain as it is but if anything new adds on then overwrite it. 
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email , password:credentials.password})
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        history("/");
        props.showAlert("Logged In successfully.", "success");
      }
      else{
        props.showAlert("Invalid Details.", "danger");
      }

      }catch (error) {
        console.error('Get all note error:', error.message);
      }
  }

  // Making a function which adds the new user to the app.
  const [details, setDetails] = useState({name: "", email: "", password: ""});
  const onSignup = (e) =>{
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSignupSubmit = async (e) =>{
    e.preventDefault();
    try{
      const {name, email, password} = details;
      const response = await fetch("http://localhost:3000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        history("/");
        props.showAlert("Account created successfully.", "success");
      }
      else{
        props.showAlert("Invalid Credentials.", "danger");
      }
        
      }catch (error) {
        console.error('Get all note error:', error.message);
      }
  }

  return (
    <div className="wrapper">
      <div className="forms-container">
        <div className="signin-signup">
          {/* Log In Form */}
          <form className="myForm sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Log In</h2>
            <span>Already registered then use your details to be connected.</span>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={onChange} autoComplete="true" required/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" className="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} autoComplete="current-password" required minLength={8}/>
            </div>
            <input type="submit" value="Login" className="submitBtn solid"/>
          </form>

          {/* Sign Up Form */}
          <form className="myForm sign-up-form" onSubmit={handleSignupSubmit}>
            <h2 className="title">Sign up</h2>
            <span>Or use your email for registration.</span>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={details.name} name="name" autoComplete="true" onChange={onSignup} required minLength={3}/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={details.email} name="email" autoComplete="true" onChange={onSignup} required/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" className="password" placeholder="Password" value={details.password} name="password" autoComplete="current-password" onChange={onSignup} required minLength={8}/>
            </div>
            <input type="submit" className="submitBtn" value="Sign up"/>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Hello Friend!</h3>
            <p>Enter your personal details and start your journey with us.</p>
            <Link className="submitBtn transparent" to="/login" id="sign-up-btn" role="button" onClick={handleSignup}>Sign Up</Link>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>To keep connected with us please login with your personal details.</p>
            <Link className="submitBtn transparent" to="/login" id="sign-in-btn" role="button" onClick={handleSignin}>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
