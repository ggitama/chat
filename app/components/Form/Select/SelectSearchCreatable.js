import React, { Component } from "react";
import AsyncSelect from "react-select/async-creatable";
import { components } from "react-select";
import Skeleton from "react-loading-skeleton";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <em className="fas fa-search" />
    </components.DropdownIndicator>
  );
};

const createOption = (label) => ({
  label: label,
  value: label,
});

export default class SelectSearchCreatable extends Component {
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

  handleScroll = async () => {
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

  

  handleCreate = (inputValue) => {
    // console.log(inputValue)
    const { onCreate } = this.props;
    const newOption = createOption(inputValue);
      // console.log(newOption)
    this.setState(
      {
        options: [newOption],
      },
      () => {
        onCreate(newOption);
      }
    );
  };

  render() {
    const {
      placeHolder,
      disabled,
      isMultiple,
      isClearable,
      backspaceRemovesValue,
      showDefault,
    } = this.props;
    const { defaultValue, tempOptions, isLoadDefault, isLoadingScroll } =
      this.state;
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        zIndex: "3",
      }),
    };
    return (
      <>
        {!showDefault || isLoadDefault ? (
          <AsyncSelect
            value={defaultValue}
            components={{ DropdownIndicator }}
            isClearable={isClearable ? true : false}
            backspaceRemovesValue={backspaceRemovesValue ? true : false}
            defaultOptions={
              showDefault
                ? isLoadingScroll
                  ? [
                      ...tempOptions,
                      {
                        value: "",
                        label: "Loading Data....",
                        isDisabled: true,
                      },
                    ]
                  : tempOptions
                : null
            }
            noOptionsMessage={(e) => (e.inputValue ? "No options" : null)}
            loadOptions={this.handleOnInputChange}
            onChange={this.handleOnChange}
            onCreateOption={this.handleCreate}
            isMulti={isMultiple}
            placeholder={placeHolder ? placeHolder : "Type to search.."}
            isDisabled={disabled}
            isOptionDisabled={(option) => option.isDisabled}
            styles={customStyles}
            onMenuScrollToBottom={() => {
              // showDefault && handleTempOptions(page + 1);
              this.handleScroll();
            }}
          />
        ) : (
          <Skeleton height="100%" />
        )}
      </>
    );
  }
}
