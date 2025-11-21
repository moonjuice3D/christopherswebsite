// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// ----- Middleware -----
app.use(cors());             // allow frontend from GitHub Pages / localhost
app.use(express.json());     // parse JSON bodies

// ----- In-memory data (resets on server restart) -----
const payments = [
  {
    id: "INV-2041",
    customer: "Prime Crypto Store",
    amountEth: "0.42",
    fiat: "$1,305.00",
    network: "Sepolia",
    status: "Settled",
    statusType: "success",
    time: "12 min ago",
    txHash: "0x7d…a9f3",
    method: "ETH",
    memo: "Initial sample payment"
  },
  {
    id: "INV-2038",
    customer: "DeFi Analytics Pro",
    amountEth: "0.13",
    fiat: "$395.20",
    network: "Polygon",
    status: "Pending",
    statusType: "pending",
    time: "3 min ago",
    txHash: "0xa1…b74c",
    method: "USDC",
    memo: "Subscription upgrade"
  }
];

// Simple ID generator
function nextInvoiceId() {
  const base = 2040 + payments.length + 1;
  return "INV-" + base;
}

// ----- Health check -----
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString()
  });
});

// ----- AI Stock Prediction endpoint (alias + legacy path) -----
app.post("/api/ai/stock-prediction", (req, res) => {
  const { prices } = req.body || {};

  if (!Array.isArray(prices) || prices.length === 0) {
    return res.status(400).json({ error: "prices must be a non-empty array of numbers" });
  }

  const n = prices.length;
  const returns = [];

  for (let i = 1; i < n; i++) {
    const prev = prices[i - 1];
    const cur = prices[i];
    if (prev <= 0) continue;
    returns.push((cur - prev) / prev);
  }

  if (returns.length === 0) {
    return res.status(400).json({ error: "not enough valid prices to compute returns" });
  }

  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((acc, r) => acc + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance);

  const lastPrice = prices[prices.length - 1];
  const predictedNextPrice = lastPrice * (1 + avgReturn);

  res.json({
    avgReturn,
    volatility,
    predictedNextPrice
  });
});

// Legacy alias: /api/stock/predict -> same logic
app.post("/api/stock/predict", (req, res) => {
  // just forward to the main handler
  req.url = "/api/ai/stock-prediction";
  app._router.handle(req, res);
});

// ----- Portfolio optimizer demo -----
app.post("/api/portfolio/optimize", (req, res) => {
  const { assets, riskTolerance = 0.5 } = req.body || {};

  if (!Array.isArray(assets) || assets.length === 0) {
    return res.status(400).json({ error: "assets must be a non-empty array" });
  }

  const n = assets.length;

  // Naive equal-weight baseline + risk-tolerance tilt towards higher return
  let totalScore = 0;
  const scores = assets.map(a => {
    const r = Number(a.expectedReturn || 0);
    const v = Number(a.risk || 1);
    const score = v <= 0 ? 0 : (r / v) ** (0.5 + riskTolerance); // higher r, lower v -> higher score
    totalScore += score;
    return score;
  });

  const weights = assets.map((asset, idx) => {
    const w = totalScore > 0 ? scores[idx] / totalScore : 1 / n;
    return {
      symbol: asset.symbol || `Asset ${idx + 1}`,
      weight: Number(w.toFixed(4))
    };
  });

  res.json({
    weights,
    riskTolerance,
    note: "Simple heuristic optimizer for demo purposes only."
  });
});

// ----- NEW: Payments API -----

// GET /api/payments -> list payments
app.get("/api/payments", (req, res) => {
  res.json({ payments });
});

// POST /api/payments -> log a new payment
app.post("/api/payments", (req, res) => {
  const {
    customer = "Demo Customer",
    amountEth,
    fiat,
    network = "Unknown",
    method = "ETH",
    memo = ""
  } = req.body || {};

  if (!amountEth || Number(amountEth) <= 0) {
    return res.status(400).json({ error: "amountEth must be > 0" });
  }

  const payment = {
    id: nextInvoiceId(),
    customer,
    amountEth: String(amountEth),
    fiat: fiat || "",
    network,
    status: "Logged",
    statusType: "pending",
    time: new Date().toISOString(),
    txHash: req.body.txHash || "0xlogged-via-api",
    method,
    memo
  };

  // Add to the top of the list
  payments.unshift(payment);

  return res.status(201).json(payment);
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
