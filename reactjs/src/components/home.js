import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Welcome to Feedback Tool</h1>
            <p className="lead">
              This is a platform where you can provide feedback and engage in
              discussions with your team or clients.
            </p>
            <p className="lead">
              To get started, click on the button below to register your
              account.
            </p>
            <div className="text-center mt-4">
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
