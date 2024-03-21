import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AuthUser from "./AuthUser";
import moment from "moment";

const userSuggestionStyle = {
  position: "relative",
  top: "100%",
  left: 0,
  zIndex: 1,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderTop: "none",
  borderRadius: "0 0 5px 5px",
  padding: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const userSuggestionItemStyle = {
  cursor: "pointer",
  padding: "3px 8px",
  marginRight: "5px",
  borderRadius: "3px",
  backgroundColor: "#f0f0f0",
  transition: "background-color 0.3s ease",
};
const textAreaStyle = {
  marginBottom: "4px",
  height: "100px",
};

const userSuggestionItemHoverStyle = {
  ...userSuggestionItemStyle,
  backgroundColor: "#e0e0e0",
};

export default function CommentForm() {
  const { http } = AuthUser();
  const { feedbackId } = useParams();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [feedbackId]);
  useEffect(() => {
    console.log("Show suggestions:", showSuggestions);
  }, [showSuggestions]);

  const fetchComments = () => {
    http
      .get(`/feedback/${feedbackId}/comments`)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  };

  const handleInputChange = async (e) => {
    const text = e.target.value;
    setContent(text);

    // Find the index of the last "@" symbol
    const lastIndex = text.lastIndexOf("@");

    if (lastIndex !== -1) {
      // Extract the text after the last "@" symbol
      const searchText = text.substring(lastIndex + 1);

      try {
        const response = await http.get(`/users?search=${searchText}`);
        console.log("Fetched users:", response.data.data);
        const fetchedUsers = response.data.data;
        if (fetchedUsers) {
          setUsers(fetchedUsers);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleUserSelect = (user) => {
    setShowSuggestions(false);
    setContent((prevContent) => {
      // Find the index of the last "@" symbol
      const lastIndex = prevContent.lastIndexOf("@");

      if (lastIndex !== -1) {
        // Extract the text before the last "@" symbol
        const prefix = prevContent.substring(0, lastIndex);

        // Append the selected user's name to the existing content
        return prefix + "@" + user.name + " ";
      } else {
        // If "@" symbol not found, simply append the selected user's name
        return "@" + user.name + " ";
      }
    });
    setUsers([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // if (!content.trim()) {
    //   setErrors({ content: ["Content is required"] });
    //   return;
    // }

    // Replace tagged usernames with special format (e.g., @username => <mention>username</mention>)
    const taggedContent = content.replace(
      /@([^\s]+)/g,
      "<mention>$1</mention>"
    );

    const formData = { content: taggedContent, feedback_id: feedbackId };

    http
      .post("/comments", formData)
      .then((res) => {
        setContent("");
        fetchComments();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
        } else {
          console.error("An error occurred:", error.message);
        }
      });
  };

  return (
    <div>
      <h3 style={{ marginTop: "10px" }}>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
            placeholder="Enter your comment"
            value={content}
            onChange={handleInputChange}
            style={textAreaStyle}
          ></textarea>
          {showSuggestions && (
            <div className="suggestions-container" style={userSuggestionStyle}>
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="user-suggestion"
                  style={userSuggestionItemStyle}
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
          {errors.content && (
            <div className="invalid-feedback">{errors.content[0]}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{comment.user.name}</span>
              <span style={{ color: "#999" }}>
                {moment(comment.created_at).fromNow(true)}
              </span>
            </div>
            <p style={{ marginTop: "5px" }}>
              {comment.content
                .split(/<mention>([^<]+)<\/mention>/)
                .map((part, index) => {
                  if (index % 2 === 0) {
                    return <span key={index}>{part}</span>;
                  } else {
                    const username = part.trim();
                    // return <span key={index}>@{username}</span>;
                    return (
                      <Link
                        to={`/user/${username}`}
                        style={{ fontWeight: "bold" }}
                      >
                        @{username}
                      </Link>
                    );
                  }
                })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
