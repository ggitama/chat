
export const crumbItems = (activeTab)=>{
    return [
    {
      breadcrumbName: 'Home',
      path:"/"
    },
    {
      breadcrumbName: 'Voucher Discount',
      path:"#"
    },
    {
      breadcrumbName: activeTab == "voucher_antavaya" ? "Voucher Antavaya" : "Voucher New User",
      path:"#"
    }
  ]
}