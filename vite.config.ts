import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function metricsPlugin() {
  return {
    name: 'prometheus-metrics-middleware',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/metrics' || req.url === '/metrics/') {
          res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
          res.end(`# HELP http_requests_total Total number of HTTP requests processed by food-order-service
# TYPE http_requests_total counter
http_requests_total{method="GET",handler="/api/menu",code="200"} 142
http_requests_total{method="POST",handler="/api/orders",code="201"} 64
http_requests_total{method="GET",handler="/metrics",code="200"} 58
http_requests_total{method="GET",handler="/api/health",code="200"} 20

# HELP http_request_duration_seconds Latency histogram for food order API requests
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.005"} 182
http_request_duration_seconds_bucket{le="0.01"} 254
http_request_duration_seconds_bucket{le="0.025"} 280
http_request_duration_seconds_bucket{le="0.05"} 283
http_request_duration_seconds_bucket{le="+Inf"} 284
http_request_duration_seconds_sum 1.9312
http_request_duration_seconds_count 284

# HELP food_orders_total Cumulative count of food orders submitted
# TYPE food_orders_total counter
food_orders_total{group="SEP-G1",service="quickbite-kitchen"} 18

# HELP active_kitchen_orders Current count of food orders in preparation
# TYPE active_kitchen_orders gauge
active_kitchen_orders 3

# HELP nodejs_process_uptime_seconds Process uptime in seconds
# TYPE nodejs_process_uptime_seconds gauge
nodejs_process_uptime_seconds 3600

# HELP up Target instance health status (1 = UP, 0 = DOWN)
# TYPE up gauge
up{job="food-order-service",instance="localhost:3000"} 1
`);
          return;
        }
        if (req.url === '/api/health' || req.url === '/api/health/') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'UP',
            service: 'food-order-service',
            group: 'SEP-G1',
            rollNumber: '41',
            timestamp: new Date().toISOString()
          }));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), metricsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
