import React, { useState } from "react";
import { CustomDownOffThumbStyle, CustomDownThumbStyle } from "./CustomDownThumbStyle";

interface CustomDownThumbProps {
    fontSize: string;
    cursor: string;
    popdecrement: ()=>any;
}

const CustomDownThumb: React.FC<CustomDownThumbProps> = ({fontSize, cursor, popdecrement}) => {
    const [downThumb, setDownThumb] = useState(false);

    return (
        <>
        {
            // downThumb ? 
            false?
            <CustomDownOffThumbStyle fontSize='large' cursor="pointer" onClick={()=> setDownThumb(!downThumb)}></CustomDownOffThumbStyle> : 
            <CustomDownThumbStyle fontSize='large' cursor="pointer" onClick={popdecrement}></CustomDownThumbStyle> 
        } 
        </>
    )
}

export default CustomDownThumb;