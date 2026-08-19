import React, { useState } from 'react';
import api from '../api/axios';
import * as XLSX from 'xlsx';

export default function ReportsPage() {
  // Default to current month and year
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const handleDownloadExcel = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/reports/monthly?month=${month}&year=${year}`);
      const orders = response.data;

      if (orders.length === 0) {
        alert('No orders found for this month.');
        setLoading(false);
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      XLSX.writeFile(workbook, `Coffee_Report_${month}_${year}.xlsx`);
    } catch (error) {
      console.error('Failed to download report', error);
      alert('Error downloading the report.');
    } finally {
      setLoading(false);
    }
  };

  // Reusable styles for a clean UI
  const inputStyle: React.CSSProperties = {
    width: '100px',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
    background: 'white'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#334155'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#0f172a' }}>
      <h1 style={{ textAlign: 'center', color: '#0369a1', marginBottom: '30px' }}>Manager Reports 📊</h1>

      <section style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <h3 style={{ marginTop: 0, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px', marginBottom: '20px' }}>
          Download Monthly Report (Excel)
        </h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={labelStyle}>Month:</label>
            <select 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
              style={inputStyle}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={labelStyle}>Year:</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
          
          <button 
            onClick={handleDownloadExcel}
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              background: loading ? '#94a3b8' : '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'background 0.2s'
            }}
          >
            📥 {loading ? 'Downloading...' : 'Download Excel File'}
          </button>
        </div>
      </section>
    </div>
  );
}