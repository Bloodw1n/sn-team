import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";

const Counter = ({ count, setSender, setReciver, changeName }) => {
  const dragStartHeadler = (e) => {
    setSender(count);
  };

  const dragOverHeandler = (e) => {
    e.preventDefault();
  };

  const dropHeandler = (e) => {
    e.preventDefault();
    setReciver(count);
  };

  const [modalEdit, setModalEdit] = useState(false);
  const [editCount, setEditCount] = useState({ name: count.name });

  return (
    <>
      <div
        className="count"
        draggable={true}
        onDragStart={(e) => dragStartHeadler(e)}
        onDragOver={(e) => dragOverHeandler(e)}
        onDrop={(e) => dropHeandler(e)}
      >
        {count.count}
        <br />
        {count.name}
        <img
          src="img/edit.png"
          alt="edit"
          className="cu-p"
          onClick={() => setModalEdit(true)}
        />
      </div>
      <Modal active={modalEdit} setActive={setModalEdit}>
        <Input
          value={editCount.name}
          onChange={(e) => setEditCount({ ...editCount, name: e.target.value })}
          type="text"
          placeholder="Новое имя счета"
          className="input mb-10 "
        />
        <Button
          className="button__form"
          onClick={() => {
            changeName(editCount.name, count.id);
            setModalEdit(false);
          }}
        >
          Сменить имя счета
        </Button>
      </Modal>
    </>
  );
};

export default Counter;
