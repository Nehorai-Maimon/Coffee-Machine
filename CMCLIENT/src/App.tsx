import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import ReportsPage from './pages/ReportsPage';
import HistogramPage from './pages/HistogramPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/order" style={{ marginRight: '15px' }}>Order</Link>
          <Link to="/reports" style={{ marginRight: '15px' }}>Reports</Link>
          <Link to="/histogram">Histogram</Link>
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