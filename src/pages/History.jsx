import { useEffect, useState } from "react";
import API from "./services/app.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const load = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/readiness/history", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const formatted = res.data.map(item => ({
          date: new Date(item.createdAt).toLocaleString(),
          score: item.readinessScore
        }));

        setHistory(formatted);

      } catch (err) {
        console.log(err);
      }

    };

    load();

  }, []);

  return (
    <div style={{
      padding: "60px",
      minHeight: "100vh",
      background: "var(--bg-color)",
      color: "var(--text-color)"
    }}>

      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        Readiness Progress History
      </h2>

      <LineChart
        width={800}
        height={400}
        data={history}
        key={history.length} 
        style={{ margin: "0 auto" }}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis domain={[0, 100]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#4A90E2"
          strokeWidth={3}
          dot={{ r: 6 }}
        />

      </LineChart>

    </div>
  );
}

export default History;