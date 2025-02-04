export const chatList = [
  {
    url: process.env.NEXT_PUBLIC_BASE_URL_API_CHAT,
    children: [
      {
            url: "users",
                name: "fetchChatUsersDatatable",
                method: "POST"
      },
    ],
  },
]
