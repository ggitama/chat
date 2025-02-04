import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import "antd/dist/antd.css";

import "../public/vendors/style";
import "../styles/style.css";
import "../styles/normalize.css";
import "../styles/bootstrap.css";
import "../styles/color.css";
import "antd/dist/antd.css";
import "../public/vendors/style";
import initStore from "../redux/store";
import { Provider } from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import { AuthProvider } from "../util/use-auth";
import Layout from "../app/core/Layout";
import { NotificationContainer } from "react-notifications";


const Page = ({ Component, pageProps, store }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  const screenResize = useCallback(() => {
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", screenResize);
    return () => {
      window.removeEventListener("resize", screenResize);
    };
  }, [screenResize]);

  useEffect(() => {
    if (screenWidth === 0) {
      setScreenWidth(screen.width);
      setScreenHeight(screen.height);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Admin - Antavaya Dashboard</title>
      </Head>
      <Provider store={store}>
        <LocaleProvider>
          <AuthProvider>
            <Layout>
              <Component
                {...pageProps}
                screenHeight={screenHeight}
                screenWidth={screenWidth}
              />
               <NotificationContainer />
            </Layout>
          </AuthProvider>
        </LocaleProvider>
      </Provider>
    </React.Fragment>
  );
};

export default withRedux(initStore)(Page);
