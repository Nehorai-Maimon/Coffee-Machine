import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface IOrder {
  _id: string;
  name: string;
  title: string;
  coffeeType: string;
  sugar: number;
  milk: string;
  status: string;
  done: boolean;
  createdAt: string;
}

export default function OrdersPage() {
  // form fields
  const [name, setName] = useState('');
  const [title, setTitle] = useState<'Employee' | 'Boss'>('Employee');
  const [password, setPassword] = useState('');
  const [timePreference, setTimePreference] = useState<'Now' | 'Later'>('Now');
  const [delayMinutes, setDelayMinutes] = useState<number | ''>('');

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // GET all orders
  const fetchOrders = async () => {
    try {
      const response = await api.get<IOrder[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // fetch every 3 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/orders', {
        name,
        title,
        password: title === 'Boss' ? password : undefined,
        delayMinutes: timePreference === "Now"? 0 : Number(delayMinutes)
      });

      setMessage('✅ ההזמנה נשלחה בהצלחה לתור!');
      setName('');
      setPassword('');
      setDelayMinutes('');
      setTimePreference('Now');
      fetchOrders(); // רענון מיידי של הרשימה
    } catch (err: any) {
      setMessage(`❌ שגיאה: ${err.response?.data?.error || 'שליחת ההזמנה נכשלה'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Coffee Machine ☕</h1>

      {/* טופס הזמנה */}
      <section style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>הזמן קפה חדש</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>שם: </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="שם המזמין"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          {/* תוקן ל-Radio Buttons */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>תפקיד: </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label>
                <input 
                  type="radio" 
                  value="Employee" 
                  checked={title === 'Employee'} 
                  onChange={() => setTitle('Employee')} 
                />
                Employee
              </label>
              <label>
                <input 
                  type="radio" 
                  value="Boss" 
                  checked={title === 'Boss'} 
                  onChange={() => setTitle('Boss')} 
                />
                Boss
              </label>
            </div>
          </div>

          {title === 'Boss' && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>סיסמת מנהל: </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="הזן סיסמת בוס"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          )}

          {/* חדש: בחירת זמן קפה עם Radio Buttons */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>זמן הכנה: </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label>
                <input 
                  type="radio" 
                  value="Now" 
                  checked={timePreference === 'Now'} 
                  onChange={() => setTimePreference('Now')} 
                />
                Now
              </label>
              <label>
                <input 
                  type="radio" 
                  value="Later" 
                  checked={timePreference === 'Later'} 
                  onChange={() => setTimePreference('Later')} 
                />
                Later
              </label>
            </div>
          </div>

          {/* תוקן: מופיע רק אם נבחר Later, עם מינימום 1 וחובה */}
          {timePreference === 'Later' && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>השהייה (דקות): </label>
              <input 
                type="number" 
                min="1" 
                required
                value={delayMinutes} 
                onChange={(e) => setDelayMinutes(Number(e.target.value))} 
                placeholder="הזן מספר דקות"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
          >
            {loading ? 'שולח...' : 'שלח הזמנה'}
          </button>
        </form>

        {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
      </section>

      {/* רשימת ההזמנות החיה */}
      <section>
        <h3>תור והיסטוריית הזמנות</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', background: '#f9fafb' }}>
              <th style={{ padding: '8px' }}>שם</th>
              <th style={{ padding: '8px' }}>תפקיד</th>
              <th style={{ padding: '8px' }}>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{order.name}</td>
                <td style={{ padding: '8px' }}>{order.title === 'Boss' ? '👑 Boss' : 'Employee'}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: order.status === 'ready' ? '#dcfce7' : '#fef3c7',
                    color: order.status === 'ready' ? '#15803d' : '#b45309'
                  }}>
                    {order.status === 'ready' ? '✅ Ready' : '⏳ Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}