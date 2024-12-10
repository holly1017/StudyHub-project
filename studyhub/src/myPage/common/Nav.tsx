import React from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import SideBar from "./SideBar";

interface NavProps {
    selected: string
}

const Nav : React.FC<NavProps> = ({selected}) => {
    return (
        <CustomDivStyle width={"25%"} padding={"150px 0px 0px 0px"} minWidth={180} marginRight={60}>
            <SideBar selected={selected} />
        </CustomDivStyle>
    )
}

export default Nav;