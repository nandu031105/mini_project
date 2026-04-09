// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Home from "./pages/Home";
// import Tasks from "./pages/Tasks";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useAuth } from "./context/AuthContext";
// import "./App.css";
// import Progress from "./pages/Progress";
// import AISuggestions from "./pages/AISuggestions";

import { BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import Progress from "./pages/Progress";
import AISuggestions from "./pages/AISuggestions";
import PageNotFound from "./pages/PageNotFound";



function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/signin" />} />
        <Route path="/progress" element={user ? <Progress /> : <Navigate to="/signin" />} />
        <Route path="/ai" element={user ? <AISuggestions /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;