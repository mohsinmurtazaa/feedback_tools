import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthUser from "./AuthUser";

export default function Register() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const submitForm = () => {
    // api call
    http
      .post("/register", { email: email, password: password, name: name })
      .then((response) => {
        if (response.data && response.data.message) {
          toast.success(response.data.message, {
            position: "top-right",
          });
        }
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        } else {
          toast.error("Registration failed. Please try again.", {
            position: "top-right",
          });
        }
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Register </h1>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="test"
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              id="email"
            />
            {errors && errors.name && (
              <p className="text-danger">{errors.name[0]}</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            {errors && errors.email && (
              <p className="text-danger">{errors.email[0]}</p>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
            {errors && errors.password && (
              <p className="text-danger">{errors.password[0]}</p>
            )}
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-primary mt-4"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
