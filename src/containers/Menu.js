
import React, { useState, useEffect } from 'react'
import {
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CHeader,
    CSubheader
} from '@coreui/react'
import masterData from 'src/Utility/MasterData';
import { useHistory, useLocation } from 'react-router-dom'
const Menu = (props) => {
    const location = useLocation();
    let pathName = location.pathname;
    console.log("pathName =====",pathName)




    const itemSegments = pathName.split('/').filter(segment => segment !== '');
    console.log("itemSegments =====",itemSegments)

    

    const itemIds = itemSegments.filter(segment => isNaN(segment));
    pathName = "/" + itemIds.join("/")
    let selectedPathName;
    if (pathName !== "/") {
        selectedPathName = pathName
    } else {
        selectedPathName = "/profile-details"
    }

    const arrMenuDetails = masterData.arrMenuDetails;
    let filterMenu = arrMenuDetails.filter(e => (e.id.includes(selectedPathName)))
    
    let filter = [];
    filter = filterMenu.length > 0 ? filterMenu[0].details : ''
    return (
        <>
            {filter && filter.map((menuData, index) => (
                <CHeaderNavItem key={index} >
                    <CHeaderNavLink to={menuData.url}>{menuData.name}</CHeaderNavLink>
                </CHeaderNavItem>
            ))}
        </>
    )
}
export default Menu;