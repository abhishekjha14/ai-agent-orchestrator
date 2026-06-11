# AgentFlow Control Plane UI & Orchestration Engine 🚀

AgentFlow is a Visual No-Code Multi-Agent Control Plane Framework designed to orchestrate, monitor, and visualize autonomous agent pipelines in real-time. Built as a core infrastructure skeleton for **Sastra.co**, this system enables seamless configuration and telemetry tracking of complex multi-agent architectures through an intuitive drag-and-drop orchestration topology graph.

---

## 🛠️ Architecture Blueprint

The framework is split into two highly decoupled components that communicate seamlessly over local gateways:

1. **Visual Management Console (Frontend):** A high-performance dashboard built with **Next.js** and **React Flow** that visualizes agent data traversal, tracks telemetry metrics (token speeds, avg latency, operational costs), and handles structural pipeline maps.
2. **Control Plane Gateway (Backend):** A lightweight **Express.js** and **Node.js** micro-service that manages core routing infrastructure, request guardrails, and state persistence configuration parameters.

---

## 🛡️ Key Features

- **Visual Orchestration Topology:** Interactive graph rendering nodes like API Gateways, Routing Agents, Guardrail Validators, and Final Output streams.
- **Real-Time Telemetry Stream:** A live execution log pane monitoring model invocation, context injections, and validation states.
- **Resilient Embedded Persistence:** Powered by an in-memory embedded data store (`nedb-promises`), allowing 100% functionality and state retention in local environments with zero external database dependencies or internet network blocks.

---

## 🚀 Getting Started

Follow these steps to spin up the complete infrastructure locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### 📦 1. Backend Setup

Go into the backend module directory and install the dependencies:
```bash
cd ai-agent-orchestrator/backend
npm install
