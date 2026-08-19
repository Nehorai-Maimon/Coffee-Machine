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

  const handleReload = async () => {
    setChartData(null); 
    await fetchHistogram();
  };

  return (
    <div
      style={{
        maxWidth: "600px", 
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#0369a1' }}>Orders Histogram 📊</h1>
        <button 
          onClick={handleReload}
          style={{ 
            padding: '8px 16px', 
            background: '#10b981',
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
          🔄 Reload Data
        </button>
      </div>

      <section
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginTop: 0, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
          Employee Orders Histogram
        </h3>
        
        {chartData ? (
          <Bar
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
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>
            Loading data...
          </p>
        )}
      </section>
    </div>
  );
}