import React, { useEffect } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CustomCheck from "./CheckAreaStyle";

interface CheckAreaProps {
    adopted: "NO" | "YES";
}

const CheckArea: React.FC<CheckAreaProps> = ({ adopted }) => {

    return (
        <CustomDivStyle height="73px" display="flex" flexDirection="column" alignItems="center">
            <text style={{ fontSize: '18px', fontWeight: 'bold', color: "#845454" }}>Answer</text>
            {adopted == "YES" ? <CustomCheck fontSize="large"></CustomCheck> : <div></div>}
        </CustomDivStyle>
    )
}

export default CheckArea;