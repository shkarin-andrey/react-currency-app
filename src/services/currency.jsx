import axios from "axios";

export const getCurrency = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data.Valute;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const currencyFormat = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(value);
