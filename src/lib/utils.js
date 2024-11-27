export function formatCurrency(amount, currency) {
    const options = {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
  
    const formatter = new Intl.NumberFormat("en-US", options);
  
    return formatter.format(amount);
  }