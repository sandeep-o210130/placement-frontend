import { useState } from "react";
import API from "./services/app.js";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword(){

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [showPass,setShowPass] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);

  const [form,setForm] = useState({
    password:"",
    confirmPassword:""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(form.password !== form.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try{

      await API.post("/auth/reset-password", {
        email,
        password: form.password
      });

      alert("Password reset successful");

      navigate("/");

    }
    catch(err){
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return(

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{background:"linear-gradient(135deg,#e3f2fd,#ffffff)"}}
    >

      <div className="card shadow p-4" style={{width:"380px"}}>

        <h3 className="text-center mb-3">Reset Password</h3>

        <form onSubmit={handleSubmit}>

          {/* NEW PASSWORD */}

          <div className="mb-3 position-relative">

            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="New Password"
              className="form-control"
              onChange={handleChange}
              required
            />

            <span
              style={{
                position:"absolute",
                right:"10px",
                top:"8px",
                cursor:"pointer",
                fontSize:"18px"
              }}
              onClick={()=>setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁"}
            </span>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="mb-3 position-relative">

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control"
              onChange={handleChange}
              required
            />

            <span
              style={{
                position:"absolute",
                right:"10px",
                top:"8px",
                cursor:"pointer",
                fontSize:"18px"
              }}
              onClick={()=>setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "🙈" : "👁"}
            </span>

          </div>

          <button className="btn btn-primary w-100">
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );

}

export default ResetPassword;