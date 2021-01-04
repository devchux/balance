import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserFetchApi } from "../../hooks/UserGlobalProvider";
import "./signup.css";

function Signup() {
  let { registerUser } = useContext(UserFetchApi);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
  };
  return (
    <div className="register-container">
      <div className="blue-ball"></div>
      <div className="orange-ball"></div>
      <div className="purple-ball"></div>
      <div className="title">Balance</div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center mb-3">Sign Up</h4>
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="firstname"
                id="firstname"
                onChange={handleChange}
                aria-describedby="helpId"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                aria-describedby="helpId"
                placeholder="Last Name"
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                name="password2"
                id="password2"
                onChange={handleChange}
                aria-describedby="helpId"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block py-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <p>Already created an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

export default Signup;
