import {
  MainLoader,
  FilterPage,
  TablePage,
  TablePagination,
  TabNav,
  DynamicFilterPage,
} from "@/components/pages/vouchers/indexes/mainDatatable";

import {
  handlerFilterEvents,
  handlerFilterValidate,
  handlerRemapData,
} from "@/components/pages/vouchers/indexes/handlersMainDatatable";

import {
  columnsTable as columnsVoucherAntavayaTable,
  schemeFilterTable as schemeFilterVoucherAntavayaTable,
} from "@/components/pages/vouchers/indexes/schemas/voucher-antavaya-scheme";

import {
  columnsTable as columnsVoucherNewUserTable,
} from "@/components/pages/vouchers/indexes/schemas/voucher-new-user-scheme";

import {
  CmsLoader,
  CmsCrumbs,
  CmsTable,
  CmsFilter,
  CmsTableRow,
} from "@/components/Cms";

import {
  columnsTable,
  initialState,
  crumbItems,
  useMainHooks,
  useModalEditHooks,
  reducer,
  ModalEditContent,
  useModalCreateHooks,
  ModalCreateContent,
} from "@/components/pages/vouchers/indexes";

import { 
  ModalDeleteContent 
} from "@/components/pages/vouchers/indexes/modals/ModalDeleteContent";
import { 
  useModalDeleteHooks 
} from "@/components/pages/vouchers/indexes/hooks/modal-delete.hooks";
import {
  eventHandleFilter,
  handleValidateFilter,
} from "@/components/pages/list-data/eventHandleFIlterForm";

