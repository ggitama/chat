export const promoList = [
  {
    url: process.env.NEXT_PUBLIC_BASE_URL_API_PROMO,
    children: [
      {
        url: "cms",
        children: [
          {
            url: "audits",
            children: [
              {
                url: "datatable",
                name: "fetchAuditsPromoDatatable",
                method: "POST",
              }
            ],
          },
          {
            url: "banner-management",
            children: [
              {
                url: "datatable",
                name: "fetchBannersDatatable",
                method: "POST",
              }, 
              {
                url: "manage",
                name: "manageBanners",
                method: "POST"
              },
              {
                url: "delete",
                name: "deleteBanners",
                method: "POST"
              }
            ],
          },
          {
            url: "voucher-management",
            children: [
              {
                url: "datatable",
                name: "fetchVoucherDatatable",
                method: "POST"
              },
              {
                url: "new-user-datatable",
                name: "fetchVoucherNewUserDatatable",
                method: "POST"
              },
              {
                url: "manage",
                name: "manageVoucher",
                method: "POST"
              },
              {
                url: "delete",
                name: "deleteVoucher",
                method: "POST"
              },
              {
                url: "list",
                name: "listVoucher",
                method: "GET"
              },
              {
                url: "list-all-type",
                name: "listVoucherAllType",
                method: "GET"
              },
              {
                url: "summary",
                name: "summaryVoucher",
                method: "POST"
              }
            ]
          },
          {
            url: "popup-management",
            children: [
              {
                url: "datatable",
                name: "fetchPopupsDatatable",
                method: "POST",
              },
              {
                url: "manage",
                name: "managePopups",
                method: "POST",
              },
              {
                url: "delete",
                name: "deletePopups",
                method: "POST",
              },
              {
                url: "detail",
                name: "detailPopups",
                method: "GET",
              }
            ]
          },
          {
            url: "push-notif-management",
            children: [
              {
                url: "datatable",
                name: "fetchPushNotificationsDatatable",
                method: "POST",
              },
              {
                url: "manage",
                name: "managePushNotifications",
                method: "POST",
              },
              {
                url: "delete",
                name: "deletePushNotifications",
                method: "POST",
              },
              {
                url: "detail",
                name: "detailPushNotifications",
                method: "GET",
              }
            ]
          },
        ],
      },
    ],
  },
  
]

export * from "./cms/audits"
export * from "./cms/vouchers"
export * from "./cms/banners"
export * from "./cms/popups"  
export * from "./cms/push-notifications"  