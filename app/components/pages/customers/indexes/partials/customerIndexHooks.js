import { useCallback, useEffect } from "react";
import { NotificationManager } from "react-notifications";

export const customerIndexHooks = ({
  dataFilter,
  currentPage,
  setIsLoading,
  setCurrentPage,
  setPageSize,
  setTotalData,
  setListData,
  pageSize,
  handleFetchCustomerDatatable
})=>{

  const handleGetListData = useCallback(
    async (updatedCurrentPage, updatedPageSize,updatedDataFilters) => {
      const dataCurrentPage = updatedCurrentPage ? updatedCurrentPage : currentPage;
      const dataPageSize = updatedPageSize ? updatedPageSize : pageSize;
      const valueDataFilter = updatedDataFilters ? updatedDataFilters : dataFilter;
      
      const payload = {
        columns: valueDataFilter,
        orders: [],
        pageSize: dataPageSize,
        pageNumber: dataCurrentPage,
      };

      const tempData = [];
      const apiReponse = await handleFetchCustomerDatatable(payload);
      const { resultData, pagination, isError} = apiReponse

      console.log(resultData,isError)
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