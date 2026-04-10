import GlassBackground from "../components/GlassBackground";
import { useState } from "react";
import { createUserWithEmailAndPassword,signOut,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error,setError] = useState("")
  const navigate = useNavigate();
  
  const handleSignup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: userName
    });
    await signOut(auth);
    alert("Account created! Please log in.");
    navigate("/signin");
  } catch (error) {
    alert(error.message);
  }
};
  return (
    <div className="home-container">
      
<GlassBackground /> 

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
        <h2 className="welcome-title text-primary">Sign Up</h2>
<input
  type="text"
  className="form-control mb-3"
  placeholder="Username"
  autoComplete="off"
  name="username"
  onChange={(e) => setUserName(e.target.value)}
/>
        <input
          type="email"
          className="form-control mb-3"
          placeholder=" enter Email"
          autoComplete="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        
<div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    className="form-control mb-4"
    placeholder="Password"
    autoComplete="new-password"
    name="password"
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
        <button className="signout-btn bg-primary" onClick={handleSignup}>
          Create Account
        </button>
        <p style={{
           marginTop: "16px",
           fontSize: "0.88rem",
           color: "rgba(255,255,255,0.45)",
           fontFamily: "'Outfit', sans-serif"
        }}>
        Already have an account?{" "}
        <span
           onClick={() => navigate("/signin")}
       style={{
         color: "#7eb3ff",
         cursor: "pointer",
         fontWeight: 600,
         transition: "color 0.2s"
        }}
       onMouseEnter={e => e.target.style.color = "#fff"}
       onMouseLeave={e => e.target.style.color = "#7eb3ff"}>Sign In</span>
      </p>
    </div>
    </div>
  );
};

export default SignUp;