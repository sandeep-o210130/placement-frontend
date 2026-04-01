import { useState } from "react";
import API from "../services/app.js";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [show,setShow] = useState(false);

  const [form, setForm] = useState({
    loginId: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      navigate("/dashboard");

    }
    catch(err){
      alert(err.response?.data?.message || "Login failed");
    }

  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <div className="card main-card p-4 shadow" style={{width:"360px"}}>

        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="loginId"
              placeholder="Email or Username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD FIELD WITH EYE */}

          <div className="mb-2 position-relative">

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

          <div className="text-end mb-3">
            <Link to="/forgot-password" style={{fontSize:"14px"}}>
              Forgot password?
            </Link>
          </div>

          <button className="btn primary-btn w-100 text-white mb-3">
            Login
          </button>

        </form>

        {/* Register Link */}

        <div className="text-center">

          <span style={{fontSize:"14px"}}>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </span>

        </div>

      </div>

    </div>

  );

}

export default Login;