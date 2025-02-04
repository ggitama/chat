// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { Select, Spin } from "antd";
// import debounce from "lodash/debounce";
// import NumberHelper from "@/util/cms/number.helper";
// import { CmsErrorLabel } from "./ErrorLabel";
// import { CmsFormLabel } from "./Label";
// import { isArray } from "lodash";

// export const DebounceSelect = ({
//   fetchOptions,
//   debounceTimeout = 800,
//   value,
//   onChange,
//   ...props
// }) => {
//   let { label, required, error, hidden } = props;

//   if (!label) return null;

//   let randomId = NumberHelper.randomId();
//   let idLabel = `check ${label}` ? label : "field";

//   if (hidden) {
//     return "";
//   }

//   console.log({value})

//   let [selectedValue, setSelectedValue] = useState(value || null);
//   let [fetching, setFetching] = useState(false);
//   let [options, setOptions] = useState([]);
//   let fetchRef = useRef(0);
//   let debounceFetcher = useMemo(() => {
//     let loadOptions = (value) => {
//       fetchRef.current += 1;
//       let fetchId = fetchRef.current;
//       setOptions([]);
//       setFetching(true);
//       fetchOptions(value).then((newOptions) => {
//         if (fetchId !== fetchRef.current) {
//           return;
//         }
//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };
//     return debounce(loadOptions, debounceTimeout);
//   }, [fetchOptions, debounceTimeout, selectedValue]);

//   const handleValueChange = (newValue) => {
//     setSelectedValue(newValue);
//     if (onChange) {
//       onChange(newValue);
//     }
//   };

//   useEffect(() => {
//     setSelectedValue(value); 
//   }, [value]);

//   return (
//     <CmsFormLabel
//       label={label}
//       id={`${idLabel} ${randomId}`}
//       required={required}
//       field
//     >
//       <Select
//         filterOption={false}
//         id={`${idLabel} ${randomId}`}
//         onSearch={debounceFetcher}
//         notFoundContent={fetching ? <Spin size="small" /> : null}
//         {...props}
//         options={options}
//         {...(selectedValue !== null ? { value: selectedValue } : {})}
//         onChange={handleValueChange}
//       />

//       <CmsErrorLabel error={error} label={label} />
//     </CmsFormLabel>
//   );
// };

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import NumberHelper from "@/util/cms/number.helper";
import { CmsErrorLabel } from "./ErrorLabel";
import { CmsFormLabel } from "./Label";

export const DebounceSelect = ({
  fetchOptions,
  debounceTimeout = 500,
  value, // nilai hotelCodes
  onChange,
  ...props
}) => {
  let { label, required, error, hidden } = props;

  if (!label) return null;

  let randomId = NumberHelper.randomId();
  let idLabel = `check ${label}` ? label : "field";

  if (hidden) {
    return "";
  }

  console.log({value})

  let [selectedValue, setSelectedValue] = useState(value || null);
  let [fetching, setFetching] = useState(false);
  let [options, setOptions] = useState([]);
  let fetchRef = useRef(0);
  let debounceFetcher = useMemo(() => {
    let loadOptions = (value) => {
      fetchRef.current += 1;
      let fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout, selectedValue]);

  useEffect(() => {
    setSelectedValue(value); 
    // Panggil API hotel jika hotelCodes (value) tidak kosong
    if (value && value.length > 0) {
      setFetching(true);
      fetchHotelData(value)
        .then((hotels) => {
          const newOptions = hotels.map((hotel) => ({
            label: hotel.responseData[0].name,
            value: hotel.responseData[0].code
          }));
          setOptions(newOptions);
          setFetching(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel data:", error);
          setFetching(false);
        });
    }
  }, [value]);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <CmsFormLabel
      label={label}
      id={`${idLabel} ${randomId}`}
      required={required}
      field
    >
      <Select
        filterOption={false}
        id={`${idLabel} ${randomId}`}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        {...(selectedValue !== null ? { value: selectedValue } : {})}
        onChange={handleValueChange}
      />

      <CmsErrorLabel error={error} label={label} />
    </CmsFormLabel>
  );
};

async function fetchHotelData(hotelCodes) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/v2/hotels/search`;
  let promises = hotelCodes.map((code) => {
    return fetch(`${url}?param=${code}`).then((response) => response.json());
  });
  return Promise.all(promises);
}
