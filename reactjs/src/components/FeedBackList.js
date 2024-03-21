import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AuthUser from "./AuthUser";
import "../FeedbackList.css";

export default function FeedbackList() {
  const { http } = AuthUser();
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFeedbackItems();
  }, [currentPage]);

  const fetchFeedbackItems = () => {
    http
      .get(`/feedback?page=${currentPage}`)
      .then((res) => {
        console.log(res);
        setFeedbackItems(res.data.data);
        setTotalPages(res.data.last_page);
      })
      .catch((error) => {
        console.error("Error fetching feedback items:", error.message);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="feedback-list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Feedback List</h2>
        <Link to="/feedback-submission" className="btn btn-primary">
          Submit Feedback
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category.name}</td>
              <td>{item.description}</td>
              <td>{item.user.name}</td>
              <td>
                <Link
                  to={`/feedback/${item.id}/comment`}
                  className="btn btn-primary"
                >
                  Comment
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
