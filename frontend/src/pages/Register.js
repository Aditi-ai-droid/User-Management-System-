import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role: "admin", // 🔥 THIS LINE ADDED
      });

      alert("Registered Successfully ✅");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="main">

      {/* LEFT */}
      <div className="left">
        <h1>Join Us Today 🚀</h1>
        <p>Create your account and start your journey</p>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card">

          <h2>Create Account ✨</h2>

          <div className="input-box">
            <span>📧</span>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleRegister}>Register</button>

          <p style={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#4f46e5",
                cursor: "pointer",
                fontWeight: "600",
                position: "relative",
                zIndex: 10
              }}
            >
              Login
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;