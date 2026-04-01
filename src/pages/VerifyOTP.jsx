import { useState } from "react";
import API from "../services/app.js";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP(){

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp,setOtp] = useState(["","","","","",""]);

  const handleChange = (value,index)=>{

    if(isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < 5){
      document.getElementById(`otp-${index+1}`).focus();
    }

  };

  const handleKeyDown = (e,index)=>{

    if(e.key === "Backspace" && !otp[index] && index > 0){
      document.getElementById(`otp-${index-1}`).focus();
    }

  };

  const handlePaste = (e)=>{

    const paste = e.clipboardData.getData("text");

    if(paste.length === 6 && !isNaN(paste)){

      const newOtp = paste.split("");
      setOtp(newOtp);

      document.getElementById("otp-5").focus();

    }

  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const finalOtp = otp.join("");

    try{

      await API.post("/auth/verify-otp",{
        email,
        otp:finalOtp
      });

      alert("OTP Verified");

      navigate("/reset-password",{state:{email}});

    }
    catch(err){
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return(

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{background:"linear-gradient(135deg,#e3f2fd,#ffffff)"}}
    >

      <div className="card shadow p-4" style={{width:"380px"}}>

        <h3 className="text-center mb-3">Verify OTP</h3>

        <p className="text-center text-muted">
          Enter the 6 digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>

          <div 
            className="d-flex justify-content-between mb-3"
            onPaste={handlePaste}
          >

            {otp.map((digit,index)=>(
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="form-control text-center"
                style={{width:"45px",fontSize:"20px"}}
                value={digit}
                onChange={(e)=>handleChange(e.target.value,index)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
              />
            ))}

          </div>

          <button className="btn btn-primary w-100">
            Verify OTP
          </button>

        </form>

      </div>

    </div>

  );

}

export default VerifyOTP;