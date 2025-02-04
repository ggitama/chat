import { SortableHeader } from "@/components/Table/sortableHeader";
import { Divider } from "antd";

export const formFilterScheme = () => [
  {
    label: "Product Type",
    type: "Select",
    field: "productType",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "flight", label: "Flight" },
      { value: "hotel", label: "Hotel" },
      { value: "tour", label: "Tour" },
    ],
    width: "25%"
  },
  {
    label: "Promo Title",
    type: "Input",
    field: "title",
    value: "",
    width: "50%"
  },
  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary ",
  },
];

export const columnTableScheme = (
  setIsModalUpdateShow, setIsModalEditShow, dataSort, setDataSort
) => [
  {
    title: (
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="id"
      title="Id"
    />
    ),
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="title"
      title="Promo Title"
    />
    ),
    dataIndex: "title",
    key: "title",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="subtitle"
      title="Promo Subtitle"
    />
    ),
    dataIndex: "subtitle",
    key: "subtitle",
    width: 180
  }, 
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="productType"
      title="Product Type"
    />
    ),
    dataIndex: "productType",
    key: "productType",
    width: 180
  },
  {
    title: "Home Page Image",
    dataIndex: "homeImageUrl",
    key: "homeImageUrl",
    render: (text, row, index) => (
      <img src={`${row.homeImageUrl}`} crossorigin="true" width={28} alt="test image" />
    ),
    width: 180
  },
  {
    title: "Landing Page Image",
    dataIndex: "detailsImageUrl",
    key: "detailsImageUrl",
    render: (text, row, index) => (
      <img src={`${row.detailsImageUrl}`} crossorigin="true" width={28} alt="test image" />
    ),
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="startDate"
      title="Start Date"
    />
    ),
    dataIndex: "startDate",
    key: "startDate",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="endDate"
      title="End Date"
    />
    ),
    dataIndex: "endDate",
    key: "endDate",
    width: 180
  },
  {
    title: "Action",
    key: "action",
    width: 150,
    render: (text, record) => (
      <div>
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() => 
            setIsModalEditShow({ 
              isLoadingPromise: false,
              data: record
            })
          }
        >
          Edit
        </button>
        <Divider type="vertical" />
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() => 
            setIsModalUpdateShow({ 
              isLoadingPromise: false,
              data: record
            })
          }
        >
          Delete
        </button>
      </div>
    )
  }
]

export const modalCreateScheme = (
  voucherList
) => {
  return {
    productType:{
      value: "",
      type: "Select",
      label:"Product Type",
      options:[
        { value:"",label:"Please Select"},
        { value: "flight", label: "Flight" },
        { value: "hotel", label: "Hotel" },
        { value: "tour", label: "Tour" },
      ],
      required: true,
      error: "",
    },
    title:{
      value: "",
      type: "Input",
      label: "Promo Title",
      required: true,
      error: ""
    },
    subtitle:{
      value: "",
      type: "Input",
      label: "Promo Subtitle",
      required: true,
      error: ""
    },
    homeImageUrl:{
      value: "",
      type: "Upload",
      label: "Home Page Image",
      required: true,
      error: ""
    },
    detailsImageUrl:{
      value: "",
      type: "Upload",
      label: "Landing Page Image",
      required: true,
      error: ""
    },
    startDate:{
      value: "",
      type: "Date",
      label:"Start Date",
      required: true,
      error: "",
    },
    endDate:{
      value: "",
      type: "Date",
      label:"End Date",
      required: true,
      error: "",
    },
    promoId:{
      value: "",
      type: "Select",
      label:"Promo Code",
      options:voucherList,
      required: true,
      error: "",
    },
    tnc:{
      value: "",
      type: "InputArea",
      label:"Term & Condition",
      required: true,
      error: "",
    },
  }
}

export const modalEditScheme = (
  voucherList, data
) => {
  return {
    id:{
      value: data.data.id,
      validationType:"alphanumeric",
      type: "Input",
      label:"Id",
      required: true,
      error: "",
    },
    productType:{
      value: data.data.productType,
      type: "Select",
      label:"Product Type",
      options:[
        { value:"",label:"Please Select"},
        { value: "flight", label: "Flight" },
        { value: "hotel", label: "Hotel" },
        { value: "tour", label: "Tour" },
      ],
      required: true,
      error: "",
    },
    title:{
      value: data.data.title,
      type: "Input",
      label: "Promo Title",
      required: true,
      error: ""
    },
    subtitle:{
      value: data.data.subtitle,
      type: "Input",
      label: "Promo Subtitle",
      required: true,
      error: ""
    },
    homeImageUrl:{
      value: data.data.homeImageUrl,
      type: "Upload",
      label: "Home Page Image",
      required: true,
      error: ""
    },
    detailsImageUrl:{
      value: data.data.detailsImageUrl,
      type: "Upload",
      label: "Landing Page Image",
      required: true,
      error: ""
    },
    startDate:{
      value: data.data.startDate,
      type: "Date",
      label:"Start Date",
      required: true,
      error: "",
    },
    endDate:{
      value: data.data.endDate,
      type: "Date",
      label:"End Date",
      required: true,
      error: "",
    },
    promoId:{
      value: data.data.promoId,
      type: "Select",
      label:"Promo Code",
      options:voucherList,
      required: true,
      error: "",
    },
    tnc:{
      value: data.data.tnc,
      type: "InputArea",
      label:"Term & Condition",
      required: true,
      error: "",
    },
  }
}