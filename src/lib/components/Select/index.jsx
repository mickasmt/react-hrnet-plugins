import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Select Component
 * @param {string} name Name for the select
 * @param {Array} options Array of objects for options list
 * @param {string} selected Default value for the select
 * @param {string} placeholder Placeholder for the select
 * @param {string} styles Styles for the select ui
 * @param {function} onSelect Function for onChange on the select
 * @returns {React.ReactElement}
 */
function Select({ name, options, selected, placeholder, styles, onSelect }) {
  const [value, setValue] = useState(selected || "");

  const handleChange = (value) => {
    setValue(value);
    if (onSelect) onSelect(parseInt(value));
  };

  return (
    <select
      name={name}
      className={styles}
      defaultValue={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {!selected && (
        <option value="" disabled hidden>
          {placeholder ? placeholder : "Select an option"}
        </option>
      )}

      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  styles: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Select;