import { useCallback, useEffect, useState, useReducer } from "react";
import { MainCard } from "@/components/pages/users/test-indexes/mainCard";
import { getHeightTable, getTableConfig } from "@/components/pages/page-scheme";
import { handleFetchVoucherManagementDatatable } from "app/api/helper";
import { NotificationManager } from "react-notifications";
import { Row, Card, Collapse, Popover } from "antd";
import { MinusOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { CmsModal } from "@/components/Cms/Modals";
import { formFilterScheme } from "@/components/pages/vouchers/list-data/voucherScheme";

const UserIndexPage = (props) => {
  const pageTitle = "Voucher Discount";
  const heightTable = getHeightTable(props);
  const tableConfig = getTableConfig(heightTable);

  const [isLoading, setIsLoading] = useState(true);
  const [formFilter, setFormFilter] = useState([]);
  const [errorFilter, setErrorFilter] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const [isOnLoading, setIsOnLoading] = useState(true);
  const [listData, setListData] = useState();

  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filterFormInput, setFilterFormInput] = useState(false);
  const [filterFormData, setFilterFormData] = useState([]);
  const [errorFilterMessage, setErrorFilterMessage] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(500);

  const [activeTab, setActiveTab] = useState(["voucher_antavaya"]);
  const columnsTable = columnsVoucherAntavayaTable;

  const handlerFilterSchema = (activeTab) => {
    let schema = schemeFilterVoucherAntavayaTable;
    switch (activeTab) {
      case "voucher_new_user":schema = schemeFilterVoucherAntavayaTable;
        break;
    }
    setIsOnLoading(true);
    setListData(...[]);
    setIsShowFilter(false);
    setFilterFormData([...schema()]);
    handlerGetListData(1, pageSize, null, activeTab);
  };

  useEffect(() => {
    setFilterFormData([...schemeFilterVoucherAntavayaTable()]);
  }, []);

  useEffect(() => {
    dispatch({ type: "FORM_FILTER", data: schemeFilterVoucherAntavayaTable() });
  }, []);

  useEffect(() => {
    setFormFilter([...formFilterScheme()]);
  }, []);

  const handlerGetListData = useCallback(
    async (
      updatedCurrentPage,
      updatedPageSize,
      updatedDataFilters,
      newActiveTab
    ) => {
      const currentPageValue = updatedCurrentPage || currentPage;
      const pageSizeValue = updatedPageSize || pageSize;
      const filterInputDataValue = updatedDataFilters || filterFormInput;
      const currentActiveTab = newActiveTab || activeTab[0];

      const payload = {
        columns: filterInputDataValue || [],
        orders: [],
        pageSize: pageSizeValue,
        pageNumber: currentPageValue,
      };

      const respDatatable = await handleFetchVoucherManagementDatatable(
        currentActiveTab,
        payload
      );

      const { isError, resultData, pagination } = respDatatable;
      if (isError) {
        NotificationManager.error(isError);
      }
      const tempData = handlerRemapData(resultData, isError);

      if (updatedCurrentPage) setCurrentPage(updatedCurrentPage);
      if (updatedPageSize) setPageSize(updatedPageSize);
      if (newActiveTab) setActiveTab([newActiveTab]);

      setTotalData(pagination?.totalData);
      setListData([...tempData]);
      setFilterFormInput([]);
      setIsOnLoading(false);
    },
    []
  );

  const handleFetchFilter = useCallback(
    async () => {
      setIsLoading(true);
      handlerGetListData(1, pageSize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmitFilter = () => {
    const { updatedDataFilters, isError } = handleValidateFilter(formFilter);
    if (isError.length > 0) {
      const errorMessage = `${isError.join(",")} can't be empty`;
      setErrorFilter(errorMessage);
    } else {
      setErrorFilter("");
      setDataFilter([...updatedDataFilters]);
      handleFetchFilter();
    }
  };

  useEffect(() => {
    setIsOnLoading(true);
    handlerGetListData(1, pageSize);
  }, [handlerGetListData]);

  const handlerFetchFilter = useCallback(
    async (updatedDataFilters) => {
      setIsOnLoading(true);
      handlerGetListData(1, pageSize, updatedDataFilters, activeTab);
    },
    [filterFormData]

  );

  const handlerPagingChangePage = async (page) => {
    if (page !== currentPage) {
      setIsOnLoading(true);
      handlerGetListData(page, pageSize, null, activeTab[0]);
    }
  };

  const handlerPagingChangePageSize = async (size) => {
    if (size !== pageSize) {
      setIsOnLoading(true);
      handlerGetListData(1, size, null, activeTab[0]);
    }
  };

  const handlerFilterUpdate = (data) => {
    setFilterFormData([...data]);
  };

  const handlerFilterSubmit = () => {
    const { updatedDataFilters, isError } =
      handlerFilterValidate(filterFormData);
    if (isError.length > 0) {
      const errorMessage = `${isError.join(",")} can't be empty`;
      setErrorFilterMessage(errorMessage);
      return;
    }

    setErrorFilterMessage("");
    setFilterFormInput([...updatedDataFilters]);
    handlerFetchFilter(updatedDataFilters);
  };

  const sortableOnChange = async(dataSort)=>{
    let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
    let {isError,updatedDataFilters} = validatedFilter

    dispatch({type:"DATA_SORT",data:dataSort})
    handleGetListData({
      currentPage: state?.pagination?.currentPage,
      filter:updatedDataFilters,
      orderBy:dataSort
    })
  }

  const filterPageProps = [
    { isShowFilter, activeTab },
    { setIsShowFilter, setIsOnLoading },
  ];

  const dynamicFilterProps = [
    {
      filterFormData,
      errorFilterMessage,
    },
    { setIsShowFilter, setFilterFormData },
    { handlerFilterEvents, handlerFilterUpdate, handlerFilterSubmit },
    { dispatch }
  ];

  const tableProps = [
    { tableConfig, listData, isOnLoading, pageSize, currentPage, columnsTable, dispatch },
    {},
    {},
  ];

  const tablePaginationProps = [
    { pageSize, currentPage, totalData, isOnLoading },
    {},
    { handlerPagingChangePageSize, handlerPagingChangePage },
  ];

  const showLoader = isOnLoading && !listData;
  const hasDynamicFilter = isShowFilter && filterFormData.length > 0;

  const tabNavProps = [
    {
      activeTab,
      isShowFilter,
    },
    { setActiveTab, setFilterFormData },
    { handlerFilterSchema, handlerPagingChangePage },
  ];

  console.log({activeTab})

  const handler = useMainHooks(state, dispatch);

  const childProps = {
    hasDynamicFilter,
    filterPageProps,
    dynamicFilterProps,
    tableProps,
    tablePaginationProps,
    formFilter: state.FORM_FILTER,
    state,
    dispatch,
    handler,
    handleSubmitFilter,
    errorFilter,
    handlerGetListData,
    pageSize,
  };

  const title = <h5><b>{pageTitle}</b></h5>

  return (
    <>
      <CmsCrumbs items={crumbItems(activeTab)} />

      <Card
        title={title}
        >
        {showLoader ? (
          <MainLoader heightTable={heightTable} />
        ) : (
          <>
            <TabNav props={[...tabNavProps]}>
              <TabChild {...childProps} activeTab={activeTab} />
            </TabNav>
          </>
        )}
      </Card>
    </>
  );
};

const TabChild = (props) => {
  const {
    hasDynamicFilter,
    filterPageProps,
    dynamicFilterProps,
    tableProps,
    tablePaginationProps,
    activeTab,
    formFilter,
    state,
    dispatch,
    handler,
    handleSubmitFilter,
    errorFilter,
    handlerGetListData,
    pageSize
  } = props;

  const columnsTables = {
    voucher_antavaya: columnsVoucherAntavayaTable,
    voucher_new_user: columnsVoucherNewUserTable,
  };
  tableProps[0].columnsTable = columnsTables[activeTab];
  tableProps[0].state = state;
  tableProps[0].dispatch = dispatch;
  tableProps[0].handler = handler;

  return (
    <>
      <>
        {activeTab == "voucher_antavaya" ? (
          <Row
            justify={"end"}
            style={{
              margin: "-25px 0 -15px",
            }}
          >
            <button
              type="button"
              className="ant-btn ant-btn-primary gx-my-4 create-voucher-antavaya"
              onClick={() =>
                dispatch({
                  type: "IS_SHOW_MODAL_CREATE",
                  data: {
                    isPromise: false,
                  },
                })
              }
            >
              <span>Create New Data</span>
            </button>
          </Row>
        ) : (
          ""
        )}
      </>

      <CmsModal
        title={"Edit Voucher"}
        hasTitleKey={false}
        stateKey={"IS_SHOW_MODAL_EDIT"}
        props={{ state, dispatch, handler }}
        modalHooks={useModalEditHooks}
        labelConfirm={"Update"}
        labelClose={"Close"}
        onClickClose={(footerHandler) => {
          footerHandler.handleClearFormData();
        }}
        onClickConfirm={(activeFormData, footerHandler) => {
          footerHandler.handleModalEditSubmit(activeFormData, () => {
            footerHandler.handleClearFormData();
            handlerGetListData(1, pageSize, null, activeTab);
          });
        }}
      >
        <ModalEditContent></ModalEditContent>
      </CmsModal>

      <CmsModal
        title={"Create Voucher"}
        hasTitleKey={false}
        stateKey={"IS_SHOW_MODAL_CREATE"}
        props={{ state, dispatch, handler }}
        modalHooks={useModalCreateHooks}
        labelConfirm={"Create"}
        labelClose={"Close"}
        onClickClose={(footerHandler) => {
          footerHandler.handleClearFormData();
        }}
        onClickConfirm={(activeFormData, footerHandler) => {
          footerHandler.handleModalCreateSubmit(activeFormData, () => {
            footerHandler.handleClearFormData();
            handlerGetListData(1, pageSize, null, activeTab);
          });
        }}
      >
        <ModalCreateContent></ModalCreateContent>
      </CmsModal>

      <CmsModal
        title={"Delete Voucher"}
        hasTitleKey={false}
        stateKey={"IS_SHOW_MODAL_DELETE"}
        props={{ state, dispatch, handler }}
        modalHooks={useModalDeleteHooks}
        labelConfirm={"Yes"}
        labelClose={"Close"}
        onClickClose={(footerHandler) => {
          footerHandler.handleClearFormData();
        }}
        onClickConfirm={(activeFormData, footerHandler) => {
          footerHandler.handleModalDeleteSubmit(activeFormData, () => {
            footerHandler.handleClearFormData();
            handlerGetListData(1, pageSize, null, activeTab);
          });
        }}
      >
        <ModalDeleteContent></ModalDeleteContent>
      </CmsModal>

      <DynamicFilterPage props={[...dynamicFilterProps]}/>
    
      <TablePage props={[...tableProps]} />
      {console.log({tablePaginationProps})}
      <TablePagination props={[...tablePaginationProps]} />
    </>
  );
};

export default UserIndexPage;
