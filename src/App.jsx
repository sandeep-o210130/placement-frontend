import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadTheme } from "./utils/theme";

import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/ProfileForm";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOtp";
import Analysis from "./pages/Analysis";
import History from "./pages/History";

function App() {

  useEffect(()=>{
    loadTheme();
  },[]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;