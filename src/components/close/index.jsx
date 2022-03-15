import { Wrapper } from "./styled";

const Close = ({ setShow, setPrevListCurrency }) => {
  return (
    <Wrapper
      className="close"
      onClick={() => {
        setShow({ modal: false, currencyName: "" });
        setPrevListCurrency([]);
      }}
    >
      <span></span>
      <span></span>
    </Wrapper>
  );
};

export default Close;
