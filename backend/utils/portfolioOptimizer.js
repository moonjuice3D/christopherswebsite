// utils/portfolioOptimizer.js

function optimizePortfolio(assets, riskTolerance = 0.5) {
  if (!Array.isArray(assets) || assets.length === 0) {
    throw new Error("assets must be a non-empty array");
  }

  const alpha = 0.5 + riskTolerance; // between 0.5 and 1.5
  const scores = assets.map(asset => {
    const mu = Number(asset.expectedReturn);
    const sigma = Number(asset.risk);
    if (!isFinite(mu) || !isFinite(sigma) || sigma <= 0) {
      throw new Error("Invalid asset expectedReturn or risk");
    }
    return mu / Math.pow(sigma, alpha);
  });

  const totalScore = scores.reduce((sum, s) => sum + s, 0);
  const weights = scores.map(s => s / totalScore);

  let expectedReturn = 0;
  let avgRisk = 0;
  assets.forEach((asset, i) => {
    expectedReturn += weights[i] * Number(asset.expectedReturn);
    avgRisk += weights[i] * Number(asset.risk);
  });

  return {
    weights: assets.map((a, i) => ({
      symbol: a.symbol,
      weight: Number(weights[i].toFixed(4))
    })),
    expectedReturn: Number(expectedReturn.toFixed(4)),
    approximateRisk: Number(avgRisk.toFixed(4))
  };
}

module.exports = { optimizePortfolio };
