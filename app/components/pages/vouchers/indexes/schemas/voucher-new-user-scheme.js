import { Divider,Image } from "antd";
import { blue, green, red } from "@ant-design/colors";
import Link from "next/link";
import { ButtonLabel } from "@/components/Cms/Buttons";
import { SortableHeader } from "@/components/Table/sortableHeader";
import * as moment from 'moment-timezone';

export const columnsTable = (
  props
) => {
  const {
    handler
  } = props

  const state = props.props[0].state;
  const dispatch = props.props[0].dispatch;
  
  let fallback = 'data:image/png;base64,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'
  let width = 60
  let columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      fixed: true,
      align: "center",
      width: 50,
      render:(text,row,index)=>{
        let rowIndex = state.pagination.pageSize*(state.pagination.currentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
           handler.sortableOnChange(value)}
        }
        dataKey="promoCode"
        title="Promo Code"
      />
      ),
      fixed: true,
      dataIndex: "promoCode",
      key: "promoCode",
      width: 180
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
        dataKey="promoName"
        title="Promo Name"
      />
      ),
      dataIndex: "promoName",
      key: "promoName",
      width: 180
    },
    {
      title: "Promo Description",
      dataIndex: "promoDescription",
      key: "promoDescription",
      width: 180
    },
    {
      title: "User",
      dataIndex: "pengguna",
      key: "pengguna",
      width: 180
    },
    {
      title: "Tnc",
      dataIndex: "tnc",
      key: "tnc",
      width: 180
    },
    {
      title: "Dekstop Image",
      dataIndex: "desktopImageUrl",
      key: "desktopImageUrl",
      render: (text, row, index) => (
        <Image src={`${row.desktopImageUrl}`} fallback={fallback} preview={false} crossOrigin={"true"} width={width} alt="test image" />
      ),
      width: 180
    },
    {
      title: "Mobile Image",
      dataIndex: "mobileImageUrl",
      key: "mobileImageUrl",
      render: (text, row, index) => (
        <Image src={`${row.mobileImageUrl}`} fallback={fallback} preview={false} crossOrigin={"true"} width={width} alt="test image" />
      ),
      width: 180
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
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
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
        dataKey="platform"
        title="Platform"
      />
      ),
      dataIndex: "platform",
      key: "platform",
      width: 180
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
        dataKey="startDate"
        title="Start Date"
      />
      ),
      dataIndex: "startDate",
      key: "startDate",
      render: (text, row, index) => {
        // return moment.tz(row.startDate,'Etc/GMT+7').format('YYYY-MM-DD HH:mm')
        let d = moment(row.startDate).subtract(7,'hours')
        return d.format('YYYY-MM-DD HH:mm') // ganti dari subtract menjadi add jika ingin +7
      },
      width: 180
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
        dataKey="endDate"
        title="End Date"
      />
      ),
      dataIndex: "endDate",
      key: "endDate",
      render: (text, row, index) => {
        // return moment.tz(row.endDate,'Etc/GMT+7').format('YYYY-MM-DD HH:mm')
        let d = moment(row.endDate).subtract(7,'hours')
        return d.format('YYYY-MM-DD HH:mm')  // ganti dari subtract menjadi add jika ingin +7
      },
      width: 180
    },
    {
      title:(
        <SortableHeader
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
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
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
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
        dataSource={state.DATA_SORT}
        onChange={(value) => {
          handler.sortableOnChange(value)}
        }
        dataKey="type"
        title="Type"
      />
      ),
      dataIndex: "type",
      key: "type",
      width: 180
    },
  ]

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}

export const schemeFilterTable = () => [
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