## 🛠️ Turn On
docker-compose up -d --build

## 🛠️ Technologies
**Client (Frontend):** React (Vite), TypeScript, React Router, Axios, Chart.js, SheetJS (xlsx).
**Server (Backend):** Node.js, Express, TypeScript, Mongoose.
**Databases & Queues:** MongoDB, Redis, BullMQ.
**Infrastructure:** Docker & Docker Compose.

## 📁 Project Structure

Coffee-Machine/
│
├── CMCLIENT/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/               # Axios configuration for server communication
│   │   ├── pages/             # System pages (Home, Orders, Reports, Histogram)
│   │   ├── App.tsx            # Routing and main navigation bar
│   │   └── main.tsx           # Application entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile             # Frontend container build settings
│
├── CMSERVER/                  # Backend (Node.js + Express)
│   ├── src/
│   │   ├── models/            # MongoDB models (e.g., Order.ts)
│   │   ├── controllers/       # Route logic
│   │   ├── workers/           # BullMQ Worker configurations
│   │   └── index.ts           # Entry point and database connections
│   ├── .env                   # Environment variables (passwords, ports)
│   ├── package.json
│   └── Dockerfile             # Backend container build settings
│
└── docker-compose.yml         # Main orchestration file for the entire system