import React from "react";

const Input = (props) => {
  return <input {...props} required />;
};

export default Input;

// const Input = () => {
//   const [state, setState] = useState("");

//   const change = (e) => {
//     setState(e.target.value);
//   };

//   return <input onClick={change} />;
// };
