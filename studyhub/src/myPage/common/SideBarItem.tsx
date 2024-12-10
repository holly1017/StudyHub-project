import React from "react";
import { CustomBtn, CustomIcon } from "./SideBarItemStyle";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";

interface SideBarItemProps {
    content: string;
    icon: string;
    selected: boolean;
    method: ()=>any;
}

const SideBarItem: React.FC<SideBarItemProps> = ({content, icon, selected, method}) => {
    return (
        <div>
            <CustomBtn selected={selected} onClick={method}>
                <CustomDivStyle marginLeft={15}>
                    <CustomIcon src={`${process.env.PUBLIC_URL}/${icon}`} alt="icon" />
                </CustomDivStyle>
                <CustomDivStyle marginRight={50}>
                    {content}
                </CustomDivStyle>
            </CustomBtn>
        </div>
    )
}

export default SideBarItem;