import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <em className="fas fa-search" />
    </components.DropdownIndicator>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    minHeight: "33px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9,
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
      isMultiple,
      isClearable,
      backspaceRemovesValue,
    } = this.props;
    const { defaultValue } = this.state;
    return (
      <>
        <AsyncSelect
          value={defaultValue}
          components={{ DropdownIndicator }}
          isClearable={isClearable ? true : false}
          backspaceRemovesValue={backspaceRemovesValue ? true : false}
          defaultOptions
          noOptionsMessage={(e) => (e.inputValue ? "No options" : null)}
          loadOptions={this.handleOnInputChange}
          onChange={this.handleOnChange}
          isMulti={isMultiple}
          placeholder={placeHolder ? placeHolder : "Type to search.."}
          isDisabled={disabled}
          isOptionDisabled={(option) => option.isDisabled}
          styles={customStyles}
        />
      </>
    );
  }
}
