import React from 'react';

export default function HomePage() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px 20px', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#0369a1', 
        marginBottom: '15px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        Welcome to the Coffee System! ☕
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#475569', 
        maxWidth: '600px', 
        margin: '0 auto 40px auto', 
        lineHeight: '1.6' 
      }}>
        The office's smart order management system. Here you can order your coffee, manage the queue, and view employee consumption data in real-time.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        
        <div style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🚀</div>
          <h3 style={{ color: '#0f172a', marginBottom: '10px' }}>Quick Ordering</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Go to the orders page and send your request directly to the machine's queue.
          </p>
        </div>
        
        <div style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👑</div>
          <h3 style={{ color: '#0f172a', marginBottom: '10px' }}>VIP Priority</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Our smart queueing system automatically prioritizes Boss orders.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈</div>
          <h3 style={{ color: '#0f172a', marginBottom: '10px' }}>Reports & Tracking</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Export reports to Excel with a single click and view real-time usage histograms.
          </p>
        </div>

      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  width: '240px',
  textAlign: 'center',
};