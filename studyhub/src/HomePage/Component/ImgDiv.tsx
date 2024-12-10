import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import ImageTextHashTag from "./ImageTextHashTag";


interface ImgDivProps {
    img: string;
    content: string[];
    title: string;
}

const ImgDiv: React.FC<ImgDivProps> = ({ img, content, title }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
    const [customWidth, setCustomWidth] = useState(720); 
    
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
            setCustomWidth(500); 
        } else {
            setCustomWidth(720); 
        }
    }, [windowWidth]);

    return (
        <CustomDivStyle width={"100%"} height={"100%"} position="relative">
            <img src={img} alt="" />
            <CustomDivStyle position="absolute" z-index={100} top="0%" left="0%" transform="translate(30%, 70%)"  width={customWidth}>
                <CustomDivStyle color="white" fontSize={64} fontWeight={900} textAlign="left" height={130}>{title}</CustomDivStyle>
                <CustomDivStyle display="flex" height={67} gap={10} flexWrap="wrap">
                    {content.map((text, index) => (
                        <ImageTextHashTag key={index} content={text} />
                    ))}
                </CustomDivStyle>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default ImgDiv;