// utils/stockPrediction.js

function basicStockPrediction(prices) {
  if (!Array.isArray(prices) || prices.length < 2) {
    throw new Error("Need at least 2 price points");
  }

  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    const r = (prices[i] - prices[i - 1]) / prices[i - 1];
    returns.push(r);
  }

  const avgReturn =
    returns.reduce((sum, r) => sum + r, 0) / returns.length;

  const variance =
    returns.reduce((sum, r) => {
      const diff = r - avgReturn;
      return sum + diff * diff;
    }, 0) / returns.length;

  const volatility = Math.sqrt(variance);
  const lastPrice = prices[prices.length - 1];
  const predictedPrice = lastPrice * (1 + avgReturn);

  return {
    lastPrice,
    avgReturn: Number(avgReturn.toFixed(6)),
    volatility: Number(volatility.toFixed(6)),
    predictedPrice: Number(predictedPrice.toFixed(2))
  };
}

module.exports = { basicStockPrediction };
