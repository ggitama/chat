import Router from "next/router";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { add, endOfMonth, format, parse, startOfToday } from "date-fns";

export const detectWebview = (userAgent) => {
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);
  if (ios) {
    if (safari) {
      return false;
    } else if (!safari) {
      return true;
    }
  } else {
    if (userAgent.includes("wv")) {
      return true;
    } else {
      return false;
    }
  }
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const detectDeviceBrowser = (userAgent) => {
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);
  if (ios) {
    if (safari) {
      return "ios safari";
    } else if (!safari) {
      return "ios non safari";
    }
  } else {
    if (userAgent.includes("wv")) {
      return "webview";
    } else {
      return "non ios, open from browser ";
    }
  }
};

export const forceReload = () => {
  Router.reload();
};

export const redirectRouterPush = (url) => {
  Router.push(url);
};


export function debounce(func, wait, immediate) {
  var timeout;

  return (...args) => {
    var context = this;

    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export const useOutsideClick = (ref, callback, active) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (
          e.target.getAttribute("data-tag") !== "nav" + active &&
          e.target.tagName !== "svg" &&
          e.target.tagName !== "path"
        ) {
          callback();
        }
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [active, callback, ref]);
};

export function copyToClipboard(
  string,
  id,
  callbackSuccess = () => {},
  callbackFail = () => {}
) {
  const textArea = document.createElement("textarea");
  textArea.value = string;

  document.getElementById(id).appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    callbackSuccess();
  } catch (err) {
    callbackFail();
  }

  document.getElementById(id).removeChild(textArea);
}

export const checkLogin = () => {
  const isLogin = Cookies.get("isLogin");
  return isLogin ? isLogin : false;
};

export const checkAlloWallet = () => {
  const isLogin = Cookies.get("isLogin");
  return isLogin ? isLogin : false;
};

export const scrollToBottom = (idElement) => {
  document.getElementById(idElement).scrollTop =
    document.getElementById(idElement).scrollHeight;
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const currencyMask = (amount, currency, separator, separatorDecimal) => {
  let number = amount;
  const dataCurrency = currency ? currency + " " : "";

  if (isNaN(number)) {
    number = 0;
  }

  number = Number(number);
  const hasDecimal = number % 1 !== 0 ? true : false;
  let currencyMaskValue = "";
  if (hasDecimal) {
    const integerNumber = parseInt(number, 10);

    const decimal = (number - integerNumber).toFixed(3) * 1000;
    const formatNumber = integerNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    currencyMaskValue =
      dataCurrency.concat(formatNumber) +
      (separatorDecimal ? separatorDecimal : ",") +
      decimal;
  } else {
    const formatNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    currencyMaskValue = dataCurrency.concat(formatNumber);
  }

  return currencyMaskValue;
};


export const getMaxDate = (month) => {
  const currentMonth = format(startOfToday(), "MMM-yyyy");
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const lastMonth = format(
    add(firstDayCurrentMonth, { months: month }),
    "MMM-yyyy"
  );
  const maxDate = endOfMonth(parse(lastMonth, "MMM-yyyy", new Date()));
};

export const setExpiresCookies = (cookieName) => {
  let expiredDuration;
  switch (cookieName) {
    case "token":
      expiredDuration = new Date(new Date().getTime() + 22 * 60 * 60 * 1000); // expired token 22 hours
      break;
    case "refreshToken":
    case "refresh-token":
    case "isLogin":
    case "deviceId":
      expiredDuration = 28; // expired within 28 days
      break;
    case "nonceCode":
    case "callbackRoute":
    case "callbackRouteAllo":
      expiredDuration = new Date(new Date().getTime() + 1 * 60 * 60 * 1000); // expired within 1 hour
      break;
    case "promo":
      expiredDuration = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // expired within 2 hours
    default:
      break;
  }

  return expiredDuration;
};

export const setGlobalCookies = (name, value, options) => {
  const isSecure =
    process.env.NEXT_PUBLIC_COOKIE_ENV === "local" ? false : true;
  Cookies.set(name, value, { ...options, secure: isSecure });
};
