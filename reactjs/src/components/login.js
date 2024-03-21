import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthUser from "./AuthUser";

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const submitForm = () => {
    setErrors({});

    // api call
    http
      .post("/login", { email, password })
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          !error.response.data.message
        ) {
          setErrors(error.response.data.errors);
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Login </h1>
          <div className="form-group">
            <label>Email address:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-primary mt-4"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
