export const itemsTab = ({props}) => {
  const [
    {activeTab,sectionContent}
  ] = props
  let items = [
    {
      key:"voucher_antavaya",
      label:"Voucher Antavaya",
      children:(activeTab =="voucher_antavaya" && sectionContent)
    },
    {
      key:"voucher_new_user",
      label:"Voucher New User",
      children:(activeTab =="voucher_new_user" && sectionContent)
    },
  ];

  return items
}