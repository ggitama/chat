import React from "react";
import { Avatar, Popover } from "antd";
import { useAuth } from "../../../util/use-auth";

const UserProfile = () => {
  const { authUser, userSignOut } = useAuth();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => userSignOut()}>Logout</li>
    </ul>
  );

  // return authUser ? (
  //   <div className="gx-flex-row gx-align-items-center gx-avatar-row gx-pointer">
  //     <Popover
  //       placement="bottomRight"
  //       content={userMenuOptions}
  //       trigger="click"
  //     >
  //       <span className="gx-mr-3 gx-fs-md">
  //         {authUser.name}
  //         {/* <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /> */}
  //       </span>
  //       <Avatar
  //         src="https://via.placeholder.com/150"
  //         className="gx-size-30 gx-mr-3"
  //         alt=""
  //       />
  //     </Popover>
  //   </div>
  // ) : null;
  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row gx-pointer">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <span className="gx-mr-3 gx-fs-md">
          {authUser?.email ? authUser.email : 'Not Logged'}
          {/* Test User */}
          {/* <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /> */}
        </span>
        <Avatar
          src="https://via.placeholder.com/150"
          className="gx-size-30 gx-mr-3"
          alt=""
        />
      </Popover>
    </div>
  );
};

export default UserProfile;
