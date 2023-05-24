export const formatToUSDCurrency = (number) => {
  return number.toLocaleString("en-US", { 
     style: "currency", 
     currency: "USD"
   })
 }

 export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
 }