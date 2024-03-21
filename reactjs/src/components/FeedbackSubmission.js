import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function FeedbackSubmission() {
  const { http } = AuthUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch categories
    http
      .get("/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = ["Title is required"];
    }

    if (!description.trim()) {
      newErrors.description = ["Description is required"];
    }

    if (!categoryId) {
      newErrors.categoryId = ["Please select a category"];
    }

    // If there are errors, update the state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = { title, description, categoryId };

    http
      .post("/feedback", formData)
      .then((res) => {
        toast.success("Feedback Submitted Successfully!", {
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/feedback-list");
        }, 2000);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors); // Set errors returned by the API
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
          });
        }
      });
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">Submit Feedback</div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title[0]}</div>
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description[0]}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className={`form-control ${
                    errors.categoryId ? "is-invalid" : ""
                  }`}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <div className="invalid-feedback">{errors.categoryId[0]}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
