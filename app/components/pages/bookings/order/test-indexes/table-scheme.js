export const itemsTab = ({props}) => {
  const [
    {activeTab,sectionContent}
  ] = props
  let items = [
    {
      key:"flight",
      label:"Flight",
      children:(activeTab =="flight" && sectionContent)
    },
    {
      key:"hotel",
      label:"Hotel",
      children:(activeTab =="hotel" && sectionContent)
    },
    {
      key:"tour",
      label:"Tour",
      children:(activeTab =="tour" && sectionContent)
    }
  ];

  return items
}