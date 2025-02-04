import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import NumberHelper from "@/util/cms/number.helper";
import { CmsErrorLabel } from "./ErrorLabel";
import { CmsFormLabel } from "./Label";

const searchTourData = debounce((value, tourData, setSearchResults) => {
  try {
    console.log("Fetching tour data with debounce");
    const results = tourData.filter((item) =>
      item.code.toLowerCase().includes(value.toLowerCase()) ||
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  } catch (error) {
    console.error("Ada masalah dalam pencarian data tur:", error);
    setSearchResults([]);
  }
}, 800);

export const CmsSelectMultiple = (props) => {
  const {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    error,
    defaultValue,
    hidden,
    isSingleLine,
    placeholder,
    listData,
    type,
  } = props;

  if (!label) return null;

  const randomId = NumberHelper.randomId();
  const idLabel = `check ${label}` ? label : "field";
  const selectClassName = !isSingleLine ? "ant-input" : "";

  if (hidden) {
    return "";
  }

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (listData && listData.length > 0) {
      setSearchResults(listData);
    }
  }, [listData]);

  const handleSearch = (value) => {
    setSearchValue(value);
    setFetching(true);
    searchTourData(value, listData, (results) => {
      const limitedResults = results.slice(0, 5);
      setSearchResults(limitedResults);
      setFetching(false);
    });
  };

  const handleChange = (selectedValues) => {
    console.log({selectedValues})
    onChange(selectedValues);
  };
  
  const formattedOptions = searchResults.map((item) => {
      let value;
      if (type == "tour" || type == "flight" || type == "hotel") {
        value = item.code;
      } else if(type == "user"){
        value = item.value;
      } else{
        value = item.name;
      }

      let labels;

      if(type == "tour" || type == "flight"){
        labels = `${item.code} - ${item.name}`;
      }else if(type == 'user'){
        labels = item.label
      }else{
        labels = item.name;
      }

      return {
          label: labels,
          value: value
      };
  });

  return (
    <CmsFormLabel
      label={label}
      id={`${idLabel} ${randomId}`}
      required={required}
      isSingleLine={isSingleLine}
      field
    >
      <Select
        placeholder={placeholder}
        disabled={disabled}
        id={`${idLabel} ${randomId}`}
        className={`${selectClassName} ${className}`}
        {...(value !== null && { value })}
        required={required}
        options={formattedOptions}
        onChange={handleChange}
        mode="multiple"
        showSearch
        filterOption={false}
        onSearch={handleSearch}
        notFoundContent={fetching ? <Spin size="small" /> : null}
      />

      <CmsErrorLabel error={error} label={label} />
    </CmsFormLabel>
  );
};
