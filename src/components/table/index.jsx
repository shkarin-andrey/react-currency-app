import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { getCurrency, currencyFormat } from "../../services/currency";
import TableHeader from "../tableHeader";
import { ClockLoader } from "react-spinners";
import moment from "moment";
import "moment/locale/ru";

const Table = ({ setShow }) => {
  const [listCurrency, setListCurrency] = useState({});
  const [loading, setLoading] = useState(true);

  const getListCurrency = async () => {
    await setLoading(true);
    const res = await getCurrency("https://www.cbr-xml-daily.ru/daily_json.js");
    await setListCurrency(res);
    await setLoading(false);
  };

  useEffect(() => {
    getListCurrency();
  }, []);

  const ListCurrency = () => {
    return Object.values(listCurrency).map((currency) => (
      <div key={currency.ID}>
        <div
          className="grid grid-cols-3 gap-2 transition-colors p-1 cursor-pointer hover:bg-blue-500/10"
          onClick={(e) =>
            setShow({
              modal: true,
              currencyName: e.currentTarget.firstChild.textContent,
            })
          }
          data-tip={currency.Name}
          data-for={currency.ID}
        >
          <div className="text-left">{currency.CharCode}</div>
          <div className="text-center">{currencyFormat(currency.Value)}</div>
          <div
            className={`text-right ${
              currency.Value - currency.Previous < 0
                ? "text-red-800"
                : "text-green-600"
            }`}
          >
            {currencyFormat(currency.Value - currency.Previous)}
          </div>
        </div>
        <ReactTooltip
          place="bottom"
          type="info"
          effect="float"
          id={currency.ID}
        />
      </div>
    ));
  };

  return (
    <section className="flex justify-center mt-10">
      <div className="container">
        <h1 className="font-bold text-4xl text-center mt-5">
          Курс валют на {moment(new Date()).format("DD MMMM YYYY")}
        </h1>
        <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg border-blue-500 relative">
          <TableHeader />
          <hr className="border-blue-100" />
          {loading && (
            <div className="flex justify-center mt-5">
              <ClockLoader
                className="mx-auto"
                color={"rgb(59 130 246 / var(--tw-border-opacity))"}
                loading={loading}
                size={50}
              />
            </div>
          )}
          <ListCurrency />
        </div>
      </div>
    </section>
  );
};

export default Table;
