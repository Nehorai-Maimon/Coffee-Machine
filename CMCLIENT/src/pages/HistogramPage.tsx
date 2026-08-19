import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HistogramPage() {
  const [chartData, setChartData] = useState<any>(null);
  
  // הסטייט החדש שאחראי על הפעלת האנימציה מחדש
  const [chartKey, setChartKey] = useState(0);

  const fetchHistogram = async () => {
    try {
      const response = await api.get("/reports/histogram");
      const { labels, data } = response.data;

      setChartData({
        labels,
        datasets: [
          {
            label: "Coffee Orders Count",
            data: data,
            backgroundColor: "rgba(59, 130, 246, 0.6)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch histogram", error);
    }
  };

  useEffect(() => {
    fetchHistogram();
  }, []);

  // הפונקציה שמופעלת בלחיצה על הכפתור
  const handleReload = () => {
    setChartKey(prev => prev + 1); // שינוי המפתח מכריח את הגרף להצטייר מחדש
    fetchHistogram();
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Orders Histogram 📊</h1>
        <button 
          onClick={handleReload}
          style={{ 
            padding: '8px 16px', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Reload Data
        </button>
      </div>

      <section
        style={{
          background: "#f4f4f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3>Employee Orders Histogram</h3>
        {chartData ? (
          <Bar
            key={chartKey} /* הוספנו את המפתח לכאן */
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </section>
    </div>
  );
}