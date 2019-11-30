const calculateCartTotal = (products) => {
  const total = products.reduce((sum, el) => {
    sum += el.product.price * el.quantity;
    return sum;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const paymentTotal = Number((total * 100).toFixed(2));

  return { cartTotal, paymentTotal };
};

export default calculateCartTotal;
