import React, { useState } from "react";
import { CustomUpOffThumbStyle, CustomUpThumbStyle } from "./CustomUpThumbStyle";

interface CustomUpThumbProps {
    fontSize: string;
    cursor: string;
    popIncrement: ()=> any;
}

const CustomUpThumb: React.FC<CustomUpThumbProps> = ({fontSize, cursor, popIncrement}) => {
    const [upThumb, setUpThumb] = useState(false);

    return (
        <>
        {
            // upThumb ? 
            false ?
            <CustomUpOffThumbStyle fontSize='large' cursor="pointer" onClick={() => setUpThumb(!upThumb)}></CustomUpOffThumbStyle> : 
            <CustomUpThumbStyle fontSize='large' cursor="pointer" onClick={popIncrement}></CustomUpThumbStyle> 
        } 
        </>
    )
}

export default CustomUpThumb;