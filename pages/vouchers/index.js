// import React, { useEffect, useState } from "react";
// import { Button, Card, Table } from "antd";

// import { useCallback } from "react";
// import {
//   eventHandleFilter,
//   handleValidateFilter,
// } from "@/components/pages/list-data/eventHandleFIlterForm";
// import { formFilterScheme, columnTableScheme } from "@/components/pages/vouchers/list-data/voucherScheme";
// import { NotificationManager } from "react-notifications";
// import CircularProgress from "@/components/CircularProgress";
// import { ModalUpdateStatus } from "@/components/pages/vouchers/list-data/modalUpdateStatus";
// import { ModalCreateForm } from "@/components/pages/vouchers/list-data/modalCreateForm";
// import { ModalEditForm } from "@/components/pages/vouchers/list-data/modalEditForm";
// import { Pagination } from "antd";
// import DynamicFilter from "@/components/Form/DynamicFilter";
// import { FilterOutlined, FilterFilled } from "@ant-design/icons";
// import { handleFetchVouchersDatatable, handleDeleteVouchers, handleManageVouchers } from "app/api/helper";

// const ListData = (props) => {
//   const { screenHeight, screenWidth } = props;
//   const heightTable = screenHeight - 380;
//   const tableConfig = {
//     bordered: true,
//     pagination: false,
//     size: "small",
//     showHeader: true,
//     scroll: { y: heightTable },
//   };

//   const [isLoading, setIsLoading] = useState(true);
//   const [listData, setListData] = useState();
//   const [totalData, setTotalData] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataFilter, setDataFilter] = useState([]);
//   const [formFilter, setFormFilter] = useState([]);
//   const [errorFilter, setErrorFilter] = useState("");
//   const [isShowFilter, setIsShowFilter] = useState(false);
//   const [isModalUpdateStatusShow, setIsModalUpdateStatusShow] = useState(false);
//   const [isModalEditFormShow, setIsModalEditFormShow] = useState(false);
//   const [isModalCreateFormShow, setIsModalCreateFormShow] = useState(false);
//   const [dataSort, setDataSort] = useState([]);
  
//   useEffect(() => {
//     setFormFilter([...formFilterScheme()]);
//   }, []);

//   const handleGetListData = useCallback(
//     async (updatedCurrentPage, updatedPageSize) => {
//       const dataCurrentPage = updatedCurrentPage
//         ? updatedCurrentPage
//         : currentPage;
//       const dataPageSize = updatedPageSize ? updatedPageSize : pageSize;
//       const sort = dataSort.length ? dataSort : [{ key: "createdAt", value: "DESC"}]
//       const payload = {
//         columns: dataFilter,
//         orders: [
//             ...sort
//         ],
//         pageSize: dataPageSize,
//         pageNumber: dataCurrentPage,
//       };

//       const tempData = [];
//       const { resultData, pagination, isError } =
//       await handleFetchVouchersDatatable(payload);

//       if (isError) {
//         NotificationManager.error(isError);
//       } else {
//         resultData.map((rowData, index) => {
//             tempData.push({
//             key: "row" + index,
//             ...rowData,
//             });
//         });
//       }
      
//       if (updatedCurrentPage) setCurrentPage(updatedCurrentPage);
//       if (updatedPageSize) setPageSize(updatedPageSize);

//       setTotalData(pagination?.totalData);
//       setListData([...tempData]);
//       setIsLoading(false);
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [dataFilter]
//   );

//   useEffect(() => {
//     setIsLoading(true);
//     handleGetListData(1);
//   }, [handleGetListData]);

//   const fetchUpdateStatus = async (data) => {
//     const payload = {
//       uuid: data.uuid
//     };

//     let { result, error } = await handleDeleteVouchers(payload);
//     if (!error) {
//       result = { statusCode: 200, statusMessage: "OK" };
//     } else {
//       if (result) {
//         result = { statusCode: result.statusCode, statusMessage: result.statusMessage };
//       }
//     }
//     return { result, error };
//   };

