import { useState } from "react";
import API from "../services/app.js";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await API.post("/auth/forgot-password",{email});

      alert("OTP sent to your email");

      navigate("/verify-otp",{state:{email}});

    }
    catch(err){
      alert(err.response?.data?.message || "Failed to send OTP");
    }

  };

  return(

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{background:"linear-gradient(135deg,#e3f2fd,#ffffff)"}}
    >

      <div className="card p-4 shadow" style={{width:"360px"}}>

        <h3 className="text-center mb-3">Forgot Password</h3>

        <p className="text-center text-muted" style={{fontSize:"14px"}}>
          Enter your registered email to receive OTP
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Send OTP
          </button>

        </form>

        <div className="text-center">
          <Link to="/">Back to Login</Link>
        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;