import { CmsCurrencySpan } from "@/components/Cms/Form/Label"
import NumberHelper from "@/util/cms/number.helper"
import StringHelper from "@/util/cms/string.helper"
import { Divider, Table, Tabs } from "antd"
import * as moment from "moment-timezone"

export const SectionPayment = ({dataSource})=>{
  const contentData = dataSource || {}
  const productType = contentData?.productType
  const invoice = contentData?.invoice || {}
  const order = contentData?.order || {}
  const promo = contentData?.promo || {}
  const promoMPC = contentData?.promoMPC || {}
  const detail = contentData?.detail || {}

  const columnsPaymentConfirmations = [
    {key:"paymentType",label:"Payment Type"},
    {key:"paymentMethod",label:"Payment Method"},
    {key:"paymentStatus",label:"Payment Status"},
    {key:"paymentDate",label:"Payment Date"},
    {key:"amount",label:"Amount"},
  ]

  let paymentLabel  = StringHelper.firstLetterUpperCase(productType)
  const dataSourcePayments = [
    {
      paymentType:`${paymentLabel} Payment`,
      paymentMethod:invoice?.paymentMethod,
      paymentStatus:invoice?.status,
      paymentDate:invoice ? moment.tz(invoice.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-',
      amount:(
        <CmsCurrencySpan>
          {/* { order?.totalPrice?.display } */}
          { productType == "flight" ? detail?.totalAllPrice.display : order?.totalPrice?.display}
        </CmsCurrencySpan>
      )
    }
  ]

  const columnsBilling = [
    {key:"orderItem",label:"Order Item"},
    {key:"description",label:"Description"},
    {key:"qty",label:"Qty"},
    {key:"total",label:"Total"},
  ]
  
  
  const flightDataBilling = ()=>{
    const isReturnFlight = !!detail?.isReturnFlight;
    const departureFlight = `${detail?.departure?.originDept} - ${detail?.departure?.destinationDept}`;
    const departureTotalPrice = (detail?.departure?.totalPrice?.display ? detail?.departure?.totalPrice?.display : detail?.departure?.totalPrice) || 0;

    let res = [{
      orderItem: "Flight Order Departure",
      description: departureFlight,
      qty: "1",
      total: <CmsCurrencySpan>{departureTotalPrice}</CmsCurrencySpan>,
    }];

    if (isReturnFlight) {
      const returnFlight = `${detail?.return?.originDept} - ${detail?.return?.destinationDept}`;
      const returnTotalPrice = (detail?.return?.totalPrice?.display ? detail?.return?.totalPrice?.display : detail?.return?.totalPrice) || 0;

      res.push({
        orderItem: "Flight Order Return",
        description: returnFlight,
        qty: "1",
        total: <CmsCurrencySpan>{returnTotalPrice}</CmsCurrencySpan>,
      });
    }

    return res;
  }

  const tourDataBilling = ()=>{
    const descriptionTour = `${detail?.tour?.name}`
    return [
      {
        orderItem:"Tour Order",
        description:descriptionTour,
        qty:"1",
        total:(
          <CmsCurrencySpan>
            { order?.totalPrice?.display }
          </CmsCurrencySpan>
        ),
      }
    ]
  }

  const hotelDataBilling = ()=>{
    const room = detail?.room || {}
    const descriptionRoom = `${room?.totalRoom} Room(s) ${room?.roomType} - ${room?.mealPlan}`
    const detailRoom = `${room?.totalAdult} Adult, ${room?.totalChild} Child`
    return [
      {
        orderItem:"Hotel Order",
        description:(
          <>
            <span>{room?.hotelName}</span>
            <br></br>
            <span>{descriptionRoom}</span>
            <br></br>
            <span>{detailRoom}</span>
          </>
        ),
        qty:"1",
        total:(
          <CmsCurrencySpan>
            { order?.totalPrice?.display }
          </CmsCurrencySpan>
        ),
      }
    ]
  }

  const detailType = detail?.type
  const mapDetails = {
    "flight":flightDataBilling,
    "tour":tourDataBilling,
    "hotel":hotelDataBilling,
  }
  const dataBillings = (mapDetails[productType]) ? mapDetails[productType]() : []

  const promoApplied = invoice?.discountAmount?.raw || 0
  const promoCreditCardValue = invoice?.isHasCCPromo ? invoice?.promoCreditCard?.raw : 0
  // const totalPriceRaw = order?.totalPrice?.raw || 0
  const totalPriceRaw = (productType == "flight" ? detail?.totalAllPrice?.raw : order?.totalPrice?.raw) || 0
  
  let totalApprovedPayment = totalPriceRaw-promoApplied || 0
  let totalInvoice = totalApprovedPayment-promoCreditCardValue || 0
  const totalApprovedPaymentAfterPromoCC = totalApprovedPayment-promoCreditCardValue
  const totalOutStanding = totalApprovedPaymentAfterPromoCC-totalInvoice
  const isNegativeOutstanding = totalApprovedPaymentAfterPromoCC>totalInvoice ? true : false
  
  // ANT-044 force amount to 1000 if less then 1000
  totalApprovedPayment = totalApprovedPayment < 1000 ? 1000 : totalApprovedPayment
  totalInvoice = totalInvoice < 1000 ? 1000 : totalInvoice

  const isHasInvoice = invoice?.status ? true : false
  const invoicePaymentSource = isHasInvoice ? dataSourcePayments : []

  if(promo.isHasAppliedPromo){
    dataSourcePayments.push({
      paymentType:"Promo Code",
      paymentMethod:`${promo.code} (${promo.description})`,
      paymentStatus:"applied",
      paymentDate:invoice ? moment.tz(invoice.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-',
      amount:(
        <CmsCurrencySpan isNegative>
          { invoice?.discountAmount?.display }
        </CmsCurrencySpan>
      )
    })
  }
  if(promoMPC.isHasAppliedMPCPromo){
    dataSourcePayments.push({
      paymentType:"Promo MPC",
      paymentMethod:promoMPC.couponNo,
      paymentStatus:"applied",
      paymentDate:promoMPC ? moment.tz(promoMPC.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-',
      amount:(
        <CmsCurrencySpan isNegative>
          { promoMPC?.amount?.display }
        </CmsCurrencySpan>
      )
    })
  }
  if(invoice.isHasCCPromo){
    dataSourcePayments.push({
      paymentType:invoice?.paymentMethod == 'allopay' ? 'Promo Allopay' : "Credit Card Promo" ,
      paymentMethod:invoice?.paymentMethod,
      paymentStatus:"applied",
      paymentDate: invoice ? moment.tz(invoice.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-',
      amount:(
        <CmsCurrencySpan isNegative>
          { invoice?.promoCreditCard?.display }
        </CmsCurrencySpan>  
      )
    }) 
  }

  if(productType == "flight"){
    order.totalPrice.display = detail?.totalAllPrice?.display;
    order.totalPrice.raw = detail?.totalAllPrice?.raw;
  }

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Billing</h5>
      </Divider>
      <TableShowWrapper>
        <tbody className="ant-table-tbody">
          <tr>
            <td style={{width:"20%"}}>Due Date</td>
            <td>{order ? moment.tz(order.dueDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'}</td>
          </tr>
        </tbody>
      </TableShowWrapper>
    
      <TableShowData dataKey="billings" columns={columnsBilling} dataSource={dataBillings}>
        <tfoot className="ant-table-tbody">
          <tr>
            <td colSpan={3} style={{textAlign:"right"}}>Total</td>
            <td>
              <CmsCurrencySpan>
                { order?.totalPrice?.display }
              </CmsCurrencySpan>  
            </td>
          </tr>
        </tfoot>
      </TableShowData>

      <Divider orientation="left" orientationMargin="0">
        <h5>Payment Confirmation</h5>
      </Divider>
      <TableShowData dataKey="payment-confirmation" 
        columns={columnsPaymentConfirmations} 
        dataSource={invoicePaymentSource}
        labelEmpty={"Empty Invoice Data"}
        >
        {
          isHasInvoice && (
            <tfoot className="ant-table-tbody">
              <tr>
                <td colSpan={4} style={{textAlign:"right"}}>Total Payment (Approved)</td>
                <td>
                  <CmsCurrencySpan currency="Rp.">
                    { NumberHelper.formatThousand(totalApprovedPayment) }
                  </CmsCurrencySpan>
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{textAlign:"right"}}>Total Invoice</td>
                <td>
                  <CmsCurrencySpan currency="Rp.">
                      { NumberHelper.formatThousand(totalInvoice) }
                  </CmsCurrencySpan>
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{textAlign:"right"}}>Outstanding Balance</td>
                <td>
                  <CmsCurrencySpan isNegative={isNegativeOutstanding}>
                    { NumberHelper.formatThousand(totalOutStanding) }
                  </CmsCurrencySpan>
                </td>
              </tr>
            </tfoot>
          )
        }
      </TableShowData>
      
    </>
  )
}

const TableShowWrapper = ({children})=>{
  return (
    <div className="ant-table ant-table-small ant-table-bordered mb-4">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            {children}
          </table>
        </div>
      </div>
    </div>
  )
}

const TableShowData = ({
  dataKey,columns,dataSource,
  children,
  labelEmpty="No Data"
})=>{
  const hasBody = dataSource && dataSource.length  ? true : false;
  const spanCount = columns.length
  return (
    <TableShowWrapper>
      <thead className="ant-table-thead">
        <tr>
          {columns.map((rowColumn,index)=>{
            return (
              <th key={rowColumn.key} className="ant-table-cell">
                {rowColumn.label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="ant-table-tbody">
        {
        (hasBody==false) ? (
          <tr style={{textAlign:"center"}}>
            <td colSpan={spanCount}> {labelEmpty}</td>
          </tr>
        ) : (
          <>
            {dataSource.map((row,index)=>{
              const tableRowKey =`tbody-${dataKey}-${index}`
              return (
                <tr key={tableRowKey}>
                  <TableTd 
                    dataKey={tableRowKey} rowData={row} columns={columns}
                    />
                </tr>
              )
            })}
          </>
        )
        }
      </tbody>
      {children}
    </TableShowWrapper>
  )
}

const TableTd = ({dataKey,columns,rowData})=>{
  return (
    <>{columns.map((row,index)=>{
      const columnValue = rowData[row.key]
      return (
        <td key={`${dataKey}-${index}`}>{columnValue}</td>
      )
    })}</>
  )
}