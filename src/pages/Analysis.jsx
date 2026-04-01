import { useEffect, useState } from "react";
import API from "./services/app.js";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";

function Analysis() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const load = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Dashboard Data:", res.data); 

        setData(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    load();

  }, []);

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h3>Loading Analysis...</h3>
      </div>
    );
  }

  const score = data?.readiness?.score || 0;
  const status = data?.readiness?.status || "Not analyzed";

  const getColor = (score) => {
    if (score <= 60) return "#ff4d4f";
    if (score <= 75) return "#faad14";
    return "#52c41a";
  };


  const radarData = [
    { skill: "DSA", value: data?.profile?.dsaScore || 0 },
    { skill: "Aptitude", value: data?.profile?.aptitudeLevel || 0 },
    { skill: "Communication", value: data?.profile?.communicationLevel || 0 },
    { skill: "Projects", value: Math.min((data?.profile?.projects || 0) * 20, 100) }
  ];

  console.log("Radar Data:", radarData); 
  console.log("PROFILE:", data.profile);
  return (
    <div style={{
      minHeight: "100vh",
      padding: "60px",
      background: "var(--bg-color)",
      color: "var(--text-color)"
    }}>

      <h2 style={{ textAlign: "center", marginBottom: "60px" }}>
        Placement Readiness Analysis
      </h2>

      <div style={{
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center"
      }}>

        <div style={{ width: "220px", margin: "0 auto" }}>
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={{
              path: { stroke: getColor(score) },
              text: { fill: getColor(score) }
            }}
          />
        </div>

        <h3 style={{ marginTop: "20px" }}>
          Status: {status}
        </h3>

      </div>

      <div style={{
        marginTop: "80px",
        textAlign: "center"
      }}>

        <h3>Skill Distribution</h3>

        <RadarChart
          width={500}
          height={350}
          outerRadius={120} 
          data={radarData}
          style={{ margin: "0 auto" }}
        >

          <PolarGrid />

          <PolarAngleAxis dataKey="skill" />

          <Radar
            dataKey="value"
            stroke="#4A90E2"
            fill="#4A90E2"
            fillOpacity={0.6}
          />

        </RadarChart>

      </div>

    </div>
  );
}

export default Analysis;