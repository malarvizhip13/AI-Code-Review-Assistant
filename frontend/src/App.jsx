import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";
import ReviewHistory from "./pages/ReviewHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/code-review" element={<CodeReview />} />
        <Route path="/review-history" element={<ReviewHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;