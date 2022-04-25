import React, { useState, useEffect } from "react";
import Basket from "./componets/Busket";
import Counter from "./componets/Counter";
import Modal from "./componets/Modal";
import { EMPTY_COUNT } from "./model/Count";
import { calcCount } from "./componets/service";
import Button from "./componets/UI/Button";
import Input from "./componets/UI/Input";
import { Count } from "./model/Count";

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
  const [newCount, setNewCount] = useState(new Count(-1, "", 0));
  const [moneyOrder, setMoneyOrder] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("transactions") !== null) {
      setMoneyOrder(JSON.parse(localStorage.getItem("transactions")));
    }
  }, []);

  const [state, setState] = useState(0);
  const [modalActiveTransaction, setModalActiveTransaction] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalHistory, setModalHistory] = useState(false);
  const [transaction, setTransaction] = useState({
    sender: EMPTY_COUNT,
    reciver: EMPTY_COUNT,
    sum: 0,
  });

  useEffect(() => {
    if (
      transaction.sender.id != transaction.reciver.id &&
      transaction.sender.id !== -1 &&
      transaction.reciver.id !== -1
    ) {
      setModalActiveTransaction(true);
    }
  }, [transaction]);

  useEffect(() => {
    const data = [];
    count.forEach((el) => {
      data.push(el.convert());
    });
    localStorage.setItem("counts", JSON.stringify(data));
  }, [count]);

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
      setModalActiveTransaction(false);
      setCount([...count]);

      setMoneyOrder([
        ...moneyOrder,
        {
          reciver: resCalc.reciver.name,
          sender: resCalc.sender.name,
          sum: transaction.sum,
        },
      ]);

      localStorage.setItem(
        "transactions",
        JSON.stringify([
          ...moneyOrder,
          {
            reciver: resCalc.reciver.name,
            sender: resCalc.sender.name,
            sum: transaction.sum,
          },
        ])
      );

      localStorage.setItem("counts", JSON.stringify(count));
      setTransaction({
        sender: EMPTY_COUNT,
        reciver: EMPTY_COUNT,
        sum: 0,
      });
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
        <div className="nav d-flex flex-column">
          <Button
            className={"createCountBtn"}
            onClick={() => setModalAdd(true)}
          >
            Создать счет
          </Button>
          <Button
            className={"createCountBtn"}
            onClick={() => setModalHistory(true)}
          >
            История переводов
          </Button>
        </div>
        <Basket removeCount={removeCount} />
      </div>
      <Modal active={modalHistory} setActive={setModalHistory}>
        <table className="table">
          <thead>
            <tr>
              <th>Отправитель</th>
              <th>Получатель</th>
              <th>Сумма перевода</th>
            </tr>
          </thead>
          <tbody>
            {moneyOrder.map((item) => {
              return (
                <tr>
                  <td>{item.sender}</td>
                  <td>{item.reciver}</td>
                  <td>{item.sum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>

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
