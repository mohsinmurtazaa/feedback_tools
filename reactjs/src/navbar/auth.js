import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FeedbackSubmission from "../components/FeedbackSubmission";
import AuthUser from "../components/AuthUser";
import FeedbackList from "../components/FeedBackList";
import CommentForm from "../components/CommentForm";
import User from "../components/User";
function Auth() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/feedback-list">
              Feedback List
            </Link>
          </li>
          <li className="nav-item">
            <span role="button" className="nav-link" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/feedback-submission" element={<FeedbackSubmission />} />
          <Route path="/feedback-list" element={<FeedbackList />} />
          <Route
            path="/feedback/:feedbackId/comment"
            element={<CommentForm />}
          />
          <Route path="/user/:username" element={<User />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default Auth;
