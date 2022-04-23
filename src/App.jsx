import React, { useState } from "react";
import Counter from "./componets/Counter";
import Modal from "./componets/Modal";
import { EMPTY_COUNT } from "./componets/model/Count";
import { calcCount } from "./componets/service";
import Button from "./componets/UI/Button";
import Input from "./componets/UI/Input";

function App() {
  const [count, setCount] = useState([
    {
      id: 1,
      count: 100,
      name: "счет 1",
    },
    {
      id: 2,
      count: 100,
      name: "счет 2",
    },
    {
      id: 3,
      count: 100,
      name: "счет 3",
    },
  ]);

  const [modalActive, setModalActive] = useState(false);

  const [transaction, setTransaction] = useState({
    sender: EMPTY_COUNT,
    reciver: EMPTY_COUNT,
    sum: 0,
  });

  const setTransactionSender = (idNewSender) => {
    setTransaction({ ...transaction, sender: idNewSender });
  };

  const setTransactionReciver = (idNewReciver) => {
    setTransaction({ ...transaction, reciver: idNewReciver });
  };

  const setTransactionSum = (newSum) => {
    setTransaction({ ...transaction, sum: newSum });
  };

  const updateStateCount = (newObject) => {
    let newState = count;
    const index = newState.findIndex((el) => el.id == newObject.id);
    newState[index] = newObject;
    setCount(newState);
  };

  const calc = () => {
    try {
      const resCalc = calcCount(
        transaction.sender,
        transaction.reciver,
        transaction.sum
      );
      console.log(resCalc);
      updateStateCount(resCalc.sender);
      updateStateCount(resCalc.reciver);
    } catch (error) {
      console.log(error);
    }
  };

  const [state, setState] = useState(0);

  const change = (e) => {
    e.preventDefault();
    // if (num.test(e.target.value)) {
    //   setState(e.target.value);
    //   setSum(e.target.value);
    // }
    setState(e.target.value);
    setTransactionSum(Number(e.target.value));
  };

  const [newCount, setNewCount] = useState({ name: "", count: "" });

  const createCount = () => {
    setCount([...count, { ...newCount, id: Date.now() }]);
    setNewCount({ name: "", count: "" });
    setModalActive(false);

    console.log(newCount);
  };

  return (
    <div className="App mt-50 d-flex justify-center">
      <div className="counts d-flex justify-center flex-wrap">
        {count.map((item, index) => (
          <Counter
            count={item}
            name={index + 1}
            setSender={setTransactionSender}
            setReciver={setTransactionReciver}
            setModel={setModalActive}
          />
        ))}
      </div>
      <div className="d-flex flex-column">
        <Button
          className={"createCountBtn"}
          onClick={() => setModalActive(true)}
        >
          Создать счет
        </Button>
        <Button className={"createCountBtn"}>История переводов</Button>
        <span>Здесь будет корзина</span>
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
        <Input
          value={newCount.name}
          onChange={(e) => setNewCount({ ...newCount, name: e.target.value })}
          type="text"
          placeholder="Название счета"
          className="input mb-10 "
        />
        <Input
          value={newCount.count}
          onChange={(e) => setNewCount({ ...newCount, count: e.target.value })}
          type="text"
          placeholder="Начальный капитал"
          className="input mb-10"
        />
        <Button className="button__form" onClick={createCount}>
          Создать счет
        </Button>
      </Modal>
      {/* Придумать условие отрисовки */}
      {/* <Modal active={modalActive} setActive={setModalActive}>
        <Input
          value={state}
          placeholder="Сумма..."
          type="text"
          className="input mb-10 text-center"
          onChange={change}
        />
        <button onClick={calc}>Перевести на выбранный счет</button>
      </Modal> */}
    </div>
  );
}

export default App;
