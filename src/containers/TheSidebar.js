import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import logos from "../assets/icons/logo-white.png";
import smallLogo from "../assets/icons/MenuLogo.png";
import ApiURL from "../apis/RouteURL";
import { useLocation, NavLink } from 'react-router-dom'
// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let pathName = location.pathname;
  // console.log("pathName", pathName)
  const itemSegments = pathName.split('/').filter(segment => segment !== '');
  const itemIds = itemSegments.filter(segment => isNaN(segment));
  pathName = "/" + itemIds.join("/")
  const show = useSelector((state) => state.sidebarShow);
  const dynamicMenu = JSON.parse(localStorage.getItem("menu_list"));


  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full admin-logo"
          name="logo-negative"
          src={logos}
        />
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <CIcon
          className="c-sidebar-brand-minimized admin-small-logo"
          name="sygnet"
          height={35}
          src={smallLogo}
        />
        <p className="admin_txt">ADMIN</p>
      </CSidebarBrand>
      
      <CSidebarNav>
        {/* {dynamicMenu && dynamicMenu.map((item, index) => ( */}
         {navigation.map((item, index) => (
          <CSidebarNavItem key={index}>
            <NavLink
              to={item.to}
              className={`c-sidebar-nav-link ${item.to.includes(pathName) === true ? 'c-active' : ''}`}
            >
              <i className={`c-sidebar-nav-icon ${item.icon}`} style={{ marginRight: 0 }}></i>
              {item.name}
            </NavLink>

          </CSidebarNavItem>
          ))}
      </CSidebarNav>
     
      {/* <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav> */}

      {/* V 1.0 */}
      <CSidebarMinimizer className="c-d-md-down-none">
        <span className="version">{ApiURL.version}</span>
      </CSidebarMinimizer>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
