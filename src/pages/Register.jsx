import { useState } from "react";
import API from "../services/app.js";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [show,setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/dashboard");

    }
    catch(err){
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{background:"linear-gradient(135deg,#e3f2fd,#ffffff)"}}
    >

      <div className="card p-4 shadow" style={{width:"370px"}}>

        <h3 className="text-center mb-3">Register</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD WITH EYE TOGGLE */}

          <div className="mb-3 position-relative">

            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
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
              onClick={()=>setShow(!show)}
            >
              {show ? "🙈" : "👁"}
            </span>

          </div>

          <button className="btn btn-primary w-100 mb-3">
            Register
          </button>

        </form>

        {/* OR Divider */}

        <div className="text-center my-3 position-relative">

          <hr />

          <span
            className="bg-white px-2"
            style={{
              position:"absolute",
              top:"-12px",
              left:"50%",
              transform:"translateX(-50%)"
            }}
          >
            OR
          </span>

        </div>

        {/* Google Button */}

        <button
          className="btn btn-light border w-100 d-flex align-items-center justify-content-center mb-3"
          onClick={() => window.location.href = "http://localhost:5000/auth/google"}
        >

          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            width="20"
            className="me-2"
          />

          Continue with Google

        </button>

        {/* Login link */}

        <div className="text-center">

          <span style={{fontSize:"14px"}}>
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </span>

        </div>

      </div>

    </div>

  );

}

export default Register;