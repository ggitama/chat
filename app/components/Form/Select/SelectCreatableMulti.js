import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
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

const createOption = (label) => ({
  label: label,
  value: label,
});

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
    width: "70px",
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
      options: [],
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

  handleCreate = (inputValue) => {
    // console.log(inputValue)
    const { onCreate } = this.props;
    const { options } = this.state;
    const newOption = createOption(inputValue);
      // console.log(newOption)
    this.setState(
      {
        options: [...options, newOption],
      },
      () => {
        onCreate(newOption);
      }
    );
  };

  //   handleOnInputChange = async (inputValue, callback) => {
  //     const { onSearch, isRerender } = this.props;
  //     if (inputValue.length > 0) {
  //       const options = await onSearch(inputValue, isRerender);
  //       callback(options);
  //       // }
  //     } else {
  //       callback([{ value: "", label: "Type to search", isDisabled: true }]);
  //     }
  //   };

  render() {
    const { placeHolder, disabled, isClearable, backspaceRemovesValue } =
      this.props;
    const { defaultValue, options } = this.state;

    return (
      <>
        <CreatableSelect
          value={defaultValue}
          components={{
            DropdownIndicator,
            MultiValueContainer,
            ValueContainer,
          }}
          isClearable={isClearable ? true : false}
          backspaceRemovesValue={backspaceRemovesValue ? true : false}
          defaultOptions
          //   loadOptions={this.handleOnInputChange}
          onCreateOption={this.handleCreate}
          onChange={this.handleOnChange}
          ignoreCase={false}
          isMulti
          placeholder={placeHolder}
          isDisabled={disabled}
          isOptionDisabled={(option) => option.isDisabled}
          styles={customStyles}
          options={options}
        />
      </>
    );
  }
}
