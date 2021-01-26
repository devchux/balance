import React from "react";
import { Link } from "react-router-dom";
import './page404.css'

function Page404() {
  return (
    <div className="d-flex justify-content-center align-items-center page-not-found-container">
      <h1>404</h1>
      <p>Oops!! Page Not Found</p>
      <Link to="dashboard/profile">Go to my profile &larr;</Link>
    </div>
  );
}

export default Page404;
