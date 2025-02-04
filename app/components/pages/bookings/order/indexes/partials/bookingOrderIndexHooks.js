import { useCallback, useEffect } from "react";
import { NotificationManager } from "react-notifications";

export const hooks = (options)=>{
  let {
    isLoading,
    isShowFilter,
    whichShowFilter,
    setIsLoading,
    setHasLoadedData,
    setChildColumnTable,
    columns:columnsByChildType={},
    handleValidateFilter,
    formFilter,
    setErrorFilter,
    setDataFilter,
    dataFilter,
    setFormFilter
  } = (options) ? options : {}

  const handleDataLoaded = async (childType="flight")=>{
    setIsLoading(false)
    setHasLoadedData(childType)
  }

  const updateFormFilter = (data) => {
    console.log(data)
    setFormFilter([...data]);
  };

  const handleFetchFilter = useCallback(
    async () => {
      setIsLoading(true);
      handleDataLoaded(1, pageSize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmitFilter = () => {
    const { updatedDataFilters, isError } =
      handleValidateFilter(formFilter);
    if (isError.length > 0) {
      const errorMessage = `${isError.join(",")} can't be empty`
      setErrorFilter(errorMessage)
    } else {
      setErrorFilter("")
      setDataFilter([...updatedDataFilters]);
      handleFetchFilter();
    }
  };


  return {
    handleDataLoaded,
    updateFormFilter,
    handleSubmitFilter
  }
}