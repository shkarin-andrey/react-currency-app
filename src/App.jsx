import { useState } from "react";
import Modal from "./components/modal";
import Table from "./components/table";

function App() {
  const [show, setShow] = useState({ modal: false, currencyName: "" });
  return (
    <div className="App">
      <Table setShow={setShow} />
      <Modal show={show} setShow={setShow} />
    </div>
  );
}

export default App;
