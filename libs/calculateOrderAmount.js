const calculateOrderAmount = (items) => {
  let total = 0;
  for (var i in items) {
    total += Number(items[i]);
  }
  return total;
};
exports.calculateOrderAmount = calculateOrderAmount;
