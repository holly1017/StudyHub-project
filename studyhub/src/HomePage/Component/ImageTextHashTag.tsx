import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";

interface ImageTextHashTagProps {
    content : string;
}

const ImageTextHashTag: React.FC<ImageTextHashTagProps> = ({content}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
    const [customFont, setCustomFont] = useState(36); 
    const [customHeight, setCustomHeight] = useState(48); 
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 974) {
            setCustomFont(20); 
            setCustomHeight(30);
        } else {
            setCustomFont(36); 
            setCustomHeight(48);
        }
    }, [windowWidth]);

    return (
        <CustomDivStyle backgroundColor="rgba(217, 217, 217, 0.35)" borderRadius={21}  height={customHeight} fontSize={customFont} fontWeight={700} color="white" display="flex" padding={10} justifyContent="center" alignItems="center">
            {content}
        </CustomDivStyle>
    )
}

export default ImageTextHashTag;