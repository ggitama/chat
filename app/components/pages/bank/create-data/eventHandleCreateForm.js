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

const onChangeImage = (data, index, dataForm, onChange) => {
  const value = data;
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = value;
  onChange(updateDataForm);
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
  // console.log(data)
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = [...updateDataFilter[index].value, data];
  onChangeFilter(updateDataFilter);
};

const onSelectedMulti = (data, index, dataFilter, onChangeFilter) => {
  // console.log(data)
  const updateDataFilter = [...dataFilter];
  updateDataFilter[index].value = data;
  onChangeFilter(updateDataFilter);
};

export const eventHandleCreate = async (
  data,
  type,
  index,
  action,
  dataCreate,
  onChangeCreate
) => {
  switch (type) {
    case "Input":
      onChangeInput(data, index, dataCreate, onChangeCreate);
      break;

    case "Image":
      onChangeImage(data, index, dataCreate, onChangeCreate);
      break;

    case "Select":
      onChangeSelect(data, index, dataCreate, onChangeCreate);
      break;

    case "Date":
      onChangeDate(data, index, dataCreate, onChangeCreate);
      break;

    case "Search":
      switch (action) {
        case "onSearch":
          return await onSearchType(data, index, dataCreate);
        case "onChange":
          onSelectedSearch(data, index, dataCreate, onChangeCreate);
          break;
        default:
          return null;
      }
      break;

    case "SearchCreatable":
      switch (action) {
        case "onSearch":
          return await onSearchType(data, index, dataCreate);
        case "onChange":
          onSelectedSearch(data, index, dataCreate, onChangeCreate);
          break;
        case "onCreate":
          onSelectedSearch(data, index, dataCreate, onChangeCreate);
          break;
        default:
          return null;
      }
      break;

    case "SearchByCategory":
      switch (action) {
        case "onSelect":
          return onSelectCategory(data, index, dataCreate, onChangeCreate);
        case "onSearch":
          return onSearchType(data, index, dataCreate);
        case "onChange":
          onSelectedSearch(data, index, dataCreate, onChangeCreate);
          break;
        default:
          return null;
      }
      break;

    case "SelectCreateMulti":
      switch (action) {
        case "onCreate":
          onCreateMulti(data, index, dataCreate, onChangeCreate);
          break;
        case "onChange":
          onSelectedMulti(data, index, dataCreate, onChangeCreate);
          break;
        default:
          return null;
      }
      break;

    default:
      return null;
  }
};

export const handleValidateCreate = (formCreate) => {
  const tempDataForm = [...formCreate];
  const isError = [];
  const updatedDataCreates = {};
  tempDataForm.map((item, index) => {
    switch (item.type) {
      case "Input":
        if (!item.value) {
          if (item.required) {
            // isError.push({field: item.name, errorType: "Empty"});
            isError.push(item.label);
          }
        } else {
          updatedDataCreates[item.field] = item.value;
        }
        break;

      case "Select":
        updatedDataCreates.push({
          data: item.field,
          search: { value: item.value },
        });

        break;

      default:
        break;
    }
  });
  return { updatedDataCreates, isError, tempDataForm };
};
