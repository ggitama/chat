

export const SortableHeader = (props) => {
  const { dataSource, onChange, dataKey, title } = props;
  const renderButton = () => {
    const indexSortTable = dataSource.findIndex(
      (dataSort) => dataSort.key === dataKey
    );
    if (indexSortTable >= 0) {
      return (
        <>
          <button
            className="gx-btn-clear gx-mx-2"
            onClick={() => handleChangeSort()}
          >
            {dataSource[indexSortTable].value === "DESC" ? (
              <i class="fa-solid fa-arrow-up-wide-short" />
            ) : (
              <i class="fa-solid fa-arrow-down-wide-short" />
            )}
          </button>
          <button
            className="gx-btn-clear gx-mx-2"
            onClick={() => handleClearSort()}
          >
            <i class="fa-solid fa-circle-xmark" style={{ color: "red" }} />
          </button>
        </>
      );
    } else {
      return (
        <button
          className="gx-btn-clear gx-mx-2"
          onClick={() => handleChangeSort()}
        >
          <i class="fa-solid fa-sort" />
        </button>
      );
    }
  };

  const handleChangeSort = () => {
    const tempData = [...dataSource];
    const indexSortTable = dataSource.findIndex(
      (dataSort) => dataSort.key === dataKey
    );

    if (indexSortTable >= 0) {
      tempData[indexSortTable].value =
        tempData[indexSortTable].value === "ASC" ? "DESC" : "ASC";
    } else {
      tempData.push({ key: dataKey, value: "DESC" });
    }

    onChange([...tempData]);
  };

  const handleClearSort = () => {
    const tempData = [...dataSource];
    const indexSortTable = dataSource.findIndex(
      (dataSort) => dataSort.key === dataKey
    );

    tempData.splice(indexSortTable, 1);

    onChange([...tempData]);
  };

  return (
    <div className="d-flex justify-content-between">
      <div>{title}</div>
      <div className="d-flex">{renderButton()}</div>
    </div>
  );
};
