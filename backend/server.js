const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const Sentiment = require("sentiment");

const { optimizePortfolio } = require("./utils/portfolioOptimizer");
const { basicStockPrediction } = require("./utils/stockPrediction");

const app = express();
const sentiment = new Sentiment();

const PORT = 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", time: new Date().toISOString() });
});

// ---- STOCK PREDICTION ----
app.post("/api/ai/stock-prediction", (req, res) => {
  try {
    const { prices } = req.body;

    if (!Array.isArray(prices)) {
      return res.status(400).json({ error: "prices must be an array" });
    }

    const numbers = prices.map(Number);

    const result = basicStockPrediction(numbers);

    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ---- PORTFOLIO OPTIMIZER ----
app.post("/api/portfolio/optimize", (req, res) => {
  try {
    const { assets, riskTolerance } = req.body;

    const result = optimizePortfolio(assets, riskTolerance || 0.5);

    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ---- NLP (sentiment) ----
app.post("/api/nlp/sentiment", (req, res) => {
  const { text } = req.body;

  const result = sentiment.analyze(text);

  res.json({
    score: result.score,
    positive: result.positive,
    negative: result.negative
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
