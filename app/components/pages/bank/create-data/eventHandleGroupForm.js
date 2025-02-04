const onChangeSelect = (data, index, dataForm, onChange) => {
  const value = data.target.value;
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = value;
  onChange(updateDataForm);
};

const onChangeInput = (data, index, dataForm, onChange) => {
  const value = data.target.value;
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = value;
  onChange(updateDataForm);
};

const onChangeImage = (data, index, dataForm, onChange) => {
  const value = data;
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = value;
  onChange(updateDataForm);
};

const onChangeDate = (data, index, dataForm, onChange) => {
  const value = data;
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = value;
  onChange(updateDataForm);
};

const onSelectCategory = (data, index, dataForm, onChange) => {
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = "";
  updateDataForm[index].field = data;
  const selectedIndexSearchType = updateDataForm[index].options.findIndex(
    (x) => x.value === data
  );
  updateDataForm[index].searchTerm =
    updateDataForm[index].options[selectedIndexSearchType].value;
  onChange(updateDataForm);
};

const onSearchType = async (data, index, dataForm) => {
  const searchTerm = dataForm[index].searchTerm;
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

const onSelectedSearch = (data, index, dataForm, onChange) => {
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = data;
  onChange(updateDataForm);
};

const onCreateMulti = (data, index, dataForm, onChange) => {
  // console.log(data)
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = [...updateDataForm[index].value, data];
  onChange(updateDataForm);
};

const onSelectedMulti = (data, index, dataForm, onChange) => {
  // console.log(data)
  const updateDataForm = [...dataForm];
  updateDataForm[index].value = data;
  onChange(updateDataForm);
};

export const eventHandleForm = async (
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

export const handleAddFormGroup = (dataSource, setDataSource, formScheme) => {
  const tempData = [...dataSource, { dataForm: [...formScheme()] }];
  setDataSource([...tempData]);
};

export const handleRemoveFormGroup = (dataSource, setDataSource, index) => {
  const tempData = [...dataSource];
  tempData.splice(index, 1);
  setDataSource([...tempData]);
};
