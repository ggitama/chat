
export const identityList = [
  {
    url: process.env.NEXT_PUBLIC_BASE_URL_API_IDENTITY,
    children: [
      {
        url: "cms",
        children: [
          {
            url: "admins",
            children: [
              {
                url: "datatable",
                name: "fetchAdminDatatable",
                method: "POST",
              },
              {
                url: "update",
                name: "fetchAdminUpdate",
                method: "POST",
              },
              {
                url: "add",
                name: "fetchAdminSubmit",
                method: "POST",
              },
              {
                url: "reset-password",
                name: "fetchAdminReset",
                method: "POST",
              },
            ],
          },
          {
            url: "customer-management",
            children: [
              {
                url: "datatable",
                name: "fetchCustomerDatatable",
                method: "POST",
              },
              {
                url: "summary",
                name: "fetchCustomerSummary",
                method: "GET",
              },
              {
                url: "submit",
                name: "fetchSubmitEdit",
                method: "POST",
              },
              {
                url: "list",
                name: "fetchCustomerList",
                method: "GET",
              }
            ],
          },
          {
            url: "user-management",
            children: [
              {
                url: "summary",
                name: "fetchUserSummary",
                method: "GET",
              },
            ],
          },
          {
            url: "audits",
            children: [
              {
                url: "datatable",
                name: "fetchAuditsUserDatatable",
                method: "POST",
              }
            ],
          },
          {
            url: "role-management",
            children: [
              {
                url: "roles",
                name: "fetchRoleManagementRoles",
                method: "GET",
              },
              {
                url: "menus",
                name: "fetchRoleManagementMenus",
                method: "GET",
              },
              {
                url: "role-menus",
                name: "fetchRoleManagementRoleMenus",
                method: "POST",
              }
            ],
          }
        ],
      },
    ],
  },
]

export * from "./cms/audits"
export * from "./cms/admins"
export * from "./cms/customer-management"
export * from "./cms/role-management"
export * from "./cms/user-management"