import React from "react";
import { useState } from "react";

const Modal = ({ active, setActive, addCash, setSum }) => {
  const [state, setState] = useState(0);

  const change = (e) => {
    e.preventDefault();
    // if (num.test(e.target.value)) {
    //   setState(e.target.value);
    //   setSum(e.target.value);
    // }
    setState(e.target.value);
    setSum(Number(e.target.value));
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={state}
          placeholder="Сумма..."
          type="text"
          className="input mb-10 text-center"
          onChange={change}
        />
        <button onClick={() => addCash()}>Перевести на выбранный счет</button>
      </div>
    </div>
  );
};

//написать регулярное ваыражени для проверки строки на цаифры
//const num = new RegExp("+[0-9]");

export default Modal;
