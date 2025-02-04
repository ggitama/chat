import React, { Fragment, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import CustomScrollbars from "../../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import { setPathName } from "../../../redux/actions";
import { menu } from "./model/menu";

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { navStyle, themeType, pathname } = useSelector(
    ({ settings }) => settings
  );

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  useEffect(() => {
    dispatch(setPathName(router.pathname));
  }, [router.pathname]);

  const selectedKeys = router.pathname.substr(1) || "sample";
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <React.Fragment>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {menu().map((parentMenu,index) => {
              return (
                <Fragment key={parentMenu.key}>
                  {parentMenu.children ? (
                    <SubMenu
                      key={`${parentMenu.key}-child-${index}`}
                      popupClassName={getNavStyleSubMenuClass(navStyle)}
                      title={
                        <span>
                          {parentMenu.icon && (
                            <i className={`icon ${parentMenu.icon}`} />
                          )}
                          {parentMenu.title}
                        </span>
                      }
                    >
                      {parentMenu.children.map((childMenu) => {
                        return (
                          <Menu.Item key={childMenu.key}>
                            <Link href={childMenu.link}>
                              <a>
                                <span>
                                  {childMenu.icon && (
                                    <i className={`icon ${childMenu.icon}`} />
                                  )}
                                  {childMenu.title}
                                </span>
                              </a>
                            </Link>
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  ) : (
                    <Menu.Item key={parentMenu.key}>
                      <Link href={parentMenu.link}>
                        <a>
                          <span>
                            {parentMenu.icon && (
                              <i className={`icon ${parentMenu.icon}`} />
                            )}
                            {parentMenu.title}
                          </span>
                        </a>
                      </Link>
                    </Menu.Item>
                  )}
                </Fragment>
              );
            })}
          </Menu>
        </CustomScrollbars>
      </div>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
