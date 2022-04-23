import React, { useEffect, useState } from "react";
import Counter from "./componets/Counter";
import Modal from "./componets/Modal";
import { Count } from "./componets/model/Count";
import { EMPTY_COUNT } from "./componets/model/Count";
import { calcCount } from "./componets/service";

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

  return (
    <div className="App mt-50">
      <div className="counts d-flex justify-center">
        {count.map((item) => (
          <Counter
            count={item}
            setSender={setTransactionSender}
            setReciver={setTransactionReciver}
            setModel={setModalActive}
          />
        ))}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        addCash={calc}
        setSum={setTransactionSum}
      />
    </div>
  );
}

export default App;
