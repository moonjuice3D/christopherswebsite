const projects = [
  {
    slug: "fin-viz-dashboard",
    name: "Fin-Viz Dashboard",
    category: "FinTech",
    description:
      "Full-stack financial data visualization dashboard for stocks and crypto.",
    techStack: ["React", "Node.js", "MongoDB"],
    api: {
      summaryEndpoint: "/api/finviz/summary"
    }
  },
  {
    slug: "ai-stock-prediction",
    name: "AI Stock Prediction Model",
    category: "AI/ML",
    description:
      "ML-style stock volatility demo backed by a simple return model.",
    techStack: ["Node.js"],
    api: {
      predictEndpoint: "/api/ai/stock-prediction"
    }
  }
];

module.exports = { projects };
