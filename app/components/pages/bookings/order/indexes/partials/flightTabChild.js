import { DynamicFilterPage, FilterPage, TablePage, TablePagination } from "./flightComponent";

const FlightTabChild = ({
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
              eventHandleFilter,
              updateFormFilter,
              handleSubmitFilter
            }
          }
        />
        <TablePage 
         {
          ...{
              tableConfig,
              columnsTable,
            }
          }
        />
        <TablePagination />
    </>
  )
}
export default FlightTabChild;