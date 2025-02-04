import { DynamicFilterPage, FilterPage, TablePage, TablePagination } from "./flightComponent";

const TabChild = ({
  setIsDataLoaded,
  isShowFilter,
  setIsShowFilter,
  columnsTable,
  tableConfig,
  formFilter,
  errorFilter="",
  eventHandleFilter,
  updateFormFilter,
  handleSubmitFilter,
}) =>{

  return (
    <>
        <FilterPage 
          {
            ...{
              isShowFilter,
              setIsShowFilter
            }
          }
        />
        <DynamicFilterPage 
          {
            ...{
              isShowFilter,
              formFilter,
              errorFilter,
              dataFilter:{
                data: formFilter,
                handle: eventHandleFilter,
                onChange: updateFormFilter,
                onSubmit: handleSubmitFilter,
              }
            }
          }
        />
        <TablePage 
         {
          ...{
              tableConfig,
              columnsTable
            }
          }
        />
        <TablePagination />
    </>
  )
}
export default TabChild;