import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GetUserData } from "../../context/UserGlobalProvider";
import "../signup/signup.css";

function Signin() {
  let { loginUser } = useContext(GetUserData);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    // set default error values
    setError('')

    // form validation
    if (!email || !password) {
      setError("Enter both fields!");
      return;
    }
    loginUser(user);
    
  };
  return (
    <div className="register-container">
      <div className="blue-ball"></div>
      <div className="orange-ball"></div>
      <div className="purple-ball"></div>
      <div className="title">Balance</div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Sign In</h4>

          {/* Log frontend authentication error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>{error}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={handleChange}
                aria-describedby="helpId"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleChange}
                aria-describedby="helpId"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block py-2">
                Login
              </button>
            </div>
            <p className="py-2">Forgot password? Click <Link to="#">here</Link></p>
          </form>
        </div>
      </div>
      <div>
        <p>
          You do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
