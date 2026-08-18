import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as XLSX from 'xlsx';

// הגדרת הרכיבים של Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const [chartData, setChartData] = useState<any>(null);
  
  // ברירת המחדל תהיה החודש והשנה הנוכחיים
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // שליפת נתוני ההיסטוגרמה לגרף
  useEffect(() => {
    const fetchHistogram = async () => {
      try {
        const response = await api.get('/reports/histogram');
        const { labels, data } = response.data;
        
        setChartData({
          labels, 
          datasets: [
            {
              label: 'כמות הזמנות קפה',
              data: data, 
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
              borderColor: 'rgb(59, 130, 246)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch histogram', error);
      }
    };

    fetchHistogram();
  }, []);

  // הורדת קובץ אקסל חודשי
  const handleDownloadExcel = async () => {
    try {
      const response = await api.get(`/reports/monthly?month=${month}&year=${year}`);
      const orders = response.data;

      if (orders.length === 0) {
        alert('אין הזמנות בחודש זה.');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
      
      XLSX.writeFile(workbook, `Coffee_Report_${month}_${year}.xlsx`);
    } catch (error) {
      console.error('Failed to download report', error);
      alert('שגיאה בהורדת הדוח');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manager Reports 📊</h1>

      <section style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>היסטוגרמת הזמנות לעובד</h3>
        {chartData ? (
          <Bar 
            data={chartData} 
            options={{ 
              responsive: true,
              scales: {
                y: {
                  ticks: {
                    stepSize: 1 // מכריח את הגרף להציג רק מספרים שלמים
                  }
                }
              }
            }} 
          />
        ) : (
          <p>טוען נתונים...</p>
        )}
      </section>

      <section style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px' }}>
        <h3>הורדת דוח חודשי (Excel)</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>חודש: </label>
            {/* שינוי לתפריט נפתח כדי למנוע באגים בהקלדה */}
            <select 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
              style={{ width: '80px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>שנה: </label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button 
            onClick={handleDownloadExcel}
            style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📥 הורד קובץ Excel
          </button>
        </div>
      </section>
    </div>
  );
}