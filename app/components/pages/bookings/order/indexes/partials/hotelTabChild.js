import { DynamicFilterPage, FilterPage, TablePage, TablePagination } from "./flightComponent";

const TabChild = ({
  setIsDataLoaded,
  isShowFilter,
  setIsShowFilter,
  columnsTable,
  tableConfig,
  formFilter=[],
  errorFilter="",
  eventHandleFilter,
  updateFormFilter,
  handleSubmitFilter,
}) =>{
  let dataFilter = {
    handle: eventHandleFilter,
    data: formFilter,
    onChange: updateFormFilter,
    onSubmit: handleSubmitFilter,
  }

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
              dataFilter
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