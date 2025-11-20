// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const Sentiment = require("sentiment");

const { projects } = require("./projects");
const { optimizePortfolio } = require("./utils/portfolioOptimizer");
const { basicStockPrediction } = require("./utils/stockPrediction");

const app = express();
const sentiment = new Sentiment();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Simple in-memory stores (demo only)
const chatMessages = [];
const iotDevices = [
  { id: "device-1", status: "online", firmware: "1.0.0" },
  { id: "device-2", status: "offline", firmware: "1.2.3" }
];
const fitnessWorkouts = [
  { id: 1, type: "Strength", durationMinutes: 45 },
  { id: 2, type: "Cardio", durationMinutes: 30 }
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ======== Projects API =========

// List all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Get single project by slug
app.get("/api/projects/:slug", (req, res) => {
  const project = projects.find(p => p.slug === req.params.slug);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

// ======== Fin-Viz Dashboard demo =========

// Return some mock financial data (you can later plug in a real market API)
app.get("/api/finviz/summary", (req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    stocks: [
      { symbol: "AAPL", price: 190.12, changePct: 0.56 },
      { symbol: "TSLA", price: 240.44, changePct: -1.23 },
      { symbol: "NVDA", price: 480.01, changePct: 2.34 }
    ],
    crypto: [
      { symbol: "BTC", price: 64000, changePct: 0.8 },
      { symbol: "ETH", price: 3500, changePct: 1.2 }
    ]
  });
});

// ======== AI Stock Prediction Model =========

app.post("/api/ai/stock-prediction", (req, res) => {
  try {
    const { prices } = req.body;
    if (!Array.isArray(prices)) {
      return res
        .status(400)
        .json({ error: "prices must be an array of numbers" });
    }

    const numericPrices = prices.map(Number);
    if (numericPrices.some(p => !isFinite(p) || p <= 0)) {
      return res
        .status(400)
        .json({ error: "All prices must be positive numbers" });
    }

    const result = basicStockPrediction(numericPrices);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
});

// ======== Portfolio Optimizer =========

app.post("/api/portfolio/optimize", (req, res) => {
  try {
    const { assets, riskTolerance } = req.body;

    if (!Array.isArray(assets) || assets.length === 0) {
      return res
        .status(400)
        .json({ error: "assets must be a non-empty array" });
    }

    const rt =
      typeof riskTolerance === "number"
        ? Math.min(1, Math.max(0, riskTolerance))
        : 0.5;

    const result = optimizePortfolio(assets, rt);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ======== Natural Language API (sentiment) =========

app.post("/api/nlp/sentiment", (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res
      .status(400)
      .json({ error: "text is required and must be a string" });
  }
  const analysis = sentiment.analyze(text);
  res.json({
    score: analysis.score,
    comparative: analysis.comparative,
    positive: analysis.positive,
    negative: analysis.negative
  });
});

// ======== Real-time Chat Application (simple HTTP version) =========

// Get messages
app.get("/api/chat/messages", (req, res) => {
  res.json(chatMessages);
});

// Post a new message
app.post("/api/chat/messages", (req, res) => {
  const { user, message } = req.body;
  if (!user || !message) {
    return res
      .status(400)
      .json({ error: "user and message are required" });
  }
  const newMessage = {
    id: chatMessages.length + 1,
    user,
    message,
    timestamp: new Date().toISOString()
  };
  chatMessages.push(newMessage);
  res.status(201).json(newMessage);
});

// ======== IoT Device Management (mock) =========

app.get("/api/iot/devices", (req, res) => {
  res.json(iotDevices);
});

// ======== Cloud Migration Estimate (very simple) =========

app.post("/api/cloud-migration/estimate", (req, res) => {
  const { numServers, monthlySpend } = req.body;

  const n = Number(numServers);
  const spend = Number(monthlySpend);

  if (!isFinite(n) || !isFinite(spend) || n <= 0 || spend <= 0) {
    return res
      .status(400)
      .json({ error: "numServers and monthlySpend must be > 0" });
  }

  const projectedSavingsPct = 0.2; // pretend 20%
  const savings = spend * projectedSavingsPct;

  res.json({
    currentMonthlySpend: spend,
    estimatedMonthlySavings: Number(savings.toFixed(2)),
    estimatedNewMonthlySpend: Number((spend - savings).toFixed(2)),
    assumptions:
      "Simple 20% savings assumption for demonstration. Not financial advice."
  });
});

// ======== CI/CD Automation Suite mock =========

app.get("/api/cicd/pipelines", (req, res) => {
  res.json([
    {
      name: "portfolio-frontend",
      status: "success",
      lastRun: new Date(Date.now() - 3600 * 1000).toISOString(),
      qualityGates: {
        tests: "pass",
        coverage: 82,
        securityScan: "pass"
      }
    },
    {
      name: "portfolio-backend",
      status: "running",
      lastRun: new Date().toISOString(),
      qualityGates: {
        tests: "running",
        coverage: null,
        securityScan: "pending"
      }
    }
  ]);
});

// ======== Fitness workouts mock =========

app.get("/api/fitness/workouts", (req, res) => {
  res.json(fitnessWorkouts);
});

// ======== Distributed cache stats mock =========

app.get("/api/cache/stats", (req, res) => {
  res.json({
    nodes: 3,
    hitRate: 0.92,
    missRate: 0.08,
    items: 15234
  });
});

// ======== Misc project status stubs =========

app.get("/api/trading/status", (req, res) => {
  res.json({
    engine: "simulated",
    status: "online",
    avgLatencyMicros: 250
  });
});

app.get("/api/blockchain/status", (req, res) => {
  res.json({
    network: "Ethereum testnet",
    status: "operational",
    processedPayments24h: 27
  });
});

app.get("/api/mlops/status", (req, res) => {
  res.json({
    pipelines: 3,
    lastTrainingRun: new Date(Date.now() - 7200 * 1000).toISOString(),
    monitoredModels: 2
  });
});

// AR Navigation mock routes
app.get("/api/ar/routes", (req, res) => {
  res.json({
    building: "Sample Mall",
    routes: [
      {
        from: "Entrance",
        to: "Food Court",
        estimatedTimeMinutes: 3
      },
      {
        from: "Food Court",
        to: "Electronics Store",
        estimatedTimeMinutes: 4
      }
    ]
  });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
