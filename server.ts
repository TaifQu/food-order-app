import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import client from 'prom-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ----------------------------------------------------
// Prometheus Metrics Registry Setup
// ----------------------------------------------------
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'food_order_' });

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests processed by food order menu service',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
  registers: [register],
});

const foodOrdersTotal = new client.Counter({
  name: 'food_orders_total',
  help: 'Total food orders submitted',
  labelNames: ['order_type', 'status'],
  registers: [register],
});

const activeKitchenOrdersGauge = new client.Gauge({
  name: 'active_kitchen_orders',
  help: 'Current active orders in kitchen queue',
  registers: [register],
});

// Middleware for metrics tracking
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    httpRequestsTotal.inc({ method: req.method, route, status_code: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route, status_code: res.statusCode }, duration);
  });
  next();
});

// ----------------------------------------------------
// Prometheus Exporter Endpoint (Target for Prometheus Scraper)
// ----------------------------------------------------
app.get('/metrics', async (_req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'UP',
    service: 'food-order-service',
    group: 'SEP-G1',
    leadRollNumber: '41',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// In-memory food order storage
interface OrderRecord {
  id: string;
  items: any[];
  total: number;
  status: string;
  customerName: string;
  createdAt: string;
}

const memoryOrders: OrderRecord[] = [
  {
    id: 'ORD-4101',
    items: [{ name: 'Truffle Smash Cheeseburger', qty: 2 }],
    total: 498,
    status: 'kitchen_prep',
    customerName: 'Taif Qureshi (Roll 41)',
    createdAt: new Date().toISOString(),
  },
];

app.get('/api/orders', (_req, res) => {
  res.json(memoryOrders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: `ORD-${Date.now().toString().slice(-4)}`,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  memoryOrders.unshift(newOrder);
  foodOrdersTotal.inc({ order_type: req.body.orderType || 'takeaway', status: 'placed' });
  activeKitchenOrdersGauge.set(memoryOrders.filter((o) => o.status !== 'delivered').length);
  res.status(201).json(newOrder);
});

// Serve frontend dist in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Food Order System listening on port ${PORT}`);
  console.log(`Prometheus metrics available at http://localhost:${PORT}/metrics`);
});
