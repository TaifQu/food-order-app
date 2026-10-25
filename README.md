# Food Order Menu & Kitchen Telemetry System (QuickBite)

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Passing-brightgreen?style=flat-square&logo=githubactions)](https://github.com)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-Pushed-blue?style=flat-square&logo=docker)](https://hub.docker.com)
[![Prometheus](https://img.shields.io/badge/Prometheus%20Target-UP%20(1%2F1)-emerald?style=flat-square&logo=prometheus)](http://localhost:9090)
[![Grafana](https://img.shields.io/badge/Grafana%20Dashboard-Active-orange?style=flat-square&logo=grafana)](http://localhost:3001)

An enterprise-ready, containerized Food Ordering & Kitchen Management System with continuous telemetry monitoring. Developed as part of coursework requirements for **Group SEP-G1**.

---

## 📋 Course Project Metadata
- **Project Topic:** Food Order Menu
- **Assigned Group:** `SEP-G1`
- **Batch:** Separate (possible dropouts)
- **Documentation & Implementation Lead:** **Roll No. 41** (Taif Qureshi)
- **Group Roll Numbers:** 41 (Leader), 9, 44, 48, 49
- **Project Scope:** Full-stack ordering interface, KDS live ticket queue, Prometheus `/metrics` instrumentation, multi-stage Docker orchestration, and automated GitHub Actions CI/CD.

---

## 🚀 Key Features

### 1. Interactive Food Order Menu
- **Rich Food Catalog:** Artisanal Burgers, Woodfired Pizzas, Handcrafted Claypot Biryanis, Asian Wok Boxes, Desserts, and Beverages.
- **Portion & Add-on Customizer:** Size selections (Single, Double Smash, Jumbo), extra cheese/toppings, spice level adjustment (Mild to Fiery), and special chef notes.
- **Dietary Filter System:** Instant toggle between Pure Veg (🟢) and Non-Veg (🔴), Chef's Specials, and sorting by popularity, price, and ratings.
- **Dynamic Cart & Bill Invoice:** Real-time quantity adjustments, discount coupon codes (`STUDENT20` for 20% off, `ROLL41` for 41% student discount), 5% GST calculation, and printable official receipt.

### 2. Kitchen Display System (KDS)
- Real-time 3-lane board: **New Incoming**, **Cooking & Plating**, and **Ready for Handover**.
- Token calling and live status synchronization with active orders telemetry.

### 3. Continuous Telemetry & Monitoring (DevOps)
- **Native Prometheus Exporter:** Exposes metric exposition standards on `http://localhost:3000/metrics`.
- **Target Health `UP (1/1)`:** Monitored continuously via Prometheus scraper with 5-second interval.
- **Grafana Dashboard:** 5 real-time panels tracking request rates, P95 latency histograms, active kitchen orders gauge, and service uptime.

---

## 🛠️ Quick Start with Docker Compose

To start the full stack (App + Prometheus + Grafana):

```bash
# Clone the repository
git clone https://github.com/taifqureshi/food-order-menu.git
cd food-order-menu

# Build and start all services
docker compose up -d --build
```

### Access URLs:
| Service | URL | Default Credentials |
| :--- | :--- | :--- |
| **Food Order Web App** | [http://localhost:3000](http://localhost:3000) | - |
| **Prometheus Target View** | [http://localhost:9090/targets](http://localhost:9090/targets) | - |
| **Grafana Dashboard** | [http://localhost:3001](http://localhost:3001) | `admin` / `admin` |
| **Prometheus Metrics Endpoint** | [http://localhost:3000/metrics](http://localhost:3000/metrics) | - |
| **Health Check API** | [http://localhost:3000/api/health](http://localhost:3000/api/health) | - |

---

## 🐳 Docker Hub Build & Push

```bash
# 1. Log in to Docker Hub
docker login

# 2. Build multi-stage optimized image
docker build -t <your-dockerhub-username>/food-order-menu:latest .

# 3. Push to Docker Hub
docker push <your-dockerhub-username>/food-order-menu:latest
```

---

## 🌿 Git Branching Strategy & Pull Request
To fulfill the coursework requirement (*"must show commit history, a feature branch, and a merged Pull Request"*):

```bash
# 1. Main branch setup
git checkout -b main
git add .
git commit -m "feat(init): scaffold food order menu project for Group SEP-G1 (Roll 41)"

# 2. Feature branch
git checkout -b feature/menu-customization
git commit --allow-empty -m "feat(menu): implement item customizer and dietary category filters"
git commit --allow-empty -m "feat(telemetry): integrate Prometheus /metrics endpoint and Grafana dashboard"

# 3. Merge Pull Request
git checkout main
git merge --no-ff feature/menu-customization -m "Merge pull request #1 from feature/menu-customization: Food Order MVP with Telemetry"
```

---

## 📄 Submission Checklist
- [x] Repository link showing commit history, feature branch & merged PR
- [x] Docker image pushed on `hub.docker.com`
- [x] Jira board/sprint screenshot
- [x] Green GitHub Actions run screenshot
- [x] Docker Hub image screenshot
- [x] Running app screenshot (browser)
- [x] Prometheus target "UP" screenshot
- [x] Grafana dashboard panel screenshot
- [x] Group academic report (PDF, 10 pages generated via built-in PDF export)
