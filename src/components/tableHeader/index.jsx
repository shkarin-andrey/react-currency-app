import moment from "moment";

const TableHeader = ({ children, date = false, currencyDate }) => {
  return (
    <>
      {date && (
        <>
          <div className="text-xl font-bold">
            {moment(currencyDate).format("DD MMM YYYY")}
          </div>
          <hr className="border-blue-100" />
        </>
      )}
      <div className="grid grid-cols-3 gap-2">
        <div className="font-bold text-left">Код валюты</div>
        <div className="font-bold text-center">Значение, руб</div>
        <div className="font-bold text-right">Разница</div>
      </div>
      {children}
    </>
  );
};

export default TableHeader;
