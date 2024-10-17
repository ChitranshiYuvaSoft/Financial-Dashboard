import axios from "axios";

const getCoins = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3//coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );

  return response.data;
};

const getCoin = async (id: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?market_data=true`
  );

  return response.data;
};

const coinServices = {
  getCoins,
  getCoin,
};

export default coinServices;
