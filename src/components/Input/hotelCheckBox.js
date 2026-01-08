import { useState } from "react";
import { Provider } from "react-redux";
import Select, { components } from "react-select";
const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
}) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
        alignItems: "center",
        backgroundColor: bg,
        color: "inherit",
        display: "flex "
    };

   
    const props = {
        ...innerProps,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        style
    };

    return (
        <components.Option
            {...rest}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isSelected={isSelected}
            getStyles={getStyles}
            innerProps={props}
        >
            <input type="checkbox" checked={isSelected} onChange={() => {}}/>
            {children}
        </components.Option>
    );
};

const allOptions = [
    { value: "emirates 1", label: "location 1" },
    { value: "emirates 2", label: "location 2" },
    { value: "emirates 3", label: "location 3" },
    { value: "emirates 4", label: "location 4" }
];

export default function App(props) {
    const { labelTitle, labelDescription, defaultValue,labelStyle,checked, options, updateType, updateFormValue } = props

    const [value, setValue] = useState(defaultValue || "")


    const updateValue = (newValue) => {
        updateFormValue({ updateType, value: newValue })
        setValue(newValue)
    }

    const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <div className="w-full mt-4 ">

            <label className={`label  ${labelStyle} `}>
                <div className="label-text font-semibold">{labelTitle}
                    {labelDescription && <div className="tooltip tooltip-right" data-tip={labelDescription}></div>}
                </div>
            </label>
            <Select
            classNamePrefix="mySelect" 
                defaultValue={[]}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={(options) => {
                    if (Array.isArray(options)) {
                        setSelectedOptions(options.map((opt) => opt.value));
                    }
                }}
                options={allOptions}
                components={{
                    Option: InputOption
                }}
                
                
            />

        </div>
    );
}
