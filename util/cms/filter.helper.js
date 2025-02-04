import TimeHelper from "./time.helper";

const onChangeSelect = (data, index, dataFilter, onChangeFilter) => {
  const value = data.target.value;
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = value;
  onChangeFilter(updateDataFilter);
};

const onChangeInput = (data, index, dataFilter, onChangeFilter) => {
  const value = data.target.value;
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = value;
  onChangeFilter(updateDataFilter);
};

const onChangeDate = (data, index, dataFilter, onChangeFilter) => {
  const value = data;
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = value;
  onChangeFilter(updateDataFilter);
};

const onSelectCategory = (data, index, dataFilter, onChangeFilter) => {
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = "";
  updateDataFilter[index].field = data;
  const selectedIndexSearchType = updateDataFilter[index].options.findIndex(
    (x) => x.value === data
  );
  updateDataFilter[index].searchTerm =
    updateDataFilter[index].options[selectedIndexSearchType].value;
  onChangeFilter(updateDataFilter);
};

const onSearchType = async (data, index, dataFilter) => {
  const searchTerm = dataFilter[index].searchTerm;
  let payload;
  let options = [];

  switch (searchTerm) {
    default:
      if (!data.includes("create")) {
        for (let i = 1; i <= 5; i++) {
          options.push({
            label: `label ${data} ${i}`,
            value: `value ${data} ${i}`,
          });
        }
      } else {
        options = false;
      }
      break;
  }

  return options;
};

const onSelectedSearch = (data, index, dataFilter, onChangeFilter) => {
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = data;
  onChangeFilter(updateDataFilter);
};

const onCreateMulti = (data, index, dataFilter, onChangeFilter) => {
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = [...updateDataFilter[index].value, data];
  onChangeFilter(updateDataFilter);
};

const onSelectedMulti = (data, index, dataFilter, onChangeFilter) => {
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = data;
  onChangeFilter(updateDataFilter);
};

export const handlerFilterEvents = async (
  data,
  type,
  index,
  action,
  dataFilter,
  onChangeFilter
) => {
  switch (type) {
    case "Input":
      onChangeInput(data, index, dataFilter, onChangeFilter);
      break;

    case "Select":
      onChangeSelect(data, index, dataFilter, onChangeFilter);
      break;

    case "Date":
      onChangeDate(data, index, dataFilter, onChangeFilter);
      break;

    case "Search":
      switch (action) {
        case "onSearch":
          return await onSearchType(data, index, dataFilter);
        case "onChange":
          onSelectedSearch(data, index, dataFilter, onChangeFilter);
          break;
        default:
          return null;
      }
      break;

    case "SearchCreatable":
      switch (action) {
        case "onSearch":
          return await onSearchType(data, index, dataFilter);
        case "onChange":
          onSelectedSearch(data, index, dataFilter, onChangeFilter);
          break;
        case "onCreate":
          onSelectedSearch(data, index, dataFilter, onChangeFilter);
          break;
        default:
          return null;
      }
      break;

    case "SearchByCategory":
      switch (action) {
        case "onSelect":
          return onSelectCategory(data, index, dataFilter, onChangeFilter);
        case "onSearch":
          return onSearchType(data, index, dataFilter);
        case "onChange":
          onSelectedSearch(data, index, dataFilter, onChangeFilter);
          break;
        default:
          return null;
      }
      break;

    case "SelectCreateMulti":
      switch (action) {
        case "onCreate":
          onCreateMulti(data, index, dataFilter, onChangeFilter);
          break;
        case "onChange":
          onSelectedMulti(data, index, dataFilter, onChangeFilter);
          break;
        default:
          return null;
      }
      break;

    default:
      return null;
  }
};

export const handlerFilterValidate = (formFilter) => {
  const tempDataForm = [...formFilter];
  const isError = [];
  const updatedDataFilters = [];
  tempDataForm.map((item, index) => {
    let hasError = false
    switch (item.type) {
      case "Input":
        if (!item.value && item.required) {
          hasError = item.label
        }
        break;

      case "Select":

        break;

      default:
        break;
    }
    
    if(hasError){
      isError.push(hasError)
    }else{
      updatedDataFilters.push({
        data: item.field,
        search: { value: item.value },
      });
    }

  });
  return { updatedDataFilters, isError, tempDataForm };
};

export const handlerRemapData = (resultData,isError)=>{
  const tempData = []
  if(isError || !resultData) return tempData

  resultData.map((row,index)=>{
    tempData.push(dataMapperRow(row,index))
  })
  return tempData
}

const dataMapperRow = (row,index)=>{
  return {
    key:`row${index}`,
    ...row
  }
}

const filterDateFormated = (
  fields=[],dataFilters=[],
  options
)=>{
  let {
    arrayKey="data", 
    searchKey="search",
    dataKey="value",
    formatter=TimeHelper.formatYmd,
    dateSeparator="-"
  } = (options) ? options : {}

  let lookUp = {}
  if(!dataFilters.length) return lookUp
  
  dataFilters.filter(row=>{
    return fields.includes(row[arrayKey])
  }).forEach((row,index)=>{
    let key = row[arrayKey]
    let dataValue = row[searchKey][dataKey]
    
    let YmdDate = dataValue
    if(dataValue){
      YmdDate = formatter(dataValue,dateSeparator)
    } 

    lookUp[key] = YmdDate
  })

  return lookUp
}

const filterMapDateFormated = (dateFilter,dataFilters,options)=>{
  let {
    arrayKey="data", 
    searchKey="search",
    dataKey="value"
  } = (options) ? options : {}

  return dataFilters.map(row=>{
    let key = row[arrayKey]
    if(!dateFilter[key]){
      return row
    }
    row[searchKey][dataKey] = dateFilter[key]
    return row
  })
}

const FilterHelper = {
  handlerFilterEvents,
  handlerFilterValidate,
  filterDateFormated,
  filterMapDateFormated
}

// alias so it's shorter 
// and more readble in circular access
const _this = FilterHelper
export default FilterHelper