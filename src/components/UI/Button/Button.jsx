import React from "react";

/**
 *
 * @param {*} props
 * @returns
 */

const Button = ({ prefix, type, children, className, key }) => {
  //   const prefix = props.prefix;
  //   const type = props.type;
  //   const children = props.children;

  return (
    <button className={className} type={type} key={key}>
      {prefix && <div>{prefix}</div>}
      {children}
    </button>
  );
};

export default Button;
