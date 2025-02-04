import { 
  CardExtraModalCreate, ModalCreateForm 
} from "@/components/pages/users/tests/partials/modalCreateForm";
import { Loader, TablePage, FilterPage, DynamicFilterPage, TablePagination } from "@/components/pages/users/tests/partials/testComponent";
import { userTestHooks } from "@/components/pages/users/tests/partials/testHooks";
import { columnsTable, dataTest, formFilterScheme } from "@/components/pages/users/tests/user-test";
import { Card} from "antd"
import { useEffect, useState } from "react";
import { handleFetchAdminDatatable } from "app/api/helper";


const UserIndexPage = (props)=>{
  const pageTitle = "User Management"
  const { screenHeight, screenWidth } = props;
  const heightTable = screenHeight - 380;
  const tableConfig = {
    bordered: true,
    pagination: false,
    size: "small",
    showHeader: true,
    scroll: { y: heightTable },
  };

  const [isModalCreateFormShow, setIsModalCreateFormShow] = useState(false)
  const [isModalUpdateStatusShow, setIsModalUpdateStatusShow] = useState(false);
  const [isModalEditFormShow, setIsModalEditFormShow] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState();
  const [totalData, setTotalData] = useState(500);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowFilter, setIsShowFilter] = useState(true);
  const [dataFilter, setDataFilter] = useState([]);
  const [formFilter, setFormFilter] = useState([]);
  const [errorFilter, setErrorFilter] = useState("");

  useEffect(() => {
    setFormFilter([...formFilterScheme()]);
  }, []);
  
  const {
    handleChangePageSize,
    handleChangePage,
    handleGetListData
  } = userTestHooks({
    dataFilter,
    formFilterScheme,
    currentPage,
    setIsLoading,
    setCurrentPage,
    setPageSize,
    setTotalData,
    setListData,
    setFormFilter,
    pageSize,
    handleFetchAdminDatatable
  })

  useEffect(() => {
    setIsLoading(true);
    handleGetListData(1,pageSize);
  }, [handleGetListData]);

  const showLoader = isLoading && !listData
  // const showLoader = false
  const hasDynamicFilter = formFilter.length && isShowFilter

  
  return (
    <>
      <Card
        title={pageTitle}
        extra={(
          <CardExtraModalCreate {
            ...{
              setIsModalCreateFormShow
            }
          }/>
          )
        }
      >
      { showLoader ? (<Loader heightTable={heightTable} />) : (
          <>
            <FilterPage
              {
                ...{
                  isShowFilter,
                  setIsShowFilter,
                }
              }
            />
            { hasDynamicFilter && (
              <DynamicFilterPage 
                {
                  ...{
                    formFilter,
                    errorFilter,
                  }
                }
              />
            )}
            <TablePage 
              {
                ...{
                  tableConfig,
                  columnsTable,
                  setIsModalUpdateStatusShow,
                  setIsModalEditFormShow,
                  listData,
                  isLoading,
                  currentPage,
                  pageSize,
                }
              }
            />
            <TablePagination 
              {
                ...{
                  pageSize,
                  currentPage,
                  totalData,
                  isLoading,
                  handleChangePageSize,
                  handleChangePage
                }
              }
            />
          </>
        ) 
      }
      </Card>
      <ModalCreateForm { 
        ...{
            isModalShow:isModalCreateFormShow
          }
        }
      />
    </>
  )
}

export default UserIndexPage