//   const handleActionStatus = async () => {
//     let alert = "";
//     setIsModalUpdateStatusShow({
//       isLoadingPromise: true,
//       data: isModalUpdateStatusShow.data,
//     });
//     const { result, error } = await fetchUpdateStatus(
//       isModalUpdateStatusShow.data
//     );
//     if (result) {
//       if (result.statusCode === 200) {
//         alert = {
//           isSuccess: true,
//           message: "Delete success",
//         };
//       } else {
//         alert = {
//           isSuccess: false,
//           message: "Delete failed",
//         };
//       }
//     } else {
//       alert = {
//         isSuccess: false,
//         message: "something went wrong, please try again",
//       };
//     }
//       if (alert.isSuccess) {
//         setIsModalUpdateStatusShow(false);
//         NotificationManager.success(alert.message);
//         setIsLoading(true);
//         handleGetListData(1, pageSize);
//       } else {
//         setIsModalUpdateStatusShow({
//           isLoadingPromise: false,
//           data: isModalUpdateStatusShow.data,
//         });
//         NotificationManager.error(alert.message);
//       }
//   };

//   const fetchUpdateData = async (data) => {
//     const payload = {
//       ...data,
//     };

//     let { result, error } = await handleManageVouchers(payload);
//     if (result.statusCode === 200) {
//       result = { statusCode: 200, statusMessage: "OK" };
//     }

//     return { result, error };
//   };

//   const handleEditData = async (formData) => {
//     let alert = "";
//     setIsModalEditFormShow({
//       isLoadingPromise: true,
//       data: formData,
//     });

//     let { result, error } = await fetchUpdateData(formData);
//     if (result) {
//       if (result.statusCode === 200) {
//         alert = {
//           isSuccess: true,
//           message: "Update data success",
//         };
//       } else {
//         alert = {
//           isSuccess: false,
//           message: result.statusMessage,
//         };
//       }
//     } else {
//       alert = {
//         isSuccess: false,
//         message: result.statusMessage,
//       };
//     }

//     if (alert.isSuccess) {
//       setIsModalEditFormShow(false);
//       NotificationManager.success(alert.message);
//       setIsLoading(true);
//       handleGetListData(1, pageSize);
//     } else {
//       setIsModalEditFormShow({
//         isLoadingPromise: false,
//         data: isModalEditFormShow.data,
//       });
//       NotificationManager.error(alert.message);
//     }
//   };

//   const fetchCreateData = async (data) => {
//     let error = "";
//     let result = false;
//     const payload = {
//       ...data,
//     };
//     const isSuccess = Math.random() < 0.6;
//     if (isSuccess) {
//       result = { statusCode: 200, statusMessage: "OK" };
//     } else {
//       const isErrorServer = Math.random() < 0.6;
//       if (!isErrorServer) {
//         result = { statusCode: 400, statusMessage: "Bad Request" };
//       } else {
//         error = "Connection Timeout";
//       }
//     }
//     return { result, error };
//   };

//   const handleCreateData = async (formData) => {
//     let alert = "";
//     setIsModalCreateFormShow({
//       isLoadingPromise: true,
//     });
//     const { result, error } = await handleManageVouchers(formData);
//     if (result) {
//       if (result.statusCode === 200) {
//         alert = {
//           isSuccess: true,
//           message: "update data success",
//         };
//       } else {
//         alert = {
//           isSuccess: false,
//           message: "update data failed",
//         };
//       }
//     } else {
//       alert = {
//         isSuccess: false,
//         message: "something went wrong, please try again",
//       };
//     }
//     setTimeout(() => {
//       if (alert.isSuccess) {
//         setIsModalCreateFormShow(false);
//         NotificationManager.success(alert.message);
//         setIsLoading(true);
//         handleGetListData(1, pageSize);
//       } else {
//         setIsModalCreateFormShow({
//           isLoadingPromise: false,
//         });
//         NotificationManager.error(alert.message);
//       }
//     }, 1200);
//   };

//   const handleChangePageSize = async (size) => {
//     if (size !== pageSize) {
//       setIsLoading(true);
//       handleGetListData(1, size);
//     }
//   };

//   const handleChangePage = async (page) => {
//     if (page !== currentPage) {
//       setIsLoading(true);
//       handleGetListData(page, pageSize);
//     }
//   };

