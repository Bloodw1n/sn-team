import React, { useState, useEffect } from "react";
import Basket from "./componets/Busket";
import Counter from "./componets/Counter";
import Modal from "./componets/Modal";
import { EMPTY_COUNT } from "./componets/model/Count";
import { calcCount } from "./componets/service";
import Button from "./componets/UI/Button";
import Input from "./componets/UI/Input";
import { Count } from "./componets/model/Count";

function App() {
  const factoryCount = () => {
    const data = JSON.parse(localStorage.getItem("counts"));
    if (data === null) {
      return [
        new Count(1, "счет 1", 100),
        new Count(2, "счет 2", 100),
        new Count(3, "счет 3", 100),
      ];
    }
    const newCount = [];
    data.forEach((el) => {
      newCount.push(new Count(el.id, el.name, el.count));
    });
    return newCount;
  };

  const [count, setCount] = useState(factoryCount());

  useEffect(() => {
    const data = [];
    count.forEach((el) => {
      data.push(el.convert());
    });
    localStorage.setItem("counts", JSON.stringify(data));
  }, [count]);

  const [modalActiveTransaction, setModalActiveTransaction] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [state, setState] = useState(0);
  const [newCount, setNewCount] = useState(new Count(-1, "", 0));

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
      setCount([...count]);
      localStorage.setItem("counts", JSON.stringify(count));
    } catch (error) {
      console.log(error);
    }
  };

  const changeCount = (e) => {
    e.preventDefault();
    setState(e.target.value);
    setTransactionSum(Number(e.target.value));
  };

  const changeName = (newName, idCount) => {
    let newState = count;
    const index = newState.findIndex((el) => el.id == idCount);
    newState[index].name = newName;
    setCount(newState);
  };

  const createCount = () => {
    const newId = count[count.length - 1].id + 1;
    setCount([...count, new Count(newId, newCount.name, newCount.count)]);
    setNewCount(new Count(-1, "", ""));
    setModalAdd(false);
  };

  const removeCount = () => {
    setCount(count.filter((item) => item.id !== transaction.sender.id));
  };

  return (
    <div className="App mt-50 d-flex justify-center">
      <div className="counts d-flex justify-center flex-wrap">
        {count.map((item) => (
          <Counter
            count={item}
            setSender={setTransactionSender}
            setReciver={setTransactionReciver}
            setModel={setModalActiveTransaction}
            changeName={changeName}
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
        <Input
          value={newCount.name}
          onChange={(e) => setNewCount({ ...newCount, name: e.target.value })}
          type="text"
          placeholder="Название счета"
          className="input mb-10 "
        />
        <Input
          value={newCount.count}
          onChange={(e) =>
            setNewCount({ ...newCount, count: Number(e.target.value) })
          }
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
