import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [userCount, setUserCount] = useState(0);
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark(!dark);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/count");
      setUserCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 10000, 15000, 20000],
        backgroundColor: "#5f9cff",
      },
    ],
  };

  return (
    <div style={container(dark)}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={logo}>⚡ MyApp</h2>

        <p style={menu} onClick={() => navigate("/dashboard")}>🏠 Dashboard</p>
        <p style={menu} onClick={() => navigate("/users")}>👥 Users</p>
        <p style={menu} onClick={() => navigate("/profile")}>👤 Profile</p>

        <button style={darkBtn} onClick={toggleDark}>
          🌙 Theme
        </button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* NAVBAR */}
        <div style={navbar}>

          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>👤</span>
            <span style={{ fontSize: "13px", opacity: 0.8 }}>{email}</span>
          </div>

          {/* RIGHT */}
          <button
            style={logoutBtn}
            onMouseEnter={btnHover}
            onMouseLeave={btnLeave}
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* CONTENT */}
        <h1 style={{ color: dark ? "#fff" : "#000" }}>
          Welcome to Dashboard 🎉
        </h1>

        <p style={{ color: dark ? "#cbd5f5" : "#555" }}>
          You're successfully logged in.
        </p>

        {/* CARDS */}
        <div style={cards}>

          <div
            style={card(dark)}
            onMouseEnter={cardHover}
            onMouseLeave={cardLeave}
          >
            <h3>📊 Projects</h3>
            <p>12 Active Projects</p>
          </div>

          <div
            style={card(dark)}
            onMouseEnter={cardHover}
            onMouseLeave={cardLeave}
          >
            <h3>👥 Users</h3>
            <p>{userCount} Team Members</p>
          </div>

          <div
            style={card(dark)}
            onMouseEnter={cardHover}
            onMouseLeave={cardLeave}
          >
            <h3>💰 Revenue</h3>
            <p>₹25,000</p>
          </div>

        </div>

        {/* CHART */}
        <div style={{ width: "500px", margin: "40px auto" }}>
          <Bar data={data} />
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = (dark) => ({
  display: "flex",
  background: dark ? "#0f172a" : "#eef2ff",
  color: dark ? "#fff" : "#000",
  minHeight: "100vh",
});

const sidebar = {
  width: "220px",
  background: "linear-gradient(180deg, #1e293b, #0f172a)",
  color: "#fff",
  padding: "20px",
};

const logo = {
  marginBottom: "20px",
};

const menu = {
  padding: "10px",
  cursor: "pointer",
  borderRadius: "8px",
  marginBottom: "10px",
};

const darkBtn = {
  marginTop: "20px",
  padding: "10px",
  width: "100%",
  background: "#7c3aed",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

/* 🔥 PERFECT SMALL LOGOUT BUTTON */
const logoutBtn = {
  background: "transparent",
  color: "#ff4d4d",
  border: "1px solid #ff4d4d",
  padding: "5px 12px",
  fontSize: "12px",
  borderRadius: "20px",
  cursor: "pointer",
  transition: "0.3s",
  width: "auto",
};

const btnHover = (e) => {
  e.target.style.background = "#ff4d4d";
  e.target.style.color = "#fff";
};

const btnLeave = (e) => {
  e.target.style.background = "transparent";
  e.target.style.color = "#ff4d4d";
};

const cards = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const card = (dark) => ({
  flex: 1,
  background: dark ? "#1e293b" : "#fff",
  color: dark ? "#fff" : "#000",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  transition: "0.3s",
  cursor: "pointer",
});

const cardHover = (e) => {
  e.currentTarget.style.transform = "scale(1.05)";
};

const cardLeave = (e) => {
  e.currentTarget.style.transform = "scale(1)";
};

export default Dashboard;