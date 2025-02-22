import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

const users = [];
const auctions = [];

function Navbar({ isAuthenticated }) {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Auction App</h1>
      <ul className="nav-list">
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li>
          <Link to={isAuthenticated ? "/dashboard" : "/signin"}>Dashboard</Link>
        </li>
        <li>
          <Link to={isAuthenticated ? "/post-auction" : "/signin"}>Post Auction</Link>
        </li>
      </ul>
    </nav>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    users.push({ username, password });
    alert("Signup successful! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}

function SignIn({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
}

function PostAuction({ isAuthenticated }) {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  if (!isAuthenticated) return <Navigate to="/signin" />;

  const handlePost = () => {
    auctions.push({ item, description, price, date });
    alert("Auction posted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="auction-container">
      <h2>Post New Auction</h2>
      <input type="text" placeholder="Item Name" onChange={(e) => setItem(e.target.value)} />
      <textarea placeholder="Item Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Starting Price" onChange={(e) => setPrice(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={handlePost}>Post Auction</button>
    </div>
  );
}

function Dashboard({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/signin" />;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {auctions.length === 0 ? <p>No auctions available</p> : auctions.map((auction, index) => (
        <div key={index} className="auction-card">
          <h3>{auction.item}</h3>
          <p>{auction.description}</p>
          <p>Starting Price: ${auction.price}</p>
          <p>Auction Date: {auction.date}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
        <Route path="/post-auction" element={<PostAuction isAuthenticated={isAuthenticated} />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
