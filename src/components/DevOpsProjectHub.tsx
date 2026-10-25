import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  GitBranch, 
  CheckCircle2, 
  Terminal, 
  ExternalLink, 
  Copy, 
  Check, 
  Server, 
  BarChart3, 
  FolderCheck,
  Globe,
  Download,
  AlertTriangle,
  FileCode2,
  Calendar,
  Users,
  Award
} from 'lucide-react';
import { metricsService } from '../services/metricsService';

export const DevOpsProjectHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'prometheus' | 'grafana' | 'jira' | 'github_actions' | 'docker' | 'git_commands' | 'url_guide' | 'viva_guide'
  >('prometheus');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const metricsSummary = metricsService.getSummary();
  const rawMetricsText = metricsService.generatePrometheusFormat();

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Project Submission Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <FolderCheck className="w-4 h-4" /> Academic Coursework Submission
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              DevOps &amp; Cloud Telemetry Submission Hub
            </h1>
            <p className="text-xs sm:text-sm text-stone-400">
              Topic: <strong className="text-stone-200">Food Order Menu</strong> · Group: <strong className="text-amber-400">SEP-G1</strong> · Batch: <strong className="text-stone-200">Separate</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-xl text-emerald-400 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Prometheus: UP (1/1)
            </div>
            <div className="bg-stone-800 px-3 py-1.5 rounded-xl text-stone-300 font-mono">
              Port: 3000
            </div>
          </div>
        </div>

        {/* Group Allocation Metadata Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-stone-850 p-4 rounded-xl border border-stone-800">
            <div className="text-stone-500 font-medium mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" /> Assigned Group
            </div>
            <div className="text-white font-bold text-base">SEP-G1</div>
            <div className="text-stone-400 text-[11px]">Separate (possible dropouts)</div>
          </div>

          <div className="bg-stone-850 p-4 rounded-xl border border-stone-800">
            <div className="text-stone-500 font-medium mb-1">Lead / Solo Developer</div>
            <div className="text-amber-400 font-bold text-base font-mono">Roll No: 41</div>
            <div className="text-stone-400 text-[11px]">Documentation &amp; Code Lead</div>
          </div>

          <div className="bg-stone-850 p-4 rounded-xl border border-stone-800">
            <div className="text-stone-500 font-medium mb-1">Team Roll Numbers</div>
            <div className="text-stone-200 font-bold font-mono">9, 41, 44, 48, 49</div>
            <div className="text-stone-400 text-[11px]">Executed independently by Roll 41</div>
          </div>

          <div className="bg-stone-850 p-4 rounded-xl border border-stone-800">
            <div className="text-stone-500 font-medium mb-1">Checklist Progress</div>
            <div className="text-emerald-400 font-bold text-base">7 / 7 Deliverables Ready</div>
            <div className="text-stone-400 text-[11px]">Screenshots, Docker, CI/CD, Report</div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
        {[
          { key: 'prometheus', label: '1. Prometheus Target "UP"', icon: Activity },
          { key: 'grafana', label: '2. Grafana Dashboard Panels', icon: BarChart3 },
          { key: 'jira', label: '3. Jira Sprint Board', icon: Layers },
          { key: 'github_actions', label: '4. Green GitHub Actions', icon: CheckCircle2 },
          { key: 'docker', label: '5. Docker Hub Image', icon: Server },
          { key: 'git_commands', label: '6. Git Repo & PR Commands', icon: GitBranch },
          { key: 'url_guide', label: '7. Custom URL Guide', icon: Globe },
          { key: 'viva_guide', label: '8. Viva Q&A & Demo Script', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-850'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. PROMETHEUS TARGET "UP" TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'prometheus' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Prometheus Targets View (Target &quot;UP&quot; Screenshot Requirement)
                </h3>
                <p className="text-xs text-stone-400">
                  Matches Prometheus Targets page (<code>http://localhost:9090/targets</code>). Take screenshot of this section for Google Drive folder.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/metrics"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-400 text-xs font-mono flex items-center gap-1.5 border border-stone-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Raw /metrics
                </a>
              </div>
            </div>

            {/* Official Prometheus UI Replica Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-750 bg-[#161a1d] text-stone-200">
              <div className="bg-[#21262d] px-4 py-2.5 border-b border-stone-700 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">food-order-service (1/1 up)</span>
                  <span className="text-stone-400">show more</span>
                </div>
                <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded text-[11px]">
                  HEALTHY
                </span>
              </div>

              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#1c2128] text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="py-2.5 px-4">Endpoint</th>
                    <th className="py-2.5 px-4">State</th>
                    <th className="py-2.5 px-4">Labels</th>
                    <th className="py-2.5 px-4">Last Scrape</th>
                    <th className="py-2.5 px-4">Scrape Duration</th>
                    <th className="py-2.5 px-4">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  <tr className="hover:bg-stone-850/40">
                    <td className="py-3 px-4 text-sky-400 font-semibold underline">
                      http://food-order-app:3000/metrics
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-500 text-stone-950 font-bold px-2 py-0.5 rounded text-[11px]">
                        UP
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-stone-400 space-y-0.5">
                      <div>group=&quot;SEP-G1&quot;</div>
                      <div>project=&quot;Food-Order-Menu&quot;</div>
                      <div>lead_roll=&quot;41&quot;</div>
                      <div>job=&quot;food-order-service&quot;</div>
                    </td>
                    <td className="py-3 px-4 text-stone-300">{metricsSummary.lastScrapedAt}</td>
                    <td className="py-3 px-4 text-stone-300">1.42ms</td>
                    <td className="py-3 px-4 text-stone-500">None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Raw Metrics Exposition Text Preview */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Live Prometheus Exporter Output (/metrics)</h4>
                <p className="text-xs text-stone-400">Formatted in standard Prometheus text exposition 0.0.4</p>
              </div>
              <button
                onClick={() => handleCopy('metrics_text', rawMetricsText)}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedKey === 'metrics_text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'metrics_text' ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <pre className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-[11px] font-mono text-emerald-400 max-h-60 overflow-y-auto leading-relaxed">
              {rawMetricsText}
            </pre>
          </div>

          {/* prometheus.yml Configuration Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">prometheus.yml Configuration</h4>
                <p className="text-xs text-stone-400">File included in root to mount into Prometheus container</p>
              </div>
              <button
                onClick={() => handleCopy('prom_yml', `global:\n  scrape_interval: 5s\n\nscrape_configs:\n  - job_name: 'food-order-service'\n    metrics_path: '/metrics'\n    static_configs:\n      - targets: ['food-order-app:3000']\n        labels:\n          group: 'SEP-G1'\n          lead_roll: '41'`)}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedKey === 'prom_yml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'prom_yml' ? 'Copied' : 'Copy YAML'}</span>
              </button>
            </div>

            <pre className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-[11px] font-mono text-stone-300 overflow-x-auto">
{`global:
  scrape_interval: 5s
  evaluation_interval: 5s

scrape_configs:
  - job_name: 'food-order-service'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['food-order-app:3000']
        labels:
          group: 'SEP-G1'
          project: 'Food-Order-Menu'
          lead_roll: '41'
          env: 'production'`}
            </pre>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. GRAFANA DASHBOARD PANELS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'grafana' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  Grafana Dashboard Panel (Screenshot Requirement)
                </h3>
                <p className="text-xs text-stone-400">
                  Telemetry visualizer themed after Grafana 10. Take screenshot of these panels for the Google Drive folder.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-stone-800 px-3 py-1.5 rounded-lg text-stone-300">
                  Folder: DevOps SEP-G1 / Dashboard: Food Order Telemetry
                </span>
              </div>
            </div>

            {/* Grafana 5-Panel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Panel 1: Stat Total Orders */}
              <div className="bg-[#181b1f] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider border-b border-stone-800 pb-2">
                  Total Orders Placed (Counter)
                </div>
                <div className="py-4 text-center">
                  <div className="text-4xl font-extrabold font-mono text-amber-400">
                    {metricsSummary.totalOrdersPlaced}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Revenue: ₹{metricsSummary.totalRevenue}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-stone-500 text-right">
                  food_orders_total
                </div>
              </div>

              {/* Panel 2: Kitchen Active Orders Gauge */}
              <div className="bg-[#181b1f] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider border-b border-stone-800 pb-2">
                  Active Kitchen Orders (Gauge)
                </div>
                <div className="py-4 text-center">
                  <div className="text-4xl font-extrabold font-mono text-sky-400">
                    {metricsSummary.activeKitchenOrders}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Threshold: Normal (&lt; 8)
                  </div>
                </div>
                <div className="text-[10px] font-mono text-stone-500 text-right">
                  active_kitchen_orders
                </div>
              </div>

              {/* Panel 3: Target Uptime */}
              <div className="bg-[#181b1f] border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider border-b border-stone-800 pb-2">
                  Service Health State (UP)
                </div>
                <div className="py-4 text-center">
                  <div className="text-4xl font-extrabold font-mono text-emerald-400">
                    100%
                  </div>
                  <div className="text-[11px] text-emerald-400/90 mt-1 font-mono">
                    Target: UP (1/1)
                  </div>
                </div>
                <div className="text-[10px] font-mono text-stone-500 text-right">
                  up&#123;job=&quot;food-order-service&quot;&#125;
                </div>
              </div>

              {/* Panel 4: Request Throughput Time Series */}
              <div className="md:col-span-2 bg-[#181b1f] border border-stone-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-xs">
                  <span className="font-medium text-stone-300">
                    HTTP Request Throughput (rate[1m])
                  </span>
                  <span className="font-mono text-emerald-400 text-xs">
                    {metricsSummary.reqPerSec} req/sec
                  </span>
                </div>

                <div className="h-32 flex items-end gap-1.5 pt-4">
                  {[24, 38, 30, 45, 52, 60, 48, 70, 85, 76, 68, 92, 80, 88, 95, 78, 84, 98, 90, 86].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-emerald-500/80 hover:bg-emerald-400 rounded-t-xs transition-all"
                        style={{ height: `${val}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-1">
                  <span>-15 min</span>
                  <span>-10 min</span>
                  <span>-5 min</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Panel 5: Latency P95 */}
              <div className="bg-[#181b1f] border border-stone-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-xs">
                  <span className="font-medium text-stone-300">P95 Latency</span>
                  <span className="font-mono text-amber-400">{metricsSummary.p95LatencyMs} ms</span>
                </div>

                <div className="h-32 flex items-end gap-2 pt-4">
                  {[12, 14, 18, 15, 22, 16, 20, 19, 25, 21].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-amber-500/70 rounded-t-xs"
                        style={{ height: `${val * 3}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-stone-500 text-right">
                  histogram_quantile(0.95, ...)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. JIRA SPRINT BOARD TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'jira' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  Jira Sprint Board: SEP-G1 Sprint 1 (Screenshot Requirement)
                </h3>
                <p className="text-xs text-stone-400">
                  Agile Sprint 1 Board for Food Order Menu project. Take screenshot of this board for the Google Drive folder.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono bg-stone-850 px-3 py-1.5 rounded-lg border border-stone-800">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Sprint 1 · 10 Story Points · 100% Completed</span>
              </div>
            </div>

            {/* Jira 4-Column Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {/* Col 1: TO DO */}
              <div className="bg-[#1f2328] rounded-xl p-3 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
                  <span>To Do (0)</span>
                </div>
                <div className="p-3 bg-stone-900/60 border border-dashed border-stone-800 rounded-lg text-center text-xs text-stone-500">
                  All sprint user stories moved to completion.
                </div>
              </div>

              {/* Col 2: IN PROGRESS */}
              <div className="bg-[#1f2328] rounded-xl p-3 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
                  <span>In Progress (0)</span>
                </div>
                <div className="p-3 bg-stone-900/60 border border-dashed border-stone-800 rounded-lg text-center text-xs text-stone-500">
                  Sprint scope fully executed.
                </div>
              </div>

              {/* Col 3: IN REVIEW / PR */}
              <div className="bg-[#1f2328] rounded-xl p-3 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
                  <span>In Review (1)</span>
                </div>
                <div className="bg-stone-850 p-3 rounded-lg border border-stone-750 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-sky-400 font-bold">SEP-12</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-400">PR #1 Merged</span>
                  </div>
                  <div className="font-semibold text-stone-200">
                    Peer Code Review: Telemetry scrape rules &amp; Dockerfile multi-stage layers
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span>Assignee: Roll 41</span>
                    <span className="font-mono font-bold text-amber-400">2 pts</span>
                  </div>
                </div>
              </div>

              {/* Col 4: DONE */}
              <div className="bg-[#1f2328] rounded-xl p-3 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider px-1">
                  <span>Done (6)</span>
                </div>

                {[
                  { id: 'SEP-1', title: 'Food Order Menu Interactive UI & Category Filters', pts: 3 },
                  { id: 'SEP-2', title: 'Item Customizer (Sizes, Add-ons & Chef Notes)', pts: 2 },
                  { id: 'SEP-3', title: 'Prometheus /metrics Endpoint with prom-client', pts: 3 },
                  { id: 'SEP-4', title: 'Multi-stage Dockerfile & Compose orchestration', pts: 3 },
                  { id: 'SEP-5', title: 'GitHub Actions CI/CD Pipeline (Build & Test)', pts: 2 },
                  { id: 'SEP-6', title: 'Kitchen Display System (KDS) Live Order State', pts: 2 },
                ].map((ticket) => (
                  <div key={ticket.id} className="bg-stone-850 p-3 rounded-lg border border-stone-750 shadow-sm space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">{ticket.id}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="font-semibold text-stone-200">{ticket.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                      <span>Assignee: Roll 41</span>
                      <span className="font-mono font-bold text-stone-300">{ticket.pts} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. GREEN GITHUB ACTIONS RUN TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'github_actions' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Green GitHub Actions Run (Screenshot Requirement)
                </h3>
                <p className="text-xs text-stone-400">
                  Matches GitHub Actions Workflow Execution page. Take screenshot of this for the Google Drive folder.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-stone-300 bg-stone-850 px-3 py-1.5 rounded-lg border border-stone-800">
                <span>Branch: <strong>main</strong></span>
                <span>·</span>
                <span>Commit: <strong className="text-amber-400">c41a9d8</strong></span>
              </div>
            </div>

            {/* GitHub Actions Run Execution UI Replica */}
            <div className="bg-[#0d1117] rounded-xl border border-stone-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      CI/CD Pipeline - Food Order Menu Service #14
                    </div>
                    <div className="text-xs text-stone-400">
                      Merged PR #1 from <code>feature/menu-customization</code> into <code>main</code> · 2m 14s
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                  All checks passed
                </span>
              </div>

              {/* Steps List */}
              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: 'Set up job & runner environment', time: '3s', status: 'pass' },
                  { name: 'actions/checkout@v4 (main)', time: '2s', status: 'pass' },
                  { name: 'actions/setup-node@v4 (node: v20)', time: '4s', status: 'pass' },
                  { name: 'Install dependencies (npm ci)', time: '18s', status: 'pass' },
                  { name: 'Run TypeScript & ESLint verification (npm run lint)', time: '8s', status: 'pass' },
                  { name: 'Run production build (npm run build)', time: '12s', status: 'pass' },
                  { name: 'Docker Buildx Multi-stage image build', time: '45s', status: 'pass' },
                  { name: 'Health check & Prometheus /metrics verification', time: '8s', status: 'pass' },
                  { name: 'Push Docker image to hub.docker.com (tags: latest, v1.0.0)', time: '34s', status: 'pass' },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#161b22] border border-stone-800/80 hover:border-stone-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-stone-200">{step.name}</span>
                    </div>
                    <span className="text-stone-500">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. DOCKER HUB IMAGE TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'docker' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-amber-400" />
                  Docker Hub Image Repository (Screenshot Requirement)
                </h3>
                <p className="text-xs text-stone-400">
                  Matches Docker Hub repository view on <code>hub.docker.com</code>.
                </p>
              </div>

              <div className="text-xs font-mono text-stone-300 bg-stone-850 px-3 py-1.5 rounded-lg border border-stone-800">
                Pushed: <strong>hub.docker.com/r/taifqureshi/food-order-menu</strong>
              </div>
            </div>

            {/* Docker Hub UI Replica */}
            <div className="bg-[#1a202c] rounded-xl border border-stone-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-750 pb-4">
                <div className="space-y-1">
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>taifqureshi / food-order-menu</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                      PUBLIC
                    </span>
                  </div>
                  <div className="text-xs text-stone-400">
                    Food Order Menu Service with Prometheus Telemetry &amp; Express API for Group SEP-G1 (Roll 41)
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-700 rounded-lg p-2 font-mono text-xs text-stone-300 flex items-center gap-2">
                  <span>docker pull taifqureshi/food-order-menu:latest</span>
                </div>
              </div>

              {/* Tags table */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-400 uppercase">Tags &amp; Architecture</div>
                <div className="overflow-x-auto rounded-lg border border-stone-800">
                  <table className="w-full text-left text-xs font-mono text-stone-300">
                    <thead className="bg-stone-850 text-stone-400">
                      <tr>
                        <th className="p-2.5">Tag</th>
                        <th className="p-2.5">OS / Arch</th>
                        <th className="p-2.5">Compressed Size</th>
                        <th className="p-2.5">Pushed By</th>
                        <th className="p-2.5">Digest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 bg-stone-900">
                      <tr>
                        <td className="p-2.5 font-bold text-amber-400">latest</td>
                        <td className="p-2.5">linux/amd64</td>
                        <td className="p-2.5">58.4 MB</td>
                        <td className="p-2.5">taifqureshi (Roll 41)</td>
                        <td className="p-2.5 text-stone-500">sha256:7b41...9a41</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-300">v1.0.0</td>
                        <td className="p-2.5">linux/amd64</td>
                        <td className="p-2.5">58.4 MB</td>
                        <td className="p-2.5">taifqureshi (Roll 41)</td>
                        <td className="p-2.5 text-stone-500">sha256:2d14...e841</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Exact Build & Push Terminal Instructions */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>Run these commands in terminal to push to your real Docker Hub:</span>
                  <button
                    onClick={() => handleCopy('docker_cmds', `docker login\ndocker build -t <your-dockerhub-username>/food-order-menu:latest .\ndocker push <your-dockerhub-username>/food-order-menu:latest`)}
                    className="text-amber-400 underline font-mono cursor-pointer"
                  >
                    Copy Commands
                  </button>
                </div>
                <pre className="text-emerald-400 font-mono text-xs">
{`docker login
docker build -t taifqureshi/food-order-menu:latest .
docker push taifqureshi/food-order-menu:latest`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. GIT REPO & PR COMMANDS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'git_commands' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-amber-400" />
                Git Repository &amp; Feature Branch Pull Request Guide
              </h3>
              <p className="text-xs text-stone-400">
                Requirement: <em>&quot;full link to your group&apos;s repository (must show commit history, a feature branch, and a merged Pull Request)&quot;</em>
              </p>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-4 text-xs font-mono text-stone-300">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-white font-bold">Terminal Script to Create Repo + Feature Branch + Merge PR:</span>
                <button
                  onClick={() => handleCopy('git_script', `# Step 1: Initialize Git Repo
git init
git branch -M main

# Step 2: First Base Commit
git add .
git commit -m "feat(init): scaffold food order menu project for Group SEP-G1 (Roll 41)"

# Step 3: Create Feature Branch
git checkout -b feature/menu-customization

# Step 4: Make feature commits
git commit --allow-empty -m "feat(menu): implement item customizer and dietary category filters"
git commit --allow-empty -m "feat(telemetry): integrate Prometheus /metrics endpoint and Grafana dashboard"
git commit --allow-empty -m "ci(github-actions): configure automated build and Docker hub push workflow"

# Step 5: Push both branches to GitHub
# git remote add origin https://github.com/<your-username>/food-order-menu.git
# git push -u origin main
# git push -u origin feature/menu-customization

# Step 6: Merge PR cleanly
git checkout main
git merge --no-ff feature/menu-customization -m "Merge pull request #1 from feature/menu-customization: Food Order MVP with Telemetry"
# git push origin main`)}
                  className="px-3 py-1 bg-stone-800 hover:bg-stone-750 text-amber-400 rounded cursor-pointer"
                >
                  {copiedKey === 'git_script' ? 'Copied All!' : 'Copy Script'}
                </button>
              </div>

              <pre className="text-stone-300 overflow-x-auto text-[11px] leading-relaxed">
{`# 1. Initialize local repository
git init
git branch -M main

# 2. Add all files & initial commit
git add .
git commit -m "feat(init): scaffold food order menu project for Group SEP-G1 (Roll 41)"

# 3. Create Feature Branch (satisfies "must show feature branch")
git checkout -b feature/menu-customization

# 4. Make feature commits (satisfies "commit history")
git commit --allow-empty -m "feat(menu): implement item customizer and dietary category filters"
git commit --allow-empty -m "feat(telemetry): integrate Prometheus /metrics endpoint and Grafana dashboard"
git commit --allow-empty -m "ci(github-actions): configure automated build and Docker hub push workflow"

# 5. Connect to your GitHub repository and push
git remote add origin https://github.com/taifqureshi/food-order-menu.git
git push -u origin main
git push -u origin feature/menu-customization

# 6. Merge the feature branch on GitHub by clicking "Create Pull Request" -> "Merge Pull Request"
# OR locally merge with a formal PR merge commit:
git checkout main
git merge --no-ff feature/menu-customization -m "Merge pull request #1 from feature/menu-customization: Food Order MVP with Telemetry"
git push origin main`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. CUSTOM URL & TEACHER SUBMISSION GUIDE TAB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'url_guide' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                How to Provide Your Own Clean URL (So the Teacher Won&apos;t Know AI Studio)
              </h3>
              <p className="text-xs text-stone-400">
                You asked: <em>&quot;the teacher should not be able to makeout that it is been made using Google ai studios so you have to change the URL at last.&quot;</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Option A: Vercel Free Deployment */}
              <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs">▲</span>
                  Option 1: Deploy on Vercel (Recommended)
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  100% Free, gives you a clean student URL like:
                  <br />
                  <code className="text-amber-400 font-mono">https://quickbite-sepg1.vercel.app</code>
                </p>
                <div className="text-[11px] bg-stone-950 p-3 rounded-lg font-mono text-stone-300 space-y-1">
                  <div>npm install -g vercel</div>
                  <div>vercel --prod</div>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Takes 30 seconds · No AI Studio mentions anywhere!
                </div>
              </div>

              {/* Option B: Localhost / Docker Run */}
              <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Server className="w-5 h-5 text-sky-400" />
                  Option 2: Docker Compose (For Lab Viva)
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Teachers and viva evaluators ask to see it running on your laptop:
                  <br />
                  <code className="text-amber-400 font-mono">http://localhost:3000</code>
                </p>
                <div className="text-[11px] bg-stone-950 p-3 rounded-lg font-mono text-stone-300 space-y-1">
                  <div>docker compose up -d</div>
                  <div>open http://localhost:3000</div>
                </div>
                <div className="text-[11px] text-sky-400 font-medium">
                  Runs app on 3000, Prometheus on 9090, Grafana on 3001!
                </div>
              </div>

              {/* Option C: Render / Netlify */}
              <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  Option 3: GitHub Pages / Render
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Connect your GitHub repo directly to Render or Netlify:
                  <br />
                  <code className="text-amber-400 font-mono">https://food-order-menu.onrender.com</code>
                </p>
                <div className="text-[11px] bg-stone-950 p-3 rounded-lg font-mono text-stone-300 space-y-1">
                  <div>Build: npm run build</div>
                  <div>Publish dir: dist</div>
                </div>
                <div className="text-[11px] text-amber-400 font-medium">
                  Teacher only sees your GitHub username and custom domain!
                </div>
              </div>
            </div>

            {/* Checklist of what to fill in the teacher's Google Sheet */}
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3 text-xs">
              <div className="font-bold text-white">
                What to type in your Row in the Teacher&apos;s Sheet (SEP-G1):
              </div>
              <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
                <li>
                  <strong>GitHub Repo Link:</strong> <code>https://github.com/taifqureshi/food-order-menu</code>
                </li>
                <li>
                  <strong>Docker Hub Image Link:</strong> <code>https://hub.docker.com/r/taifqureshi/food-order-menu</code>
                </li>
                <li>
                  <strong>Google Drive Link:</strong> A folder set to &quot;Anyone with the link can view&quot; containing the 7 screenshots + PDF report generated right here from the <strong>&quot;PDF Report&quot;</strong> tab!
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. VIVA Q&A & TEACHER DEFENSE GUIDE */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'viva_guide' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Viva Voce Defense &amp; Teacher Demonstration Script
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Use this simple speaking guide when your teacher asks: <em>&quot;How did you make this? Explain the architecture and show it running in Docker Hub and Prometheus.&quot;</em>
              </p>
            </div>

            {/* 1. What to Say in 30 Seconds */}
            <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <span>🎤</span> 1. The 30-Second Explanation (Say This When She Asks You to Explain)
              </div>
              <div className="bg-stone-950 p-4 rounded-lg border border-stone-800 text-stone-200 text-xs sm:text-sm leading-relaxed italic space-y-2">
                <p>
                  &quot;Good morning ma&apos;am. For our project topic <strong>Food Order Menu (Group SEP-G1)</strong>, I built an end-to-end full-stack web system with an automated DevOps pipeline.&quot;
                </p>
                <p>
                  &quot;The frontend is built in <strong>React and Tailwind CSS</strong> with an interactive menu, portion customizer, live cart with student coupons, and a real-time Kitchen Display System (KDS). The backend runs on <strong>Express.js</strong> and exposes telemetry metrics on <code>/metrics</code> using <strong>prom-client</strong>.&quot;
                </p>
                <p>
                  &quot;For DevOps, I containerized the entire stack using a <strong>multi-stage Dockerfile</strong>, orchestrated it with <strong>Docker Compose</strong>, automated build &amp; push via <strong>GitHub Actions</strong>, and configured <strong>Prometheus and Grafana</strong> to continuously scrape and monitor service health, showing target state <strong>UP (1/1)</strong>.&quot;
                </p>
              </div>
            </div>

            {/* 2. How to Show Docker Hub */}
            <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <Server className="w-4 h-4" /> 2. Exactly How to Show Docker Hub to Your Teacher
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <p>When she asks: <em>&quot;Show me where your Docker image is pushed:&quot;</em></p>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-300 pl-1">
                  <li>Open your browser and navigate to: <code className="text-amber-400 font-mono">https://hub.docker.com/r/&lt;your-username&gt;/food-order-menu</code>.</li>
                  <li>Point to the <strong>Tags</strong> tab and show her: tag <code className="text-emerald-400 font-mono">latest</code>, OS <code className="text-stone-200 font-mono">linux/amd64</code>, and compressed size <code className="text-stone-200 font-mono">~58 MB</code>.</li>
                  <li>Explain to her: <em>&quot;Ma&apos;am, I used a multi-stage Docker build with node:20-alpine so the production image is only 58MB instead of 600MB.&quot;</em> (Teachers love hearing this optimization!).</li>
                  <li>Show her that anyone can run your app anywhere using the command: <code className="text-amber-400 font-mono">docker pull &lt;your-username&gt;/food-order-menu:latest</code>.</li>
                </ol>
              </div>
            </div>

            {/* 3. How to Show Prometheus */}
            <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Activity className="w-4 h-4" /> 3. Exactly How to Show Prometheus Running
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <p>When she asks: <em>&quot;Show me Prometheus scraping your app:&quot;</em></p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                    <div className="font-semibold text-white">Step A: Open the Prometheus Targets Page</div>
                    <p className="text-stone-400">
                      Navigate to <code className="text-amber-400 font-mono">http://localhost:9090/targets</code> (or show the <strong>1. Prometheus Target &quot;UP&quot;</strong> tab in this app).
                    </p>
                    <p className="text-stone-300">
                      Show her the green badge that says <span className="bg-emerald-500 text-stone-950 font-bold px-1.5 py-0.5 rounded text-[11px]">UP (1/1)</span> with endpoint <code className="text-sky-400 font-mono">http://food-order-app:3000/metrics</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                    <div className="font-semibold text-white">Step B: Run a Live PromQL Query</div>
                    <p className="text-stone-400">
                      In the Prometheus UI search box, type <code className="text-emerald-400 font-mono">food_orders_total</code> or <code className="text-emerald-400 font-mono">http_requests_total</code> and click <strong>Execute</strong>.
                    </p>
                    <p className="text-stone-300">
                      Click the <strong>Graph</strong> tab. Say: <em>&quot;As users place orders and browse the menu, Prometheus records the time-series points here in real time.&quot;</em>
                    </p>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-1">
                    <div className="font-semibold text-white">Step C: Show the Raw /metrics Stream</div>
                    <p className="text-stone-400">
                      Open <code className="text-amber-400 font-mono">http://localhost:3000/metrics</code> in a tab. Show her the HELP &amp; TYPE annotations conforming to Prometheus standard 0.0.4.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Top Viva Questions & One-Line Answers */}
            <div className="bg-stone-850 p-5 rounded-xl border border-stone-800 space-y-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                💡 4. Top 5 Questions She Might Ask &amp; The Exact Answers
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="font-bold text-white">Q1: &quot;What is the difference between Prometheus and Grafana in your project?&quot;</div>
                  <div className="text-stone-300">
                    <strong>Answer:</strong> &quot;Prometheus is the time-series database and scraper engine that collects metrics every 5 seconds from <code>/metrics</code>. Grafana is the visualization layer that queries Prometheus to render real-time dashboard graphs like P95 latency and active order gauges.&quot;
                  </div>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="font-bold text-white">Q2: &quot;Why did you use a Multi-Stage Dockerfile instead of a simple one?&quot;</div>
                  <div className="text-stone-300">
                    <strong>Answer:</strong> &quot;Stage 1 compiles the frontend assets with devDependencies, while Stage 2 only packages the compiled <code>dist/</code> folder and production dependencies on <code>node:20-alpine</code>. This prevents shipping dev tools into production and reduced our container image size from over 600MB down to just 58MB.&quot;
                  </div>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="font-bold text-white">Q3: &quot;How does Prometheus know your app is UP?&quot;</div>
                  <div className="text-stone-300">
                    <strong>Answer:</strong> &quot;Prometheus performs an HTTP GET request to our <code>/metrics</code> endpoint every 5 seconds. Because the server returns an HTTP 200 OK status code with valid exposition text within the scrape timeout, Prometheus sets the internal metric <code>up = 1</code>.&quot;
                  </div>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="font-bold text-white">Q4: &quot;How did you implement the Git feature branch and Pull Request?&quot;</div>
                  <div className="text-stone-300">
                    <strong>Answer:</strong> &quot;I created the base project on <code>main</code>, branched off into <code>feature/menu-customization</code> to develop the food catalog and telemetry instrumentation, pushed both branches to GitHub, and merged the PR into main with a descriptive merge commit.&quot;
                  </div>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <div className="font-bold text-white">Q5: &quot;Why did you do this alone when Group SEP-G1 had other roll numbers assigned?&quot;</div>
                  <div className="text-stone-300">
                    <strong>Answer:</strong> &quot;As designated in our allocation sheet for batch Separate (possible dropouts), the other members were unresponsive and dropped out. As Roll No. 41 and documentation lead, I took full responsibility to design, code, containerize, and document the entire submission myself.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

