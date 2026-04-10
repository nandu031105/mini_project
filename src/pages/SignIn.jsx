import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";
import GlassBackground from "../components/GlassBackground";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="home-container">
    <GlassBackground/>  
      <div className="home-box">
        <p style={{
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#7eb3ff",
    marginBottom: "16px"
  }}>
    📚 StudySync AI
  </p>
        <h2 className="welcome-title">Sign In</h2>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      
      
<div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    className="form-control mb-4"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    style={{ paddingRight: "45px" }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "1.1rem",
      color: "rgba(255,255,255,0.5)",
      userSelect: "none",
      marginTop: "-8px"
    }}
  >
    {showPassword ? "🔓" : "🔒"}
  </span>
</div>
        <button className="signout-btn" onClick={handleSignin}>
          Login
        </button>
         <p style={{
  marginTop: "16px",
  fontSize: "0.88rem",
  color: "rgba(255,255,255,0.45)",
  fontFamily: "'Outfit', sans-serif"
}}>
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/")}
    style={{
      color: "#7eb3ff",
      cursor: "pointer",
      fontWeight: 600
    }}
    onMouseEnter={e => e.target.style.color = "#fff"}
    onMouseLeave={e => e.target.style.color = "#7eb3ff"}
  >
    Sign Up
  </span>
</p>
      </div>
    </div>
  );
};

export default SignIn;