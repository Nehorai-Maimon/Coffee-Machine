import React, { useState, useEffect } from "react";
import api from "../api/axios";

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
  const [name, setName] = useState("");
  const [title, setTitle] = useState<"Employee" | "Boss">("Employee");
  const [password, setPassword] = useState("");
  const [timePreference, setTimePreference] = useState<"Now" | "Later">("Now");
  const [delayMinutes, setDelayMinutes] = useState<number | "">("");

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await api.get<IOrder[]>("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/orders", {
        name,
        title,
        password: title === "Boss" ? password : undefined,
        delayMinutes: timePreference === "Now" ? 0 : Number(delayMinutes),
      });

      setMessage("✅ Order successfully added to the queue!");

      setName("");
      setPassword("");
      setDelayMinutes("");
      setTimePreference("Now");
      fetchOrders();
    } catch (err: any) {
      setMessage(
        `❌ Error: ${err.response?.data?.error || "Failed to submit order"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#334155",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "#0369a1", marginBottom: "30px" }}
      >
        Coffee Machine ☕
      </h1>

      <section
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: "#1e293b",
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: "10px",
          }}
        >
          Place a New Coffee Order
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "20px", marginTop: "20px" }}
        >
          <div>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Role:</label>
            <div
              style={{
                display: "flex",
                gap: "20px",
                background: "#f8fafc",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  type="radio"
                  value="Employee"
                  checked={title === "Employee"}
                  onChange={() => setTitle("Employee")}
                />
                Employee
              </label>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: title === "Boss" ? "bold" : "normal",
                }}
              >
                <input
                  type="radio"
                  value="Boss"
                  checked={title === "Boss"}
                  onChange={() => setTitle("Boss")}
                />
                Boss 👑
              </label>
            </div>
          </div>

          {title === "Boss" && (
            <div>
              <label style={labelStyle}>Manager Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter boss password"
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Preparation Time:</label>
            <div
              style={{
                display: "flex",
                gap: "20px",
                background: "#f8fafc",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  type="radio"
                  value="Now"
                  checked={timePreference === "Now"}
                  onChange={() => setTimePreference("Now")}
                />
                Now
              </label>
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  type="radio"
                  value="Later"
                  checked={timePreference === "Later"}
                  onChange={() => setTimePreference("Later")}
                />
                Later
              </label>
            </div>
          </div>

          {timePreference === "Later" && (
            <div>
              <label style={labelStyle}>Delay (minutes):</label>
              <input
                type="number"
                min="1"
                required
                value={delayMinutes}
                onChange={(e) => setDelayMinutes(Number(e.target.value))}
                placeholder="Enter delay in minutes"
                style={inputStyle}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              background: loading ? "#94a3b8" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "6px",
              background: message.includes("✅") ? "#dcfce7" : "#fee2e2",
              color: message.includes("✅") ? "#166534" : "#991b1b",
              fontWeight: "bold",
              border: `1px solid ${message.includes("✅") ? "#bbf7d0" : "#fecaca"}`,
            }}
          >
            {message}
          </div>
        )}
      </section>

      <section
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: "#1e293b",
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Queue & Order History
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "2px solid #e2e8f0",
                }}
              >
                <th style={{ padding: "12px", color: "#475569" }}>Name</th>
                <th style={{ padding: "12px", color: "#475569" }}>Role</th>
                <th style={{ padding: "12px", color: "#475569" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td style={{ padding: "12px", fontWeight: "500" }}>
                      {order.name}
                    </td>
                    <td style={{ padding: "12px" }}>
                      {order.title === "Boss" ? "👑 Boss" : "Employee"}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          background:
                            order.status === "ready"
                              ? "#dcfce7"
                              : order.status === "preparing"
                                ? "#e0e7ff"
                                : "#fef3c7",
                          color:
                            order.status === "ready"
                              ? "#15803d"
                              : order.status === "preparing"
                                ? "#4338ca"
                                : "#b45309",
                        }}
                      >
                        {order.status === "ready"
                          ? "✅ Ready"
                          : order.status === "preparing"
                            ? "⚙️ Preparing"
                            : "⏳ Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No orders in the queue yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
