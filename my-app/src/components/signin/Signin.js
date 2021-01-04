import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserFetchApi } from "../../hooks/UserGlobalProvider";
import "../signup/signup.css";

function Signin() {
  let { loginUser } = useContext(UserFetchApi);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit} method="POST">
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
          </form>
        </div>
      </div>
      <div>
        <p>You do not have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Signin;
