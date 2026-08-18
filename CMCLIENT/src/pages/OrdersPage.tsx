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
  // נתוני הטופס
  const [name, setName] = useState('');
  const [title, setTitle] = useState<'Employee' | 'Boss'>('Employee');
  const [password, setPassword] = useState('');
  const [coffeeType, setCoffeeType] = useState('Espresso');
  const [sugar, setSugar] = useState(1);
  const [milk, setMilk] = useState('None');
  const [delayMinutes, setDelayMinutes] = useState(0);

  // רשימת ההזמנות וטעינה
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // פונקציה לשליפת ההזמנות מהשרת
  const fetchOrders = async () => {
    try {
      const response = await api.get<IOrder[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // טעינה ראשונית ורענון אוטומטי כל 3 שניות כדי לראות שינויי סטטוס חיים
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  // שליחת הזמנה חדשה
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.post('/orders', {
        name,
        title,
        password: title === 'Boss' ? password : undefined,
        coffeeType,
        sugar: Number(sugar),
        milk,
        delayMinutes: Number(delayMinutes)
      });

      setMessage('✅ ההזמנה נשלחה בהצלחה לתור!');
      setName('');
      setPassword('');
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
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
          <div>
            <label>שם: </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="שם המזמין"
            />
          </div>

          <div>
            <label>תפקיד: </label>
            <select value={title} onChange={(e) => setTitle(e.target.value as 'Employee' | 'Boss')}>
              <option value="Employee">Employee (עובד רגיל)</option>
              <option value="Boss">Boss 👑 (עדיפות גבוהה בתור)</option>
            </select>
          </div>

          {title === 'Boss' && (
            <div>
              <label>סיסמת מנהל: </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="הזן סיסמת בוס"
              />
            </div>
          )}

          <div>
            <label>סוג קפה: </label>
            <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)}>
              <option value="Espresso">Espresso</option>
              <option value="Cappuccino">Cappuccino</option>
              <option value="Latte">Latte</option>
              <option value="Americano">Americano</option>
            </select>
          </div>

          <div>
            <label>סוכר (כפיות): </label>
            <input 
              type="number" 
              min="0" 
              max="5" 
              value={sugar} 
              onChange={(e) => setSugar(Number(e.target.value))} 
            />
          </div>

          <div>
            <label>חלב: </label>
            <select value={milk} onChange={(e) => setMilk(e.target.value)}>
              <option value="None">ללא חלב</option>
              <option value="Regular">חלב רגיל</option>
              <option value="Soy">סויה</option>
              <option value="Oat">שיבולת שועל</option>
            </select>
          </div>

          <div>
            <label>השהייה (דקות): </label>
            <input 
              type="number" 
              min="0" 
              value={delayMinutes} 
              onChange={(e) => setDelayMinutes(Number(e.target.value))} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'שולח...' : 'שלח הזמנה'}
          </button>
        </form>

        {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      </section>

      {/* רשימת ההזמנות החיה */}
      <section>
        <h3>תור והיסטוריית הזמנות</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', background: '#f9fafb' }}>
              <th style={{ padding: '8px' }}>שם</th>
              <th style={{ padding: '8px' }}>תפקיד</th>
              <th style={{ padding: '8px' }}>קפה</th>
              <th style={{ padding: '8px' }}>סוכר/חלב</th>
              <th style={{ padding: '8px' }}>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{order.name}</td>
                <td style={{ padding: '8px' }}>{order.title === 'Boss' ? '👑 Boss' : 'Employee'}</td>
                <td style={{ padding: '8px' }}>{order.coffeeType}</td>
                <td style={{ padding: '8px' }}>{order.sugar} סוכר | {order.milk}</td>
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