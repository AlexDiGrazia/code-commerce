export const formatToUSDCurrency = (number) => {
  return number.toLocaleString("en-US", { 
     style: "currency", 
     currency: "USD"
   })
 }