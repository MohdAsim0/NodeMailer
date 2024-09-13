import { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Validate email with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form validation before submission
  const validateForm = () => {
    if (!name.trim() || name.length < 3 ) {
      setError("Please enter a valid name with at least 3 characters.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (!message.trim()) {
      setError("Message cannot be empty.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return; // Exit if form is invalid
    setError("");
    const currentName = name;
    const currentEmail = email;
    const currentMessage = message;

    // Clear form inputs immediately
    setName("");
    setEmail("");
    setMessage("");

    try {
      const response = await axios.post("https://nodemailer-vz0u.onrender.com/sendEmail", {
        name: currentName, // Use the stored values
        email: currentEmail, // Use the stored values
        message: currentMessage, // Use the stored values
      });
      // Simplified success check
      if (response.status === 200) {
      }
    } catch (error) {
      setError("Failed to send the email. Please try again.");
    }
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="form">
      <h2>Basic Nodemailer App</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />{" "}
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <textarea
          name="message"
          value={message}
          id=""
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>
        <br />
        <button type="submit">send Email</button>
      </form>
      </div>
    </>
  );
}

export default App;
