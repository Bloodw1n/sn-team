const Counter = ({ count, setSender, setReciver, setModel }) => {
  const dragStartHeadler = (e) => {
    setSender(count);
  };

  const dragEnterHeandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHeandler = (e) => {
    e.preventDefault();
  };

  const dragOverHeandler = (e) => {
    e.preventDefault();
  };

  const dropHeandler = (e) => {
    e.preventDefault();
    setModel(true);
    setReciver(count);
  };

  return (
    <div
      className="count"
      draggable={true}
      onDragStart={(e) => dragStartHeadler(e)}
      onDragEnter={(e) => dragEnterHeandler(e)}
      onDragLeave={(e) => dragLeaveHeandler(e)}
      onDragOver={(e) => dragOverHeandler(e)}
      onDrop={(e) => dropHeandler(e)}
    >
      {count.count}
      <br />
      {count.name}
    </div>
  );
};

export default Counter;
