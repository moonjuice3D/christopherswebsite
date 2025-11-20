function optimizePortfolio(assets, riskTolerance = 0.5) {
  if (!Array.isArray(assets) || assets.length === 0) {
    throw new Error("assets must be a non-empty array");
  }

  const alpha = 0.5 + riskTolerance;

  const scores = assets.map(asset => {
    const mu = Number(asset.expectedReturn);
    const sigma = Number(asset.risk);

    if (!isFinite(mu) || !isFinite(sigma) || sigma <= 0) {
      throw new Error("Invalid expectedReturn or risk values");
    }

    return mu / Math.pow(sigma, alpha);
  });

  const total = scores.reduce((a, b) => a + b, 0);
  const weights = scores.map(s => s / total);

  let expectedReturn = 0;
  let avgRisk = 0;

  assets.forEach((asset, i) => {
    expectedReturn += weights[i] * asset.expectedReturn;
    avgRisk += weights[i] * asset.risk;
  });

  return {
    weights: assets.map((asset, i) => ({
      symbol: asset.symbol,
      weight: Number(weights[i].toFixed(4))
    })),
    expectedReturn: Number(expectedReturn.toFixed(4)),
    approximateRisk: Number(avgRisk.toFixed(4))
  };
}

module.exports = { optimizePortfolio };
