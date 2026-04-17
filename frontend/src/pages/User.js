import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("https://user-management-system-zxg7.onrender.com/");
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!email || !password) {
      setMessage("⚠️ Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", {
        email,
        password,
        role,
      });

      setMessage("✅ User Added");
      setEmail("");
      setPassword("");
      fetchUsers();

    } catch {
      setMessage("❌ Error adding user");
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={layout}>

      {/* 🔥 SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "20px" }}>⚡ Admin</h2>

        <p
          style={isActive("/dashboard") ? activeMenu : menu}
          onClick={() => navigate("/dashboard")}
        >
          🏠 Dashboard
        </p>

        <p
          style={isActive("/users") ? activeMenu : menu}
          onClick={() => navigate("/users")}
        >
          👥 Users
        </p>

        <p
          style={isActive("/profile") ? activeMenu : menu}
          onClick={() => navigate("/profile")}
        >
          👤 Profile
        </p>

        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={main}>

        {/* TOP BAR */}
        <div style={topbar}>
          <h2>Admin Panel 🚀</h2>
        </div>

        {/* ADD USER */}
        <div style={card}>
          <h3>Add New User</h3>

          <div style={row}>
            <input
              style={input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              style={input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button style={btn} onClick={addUser}>
            + Add User
          </button>

          {message && <p style={msg}>{message}</p>}
        </div>

        {/* USERS TABLE */}
        <div style={card}>
          <h3>All Users</h3>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={td}>{u.email}</td>

                  <td style={td}>
                    <span style={badge(u.role)}>
                      {u.role}
                    </span>
                  </td>

                  <td style={td}>
                    <button
                      style={deleteBtn}
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const layout = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Arial",
};

const sidebar = {
  width: "220px",
  background: "#111827",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const menu = {
  margin: "10px 0",
  cursor: "pointer",
};

const activeMenu = {
  margin: "10px 0",
  cursor: "pointer",
  background: "#1f2937",
  padding: "8px",
  borderRadius: "6px",
};

const logoutBtn = {
  marginTop: "auto",
  padding: "10px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const main = {
  flex: 1,
  padding: "20px",
  background: "#f8fafc",
};

const topbar = {
  marginBottom: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px",
  width: "100%",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "5px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const msg = {
  marginTop: "10px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "10px",
  background: "#e5e7eb",
  textAlign: "left",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const badge = (role) => ({
  background: role === "admin" ? "#7c3aed" : "#3b82f6",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
});

export default Users;