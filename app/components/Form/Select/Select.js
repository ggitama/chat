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

export default class SelectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: this.props.defaultValue,
      isRerender: this.props.isRerender,
      tempOptions: [],
      page: 1,
      isLoadDefault: false,
      isLoadScroll: false,
      inputValue: "",
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

  componentDidMount = async () => {
    if (this.props.showDefault) {
      const getOptions = await this.handleTempOptions(1);
      if (getOptions && getOptions.length > 0) {
        this.setState({
          tempOptions: getOptions,
          isLoadDefault: true,
        });
      } else {
        this.setState({ isLoadDefault: true });
      }
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
      this.setState({
        inputValue: inputValue,
      });
    } else {
      callback([{ value: "", label: "Type to search..", isDisabled: true }]);
      this.setState({
        inputValue: inputValue,
      });
    }
  };

  handleTempOptions = async (page) => {
    if (this.state.inputValue === "") {
      const { tempOptions } = this.state;
      let options = page > 1 ? tempOptions : null;
      const getOptions = await this.props.onShowDefault(page);
      if (getOptions && getOptions.length > 0) {
        options = page > 1 ? tempOptions.concat(getOptions) : getOptions;
      }
      return options;
    }
  };

  handleTest = async () => {
    if (this.props.showDefault) {
      this.setState(
        {
          isLoadingScroll: true,
        },
        async () => {
          const getOptions = await this.handleTempOptions(this.state.page + 1);
          if (getOptions && getOptions.length > 0) {
            this.setState({
              tempOptions: getOptions,
              page: this.state.page + 1,
              isLoadingScroll: false,
            });
          } else {
            this.setState({
              isLoadingScroll: false,
            });
          }
        }
      );
    }
  };

  render() {
    const {
      placeHolder,
      disabled,
      isClearable,
      backspaceRemovesValue,
      options,
    } = this.props;
    const { defaultValue } = this.state;
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        zIndex: "3",
      }),
    };
    return (
      <>
        <Select
          value={defaultValue}
          components={{ DropdownIndicator }}
          isClearable={isClearable ? true : false}
          backspaceRemovesValue={backspaceRemovesValue ? true : false}
          options={options}
          noOptionsMessage={(e) => (e.inputValue ? "No options" : null)}
          onChange={this.handleOnChange}
          placeholder={placeHolder ? placeHolder : "Type to search.."}
          isDisabled={disabled}
          isOptionDisabled={(option) => option.isDisabled}
          styles={customStyles}
        />
      </>
    );
  }
}
