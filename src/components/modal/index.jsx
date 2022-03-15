import Close from "../close";
import { getCurrency, currencyFormat } from "../../services/currency";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ru";
import TableHeader from "../tableHeader";
import { ClockLoader } from "react-spinners";

const Modal = ({ show, setShow }) => {
  const [prevListCurrency, setPrevListCurrency] = useState([]);
  const [loading, setLoading] = useState(true);
  moment.locale("ru");
  console.log(moment());
  const getPrevListCurrency = async () => {
    await setLoading(true);
    let prevArrCurrency = [];
    for (let i = 0; i < 10; i++) {
      const date = moment(new Date())
        .subtract(i + 3, "days")
        .format("YYYY/MM/DD");
      const res = await getCurrency(
        `https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`
      );
      if (res !== undefined) {
        await prevArrCurrency.push({
          data: Object.values(res).find(
            (name) => name.CharCode === show.currencyName
          ),
          date,
        });
      } else {
        await prevArrCurrency.push({
          data: {
            message: "За этот день данных нет",
          },
          date,
        });
      }
    }
    setPrevListCurrency(prevArrCurrency);
    setLoading(false);
  };

  useEffect(() => {
    if (show.modal) {
      document.querySelector("body").style.overflow = "hidden";
      getPrevListCurrency();
    } else {
      document.querySelector("body").style.overflow = "overlay";
    }
  }, [show.modal]);

  // const month = [
  //   "Янв",
  //   "Фев",
  //   "Март",
  //   "Апр",
  //   "Май",
  //   "Июнь",
  //   "Июль",
  //   "Авг",
  //   "Сен",
  //   "Окт",
  //   "Ноя",
  //   "Дек",
  // ];
  console.log(moment("2022/03/13").format("DD MMM YYYY"));

  return (
    <div
      className={`${
        show.modal ? "block" : "hidden"
      } fixed w-screen h-screen top-0 left-0 bg-black/25`}
      onClick={(e) => {
        if (e.target.offsetParent === null) {
          setShow({ modal: false, currencyName: "" });
          setPrevListCurrency([]);
        }
      }}
    >
      <div className="absolute right-0 top-0 max-w-lg w-full h-full bg-white p-2 md:p-10 overflow-scroll">
        <Close setShow={setShow} setPrevListCurrency={setPrevListCurrency} />

        <h1 className="font-bold text-4xl text-center mt-5">Курс за 10 дня</h1>
        <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg border-blue-500 relative flex flex-col gap-5">
          {show.modal && loading && (
            <div className="flex justify-center">
              <ClockLoader
                className="mx-auto"
                color={"rgb(59 130 246 / var(--tw-border-opacity))"}
                loading={loading}
                size={50}
              />
            </div>
          )}
          {show.modal &&
            !loading &&
            prevListCurrency.map((currency) => {
              if (currency.data.message) {
                return (
                  <div key={currency.date}>
                    <div className="text-xl font-bold">
                      {moment(currency.date).format("DD MMM YYYY")}
                    </div>
                    <p className="text-red-800">{currency.data.message}</p>
                  </div>
                );
              }
              return (
                <div key={currency.data.Value}>
                  <TableHeader date currencyDate={currency.date} />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-left">{currency.data.CharCode}</div>
                    <div className="text-center">
                      {currencyFormat(currency.data.Value)}
                    </div>
                    <div
                      className={`text-right ${
                        currency.data.Value - currency.data.Previous < 0
                          ? "text-red-800"
                          : "text-green-600"
                      }`}
                    >
                      {currencyFormat(
                        currency.data.Value - currency.data.Previous
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
