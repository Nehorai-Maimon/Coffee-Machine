import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ReportsPage from './pages/ReportsPage';
import HistogramPage from './pages/HistogramPage';

function App() {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 10px', 
    borderRadius: '8px',
    fontWeight: 'bold',
    color: isActive ? '#ffffff' : '#4b5563',
    backgroundColor: isActive ? '#3b82f6' : '#e5e7eb',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  });

  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '10px',
          padding: '20px', 
          background: '#f8fafc', 
          borderRadius: '12px', 
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <NavLink to="/" style={navLinkStyle}>🏠 Home Page</NavLink>
          <NavLink to="/order" style={navLinkStyle}>☕ Orders Page</NavLink>
          <NavLink to="/reports" style={navLinkStyle}>📥 Excel Reports</NavLink>
          <NavLink to="/histogram" style={navLinkStyle}>📊 Histogram</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/histogram" element={<HistogramPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;