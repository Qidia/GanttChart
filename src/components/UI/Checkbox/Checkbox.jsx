import React, { useState } from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange && onChange(newValue);
  };

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="m-r-10"
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
