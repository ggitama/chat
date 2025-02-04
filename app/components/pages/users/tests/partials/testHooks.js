import { useCallback, useEffect } from "react";
import { NotificationManager } from "react-notifications";

export const userTestHooks = ({
  dataFilter,
  currentPage,
  setIsLoading,
  setCurrentPage,
  setPageSize,
  setTotalData,
  setListData,
  pageSize,
  handleFetchAdminDatatable
})=>{

  const handleGetListData = useCallback(
    async (updatedCurrentPage, updatedPageSize,updatedDataFilters) => {
      const dataCurrentPage = updatedCurrentPage ? updatedCurrentPage : currentPage;
      const dataPageSize = updatedPageSize ? updatedPageSize : pageSize;
      const valueDataFilter = updatedDataFilters ? updatedDataFilters : dataFilter;
      console.log({
        valueDataFilter
      })
      
      const payload = {
        columns: valueDataFilter,
        orders: [],
        pageSize: dataPageSize,
        pageNumber: dataCurrentPage,
      };

      const tempData = [];
      const apiReponse = await handleFetchAdminDatatable(payload);
      console.log(apiReponse)
      const { resultData, pagination, isError} = apiReponse

      if (isError) {
        NotificationManager.error(isError);
      } else {
        resultData.map((rowData, index) => {
          tempData.push({
            key: "row" + index,
            ...rowData,
          });
        });
      }

      if (updatedCurrentPage) {
        setCurrentPage(updatedCurrentPage);
      }
      if (updatedPageSize) {
        setPageSize(updatedPageSize);
      }
      setTotalData(pagination.totalData);
      setListData([...tempData]);
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataFilter]
  );


  const handleChangePageSize = async (size) => {
    if (size !== pageSize) {
      setIsLoading(true);
      handleGetListData(1, size);
    }
  };

  const handleChangePage = async (page) => {
    if (page !== currentPage) {
      setIsLoading(true);
      handleGetListData(page, pageSize);
    }
  };


  return {
    handleChangePageSize,
    handleChangePage,
    handleGetListData
  }
}