//   const updateFormFilter = (data) => {
//     setFormFilter([...data]);
//   };

//   const handleFetchFilter = useCallback(
//     async () => {
//       setIsLoading(true);
//       handleGetListData(1, pageSize);
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   const handleSubmitFilter = () => {
//     const { updatedDataFilters, isError } =
//       handleValidateFilter(formFilter);
//     if (isError.length > 0) {
//       const errorMessage = `${isError.join(",")} can't be empty`
//       setErrorFilter(errorMessage)
//     } else {
//       setErrorFilter("")
//       setDataFilter([...updatedDataFilters]);
//       handleFetchFilter();
//     }
//   };


//   return (
//     <>
    
//       <Card
//         title="Vouchers Management"
//         extra={
//           <button
//             type="button"
//             className="ant-btn ant-btn-primary gx-my-4"
//             onClick={() =>
//               setIsModalCreateFormShow({
//                 isLoadingPromise: false,
//               })
//             }
//           >
//             <span>Create New Data</span>
//           </button>
//         }
//       >
//         <>
//           {isLoading && !listData ? (
//             <CircularProgress
//               className={"gx-w-100"}
//               customHeight={heightTable}
//               text={"Loading Data"}
//             />
//           ) : (
//             <>
//               <div className="d-flex w-100">
//                 <Button
//                   className={`gx-btn-outline${
//                     isShowFilter ? "-info" : "-default"
//                   } gx-px-4`}
//                   onClick={() => setIsShowFilter(!isShowFilter)}
//                 >
//                   <div className="d-flex align-items-center">
//                     {isShowFilter ? (
//                       <FilterFilled className="mr-2 gx-fs-xl" />
//                     ) : (
//                       <FilterOutlined className="mr-2 gx-fs-xl" />
//                     )}
//                     <span>Filter</span>
//                   </div>
//                 </Button>
//               </div>
//               {formFilter.length > 0 && isShowFilter && (
//                 <Card type="inner" className="mt-4 gx-bg-light-grey">
//                   <DynamicFilter
//                     data={formFilter}
//                     isBreakRow={true}
//                     className={"mb-8"}
//                     dataFilter={{
//                       handle: eventHandleFilter,
//                       data: formFilter,
//                       onChange: updateFormFilter,
//                       onSubmit: handleSubmitFilter,
//                     }}
//                     errorMessage={errorFilter}
//                   />
//                 </Card>
//               )}

//               <Table
//                 className="gx-table-responsive gx-fs-xs mt-4"
//                 {...tableConfig}
//                 columns={columnTableScheme(
//                   setIsModalUpdateStatusShow,
//                   setIsModalEditFormShow,
//                   dataSort,
//                   setDataSort
//                 )}
//                 dataSource={listData}
//                 loading={isLoading}
//               />
//               <div className="gx-w-100 gx-flex-row gx-justify-content-end gx-mt-4">
//                 <Pagination
//                   showSizeChanger
//                   pageSize={pageSize}
//                   pageSizeOptions={[10, 25, 50, 100]}
//                   current={currentPage}
//                   total={totalData}
//                   disabled={isLoading}
//                   onShowSizeChange={(current, size) => {
//                     handleChangePageSize(size);
//                   }}
//                   onChange={(page) => {
//                     handleChangePage(page);
//                   }}
//                 />
//               </div>
//             </>
//           )}
//         </>
//       </Card>
//       <ModalCreateForm
//         isModalShow={isModalCreateFormShow}
//         handleModalShow={setIsModalCreateFormShow}
//         handleCreateData={handleCreateData}
//       />
//       <ModalEditForm
//         isModalShow={isModalEditFormShow}
//         handleModalShow={setIsModalEditFormShow}
//         handleEditData={handleEditData}
//       />
//       <ModalUpdateStatus
//         isModalShow={isModalUpdateStatusShow}
//         handleModalShow={setIsModalUpdateStatusShow}
//         handleActionStatus={handleActionStatus}
//       />
//     </>
//   );
// };

// export default ListData;
import ScreenPage from "./voucher-antavaya";
export default ScreenPage