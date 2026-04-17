import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const res = await axios.post(
  "https://user-management-system-zxg7.onrender.com/api/auth/login",
  { email, password }
);


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={btn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#eef2ff",
};

const card = {
  width: "300px",
  padding: "25px",
  background: "#fff",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "#fff",
};

export default Login;