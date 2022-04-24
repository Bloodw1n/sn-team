import React, { useState } from "react";
import Basket from "./componets/Busket";
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
  const [modalActiveTransaction, setModalActiveTransaction] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [state, setState] = useState(0);
  const [newCount, setNewCount] = useState({ name: "", count: "" });

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
      updateStateCount(resCalc.sender);
      updateStateCount(resCalc.reciver);
    } catch (error) {
      console.log(error);
    }
  };

  const changeCount = (e) => {
    e.preventDefault();
    setState(e.target.value);
    setTransactionSum(Number(e.target.value));
  };

  const createCount = () => {
    const newId = count[count.length - 1].id + 1;
    setCount([...count, { ...newCount, id: newId }]);
    setNewCount({ name: "", count: "" });
    setModalAdd(false);
  };

  const removeCount = () => {
    setCount(count.filter((item) => item.id !== transaction.sender.id));
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
            setModel={setModalActiveTransaction}
          />
        ))}
      </div>
      <div className="d-flex flex-column">
        <Button className={"createCountBtn"} onClick={() => setModalAdd(true)}>
          Создать счет
        </Button>
        <Button className={"createCountBtn"}>История переводов</Button>
        <Basket removeCount={removeCount} />
      </div>

      <Modal active={modalAdd} setActive={setModalAdd}>
        <form action=""></form>
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
          type="number"
          placeholder="Начальный капитал"
          className="input mb-10"
        />
        <Button className="button__form" onClick={createCount}>
          Создать счет
        </Button>
      </Modal>
      <Modal
        active={modalActiveTransaction}
        setActive={setModalActiveTransaction}
      >
        <Input
          value={state}
          placeholder="Сумма..."
          type="text"
          className="input mb-10 text-center"
          onChange={changeCount}
        />
        <Button className="button__form" onClick={calc}>
          Перевести на выбранный счет
        </Button>
      </Modal>
    </div>
  );
}

export default App;
