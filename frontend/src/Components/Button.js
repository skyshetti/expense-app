import React from "react";
import "./button.css";

const Button = props => {
  const { buttonName } = props;
  return (
    <div>
      <button className='button'>{buttonName}</button>
    </div>
  );
};

export default Button;
