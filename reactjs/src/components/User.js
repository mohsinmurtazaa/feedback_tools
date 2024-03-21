import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { username } = useParams();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>User Details</h2>
        <p>
          <strong>Username:</strong> {username}
        </p>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    padding: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  },
};

export default User;
