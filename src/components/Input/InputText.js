import React, { useState } from "react";

function InputText({ labelTitle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, isRequired }) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    // If the value is not provided, use the defaultValue
    const updatedValue = val !== undefined ? val : defaultValue;
    updateFormValue({ updateType, value: updatedValue });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label font-semibold">
        <span className={"label-text text-base-content"}>
          {labelTitle} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </span>
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default InputText;
