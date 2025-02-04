export const bookingList = [
  {
    url: process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING,
    children: [
      {
        url: "cms",
        children: [
          {
            url: "booking-management",
            children: [
              {
                url: "flight",
                children: [
                  {
                    url: "datatable",
                    name: "fetchFlightDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchFlightExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "tour",
                children: [
                  {
                    url: "datatable",
                    name: "fetchTourDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchTourExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "hotel",
                children: [
                  {
                    url: "datatable",
                    name: "fetchHotelDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchHotelExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "detail",
                name: "fetchTourDetail",
                method: "GET",
              },
              {
                url: "detail",
                name: "fetchFlightDetail",
                method: "GET",
              },
              {
                url: "detail",
                name: "fetchHotelDetail",
                method: "GET",
              },
              {
                url: "summary",
                name: "fetchBookingManagementSummary",
                method: "POST",
              },
            ],
          },
          {
            url: "booking-management-sales",
            children: [
              {
                url: "flight",
                children: [
                  {
                    url: "datatable",
                    name: "fetchSalesFlightDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchSalesFlightExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "tour",
                children: [
                  {
                    url: "datatable",
                    name: "fetchSalesTourDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchSalesTourExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "hotel",
                children: [
                  {
                    url: "datatable",
                    name: "fetchSalesHotelDatatable",
                    method: "POST",
                  },
                  {
                    url: "export",
                    name: "fetchSalesHotelExport",
                    method: "POST",
                  },
                ],
              },
              {
                url: "summary",
                name: "fetchSalesBookingManagementSummary",
                method: "POST",
              },
            ],
          },
          {
            url: "audits",
            children: [
              {
                url: "datatable",
                name: "fetchAuditsBookingDatatable",
                method: "POST",
              },
            ],
          },
          {
            url: "bank-management",
            children: [
              {
                url: "datatable",
                name: "fetchBankDatatable",
                method: "POST",
              },
              {
                url: "manage",
                name: "manageBank",
                method: "POST",
              },
              {
                url: "delete",
                name: "deleteBank",
                method: "POST",
              },
            ],
          },
          {
            url: "supports",
            name: "fetchSupportDatatable",
            method: "POST",
          },
          {
            url: "supports",
            children: [
              {
                url: "submit",
                name: "fetchSupportSubmit",
                method: "POST",
              },
            ],
          },
        ],
      },
      {
        url: "resources",
        children: [
          {
            url: "upload-cloud",
            name: "resourceUpload",
            method: "POST",
          },
        ],
      },
      {
        url: "v2",
        children: [
          {
            url: "webhooks",
            children: [
              {
                url: "ipg-webhook/t3sts/event-notif",
                name: "eventNotif",
                method: "POST",
              },
            ],
          },
          {
            url: "tours/availabilities",
            children: [
              {
                url: "search",
                name: "searchTour",
                method: "POST",
              },
            ],
          },
          {
            url: "tours/searches",
            children: [
              {
                url: "region",
                name: "searchRegion",
                method: "GET",
              },
            ],
          },
          {
            url: "airport",
            children: [
              {
                url: "search",
                name: "searchAirport",
                method: "GET",
              },
            ],
          },
          {
            url: "airline",
            children: [
              {
                url: "search",
                name: "searchAirline",
                method: "GET",
              },
            ],
          },
          {
            url: "hotels",
            children: [
              {
                url: "search",
                name: "searchHotel",
                method: "GET",
              },
            ],
          },
        ],
      },
    ],
  },
];

export * from "./cms/supports";
export * from "./cms/audits";
export * from "./cms/resource";
export * from "./cms/banks";
export * from "./cms/booking-management-flight";
export * from "./cms/booking-management-hotel";
export * from "./cms/booking-management-tour";
export * from "./cms/booking-management";
export * from "./cms/booking-management-sales-flight";
export * from "./cms/booking-management-sales-hotel";
export * from "./cms/booking-management-sales-tour";
export * from "./cms/booking-management-sales";
