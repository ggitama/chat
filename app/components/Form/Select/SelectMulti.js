import React, { Component } from "react";
import Select from "react-select";
import { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <em className="fas fa-search" />
    </components.DropdownIndicator>
  );
};

const MultiValueContainer = (props) => {
  return (
    <span title={props.data.label}>
      <components.MultiValueContainer {...props} />
    </span>
  );
};

const ValueContainer = ({ children, ...props }) => (
  <div className="w-100" style={{ display: "grid" }}>
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  </div>
);

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "unset",
    minHeight: "35px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9,
    position: "absolute",
  }),
  multiValue: (provided) => {
    return {
      ...provided,
      background: "#2bbecb",
      borderRadius: "12px",
      padding: "0 4px",
      height: "28px",
      alignItems: "center",
    };
  },

  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
    background: "#2bbecb",
    width: "120px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "8px",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    background: "red",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    ":hover": {
      color: "white",
      background: "red",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    flexWrap: "nowrap",
    overflowX: "auto",
  }),
};

export default class SelectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: this.props.defaultValue,
      isRerender: this.props.isRerender,
    };
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.defaultValue !== this.props.defaultValue) {
      this.setState({ defaultValue: this.props.defaultValue });
    }
    if (previousProps.isRerender !== this.props.isRerender) {
      this.setState({
        isRerender: this.props.isRerender,
        defaultValue: this.props.defaultValue,
      });
    }
  };

  handleOnChange = (option, { action }) => {
    const { onChange, dataIndex, onRemove } = this.props;
    if (action === "select-option") {
      if (dataIndex >= 0) {
        onChange(option, dataIndex);
      } else {
        onChange(option);
      }
    } else if (action === "remove-value") {
      onRemove(option);
    }
  };

  handleOnInputChange = async (inputValue, callback) => {
    const { onSearch, isRerender } = this.props;
    if (inputValue.length > 0) {
      const options = await onSearch(inputValue, isRerender);
      callback(options);
      // }
    } else {
      callback([{ value: "", label: "Type to search", isDisabled: true }]);
    }
  };

  render() {
    const {
      placeHolder,
      disabled,
      isClearable,
      backspaceRemovesValue,
      options
    } = this.props;
    const { defaultValue } = this.state;

    return (
      <>
        <Select
          value={defaultValue}
          components={{
            DropdownIndicator,
            MultiValueContainer,
            ValueContainer,
          }}
          isClearable={isClearable ? true : false}
          backspaceRemovesValue={backspaceRemovesValue ? true : false}
          noOptionsMessage={(e) => (e.inputValue ? "No options" : null)}
          options={options}
          onChange={this.handleOnChange}
          isMulti={true}
          placeholder={placeHolder}
          isDisabled={disabled}
          isOptionDisabled={(option) => option.isDisabled}
          styles={customStyles}
        />
      </>
    );
  }
}
