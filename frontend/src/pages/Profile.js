import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={card}>

        <div style={avatar}>👤</div>

        <h2>Profile</h2>

        <div style={infoBox}>
          <p style={label}>Email</p>
          <p style={value}>{email || "Not Available"}</p>
        </div>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* styles */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9",
};

const card = {
  width: "340px",
  padding: "30px",
  borderRadius: "12px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const avatar = {
  fontSize: "42px",
  marginBottom: "10px",
};

const infoBox = {
  background: "#f8fafc",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const label = {
  fontSize: "12px",
  color: "#888",
};

const value = {
  fontSize: "16px",
  fontWeight: "500",
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Profile;