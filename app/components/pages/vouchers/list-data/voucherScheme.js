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
    label: "Promo Code",
    type: "Input",
    field: "promoCode",
    value: "",
    width: "25%",
  },
  {
    label: "Promo Name",
    type: "Input",
    field: "promoName",
    value: "",
    width: "25%",
  },
  {
    label: "Quota",
    type: "Input",
    field: "quota",
    value: "",
    width: "25%",
  },
  {
    label: "Usage Count",
    type: "Input",
    field: "usageCount",
    value: "",
    width: "25%",
  },
  {
    label: "Code",
    type: "Input",
    field: "codes",
    value: "",
    width: "calc(100% - 110px)",
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
      dataKey="promoCode"
      title="Promo Code"
    />
    ),
    dataIndex: "promoCode",
    key: "promoCode",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="promoName"
      title="Promo Name"
    />
    ),
    dataIndex: "promoName",
    key: "promoName",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="promoDescription"
      title="Promo Description"
    />
    ),
    dataIndex: "promoDescription",
    key: "promoDescription",
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
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="quota"
      title="Quota"
    />
    ),
    dataIndex: "quota",
    key: "quota",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="usageCount"
      title="Usage Count"
    />
    ),
    dataIndex: "usageCount",
    key: "usageCount",
    width: 180
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="type"
      title="Type"
    />
    ),
    dataIndex: "type",
    key: "type",
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
