import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* תפריט הניווט העליון */}
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Orders</Link>
          <Link to="/reports">Reports</Link>
        </nav>

        {/* האזור שבו העמודים מתחלפים */}
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;