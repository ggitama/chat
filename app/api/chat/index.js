export const chatList = [
  {
    url: process.env.NEXT_PUBLIC_BASE_URL_API_CHAT,
    children: [
      {
      url: "cms",
        children: [
          {
            url: "chat-users",
            children: [
              {
                url: "datatable",
                name: "fetchChatUsersDatatable",
                method: "GET",
              }
            ],
          },
        ],
      }
    ]
  },
]
