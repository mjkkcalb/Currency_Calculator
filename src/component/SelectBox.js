const API_KEY = "sIiiw7DWUSoLQlihxTgjWO6Lx2kciXv0"; // 한국수출입은행에서 발급받은 API 키를 사용하세요
const BASE_URL = "https://open.er-api.com/v6/latest/";


export const getExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    const response = await fetch(
      `${BASE_URL}${baseCurrency}?apikey=${API_KEY}`
    );
    const data = await response.json();

    return data.rates[targetCurrency];
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
};
