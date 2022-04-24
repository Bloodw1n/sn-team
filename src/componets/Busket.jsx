import React from "react";

const Basket = ({ removeCount }) => {
  const dropHeandler = (e) => {
    e.preventDefault();
    removeCount();
  };

  const dragOverHeandler = (e) => {
    e.preventDefault();
  };

  return (
    <img
      src="/img/trash-2.svg"
      alt="trash"
      className="trashImg"
      onDragOver={(e) => dragOverHeandler(e)}
      onDrop={(e) => dropHeandler(e)}
    />
  );
};

export default Basket;
