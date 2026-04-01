import { useNavigate } from "react-router-dom";
import { applyTheme } from "./utils/theme";
import { useState, useEffect } from "react";

import {
  FaUserGraduate,
  FaChartLine,
  FaHistory,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from "react-icons/fa";

function Dashboard(){

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const username = params.get("name") || localStorage.getItem("username") || "Student";

  const [theme,setTheme] = useState("light");

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name) {
      localStorage.setItem("username", name);
    }

    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  },[]);

  const toggleTheme = ()=>{
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  const logout = ()=>{
    localStorage.removeItem("token");
    navigate("/");
  };

  return(

    <div style={{display:"flex",minHeight:"100vh"}}>

      {/* SIDEBAR */}

      <div
        style={{
          width:"220px",
          background:"var(--card-bg)",
          padding:"30px 20px",
          boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
        }}
      >

        <h4 style={{marginBottom:"40px"}}>
          🎓 Placement AI
        </h4>

        <div
          style={{marginBottom:"20px",cursor:"pointer"}}
          onClick={()=>navigate("/profile")}
        >
          <FaUserGraduate/> Student Data
        </div>

        <div
          style={{marginBottom:"20px",cursor:"pointer"}}
          onClick={()=>navigate("/analysis")}
        >
          <FaChartLine/> Analysis
        </div>

        <div
          style={{marginBottom:"20px",cursor:"pointer"}}
          onClick={()=>navigate("/history")}
        >
          <FaHistory/> History
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div style={{flex:1}}>

        {/* TOP BAR */}

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"15px 40px",
            background:"var(--card-bg)",
            boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <b>Welcome {username}</b>

          <div>

            <button
                onClick={toggleTheme}
                style={{
                    marginRight:"15px",
                    border:"none",
                    fontSize:"18px",
                    background:"transparent",
                    cursor:"pointer",
                    color: theme === "dark" ? "white" : "black"
                }}>  {theme === "light" ? <FaMoon/> : <FaSun/>}
            </button>

            <button
              onClick={logout}
              style={{
                border:"none",
                background:"#e74c3c",
                color:"white",
                padding:"6px 12px",
                borderRadius:"6px",
                cursor:"pointer"
              }}
            >
              <FaSignOutAlt/> Logout
            </button>

          </div>

        </div>


        {/* DASHBOARD CARDS */}

        <div style={{padding:"50px"}}>

          <h2 style={{marginBottom:"40px"}}>
            Smart Placement Dashboard
          </h2>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
              gap:"30px"
            }}
          >

            {/* Student Data */}

            <div
              onClick={()=>navigate("/profile")}
              style={{
                background:"var(--card-bg)",
                padding:"30px",
                borderRadius:"10px",
                cursor:"pointer",
                boxShadow:"0 5px 20px rgba(0,0,0,0.15)"
              }}
            >
              <FaUserGraduate size={35}/>
              <h4 style={{marginTop:"15px"}}>
                Upload Student Data
              </h4>
              <p>Enter CGPA, skills, projects</p>
            </div>


            {/* Analysis */}

            <div
              onClick={()=>navigate("/analysis")}
              style={{
                background:"var(--card-bg)",
                padding:"30px",
                borderRadius:"10px",
                cursor:"pointer",
                boxShadow:"0 5px 20px rgba(0,0,0,0.15)"
              }}
            >
              <FaChartLine size={35}/>
              <h4 style={{marginTop:"15px"}}>
                Readiness Analysis
              </h4>
              <p>See placement readiness score</p>
            </div>


            {/* History */}


            <div
              onClick={()=>navigate("/history")}
              style={{
                  background:"var(--card-bg)",
                  padding:"50px 30px",
                  borderRadius:"10px",
                  cursor:"pointer",
                  boxShadow:"0 5px 20px rgba(0,0,0,0.15)",
                  gridColumn: "1 / -1",
                  justifySelf: "center",
                  maxWidth: "300px",
                  minHeight: "220px"
              }}
            >
              <FaHistory size={35}/>
              <h4 style={{marginTop:"15px"}}>
                Progress History
              </h4>
              <p>Track readiness improvement</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;