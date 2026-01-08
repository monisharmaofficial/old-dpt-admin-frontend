import { useState } from "react";
import axios from "axios";
import config from '../../config'

function ToggleInput({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  reviewsId,
}) {
  const [value, setValue] = useState(defaultValue); // Initialize with an initial value

  const updateToogleValue = async () => {
    const newValue = value === 1 ? 0 : 1;
  
    try {
      await axios.put(`${config.baseUrl}/status-reviews/${reviewsId}`, {
        status: newValue,
      });
  
      // Update the local state and call the updateFormValue function
      setValue(newValue); // Update the value in state
      updateFormValue({ updateType, value: newValue });
    } catch (error) {
      console.error("Error updating reviews status:", error);
    }
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="cursor-pointer">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
        <input
          type="checkbox"
          className={`toggle align-items: flex-start`}
          checked={value} // Use the value from state
          onChange={(e) => updateToogleValue()}
        />
      </label>
    </div>
  );
}

export default ToggleInput;
