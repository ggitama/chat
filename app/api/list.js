import { bookingList } from "./booking";
import { chatList } from "./chat";
import { identityList } from "./identity";
import { promoList } from "./promo";

const apiList = [
  ...bookingList,
  ...identityList,
  ...promoList,
  ...chatList
];

export default apiList;
