import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import ImgSlideArea from "./ImgSlideArea";
import ProductDetailArea from "./ProductDetailArea";

interface ProductAreaProps {
    productName: string;
    price : number;
    productStatus : "BEST" | "TOP" | "MIDDLE" | "LOW";
    regDate: string;
    imgPath: string[];
    imgNo: number[];
    myPoint: number;
    boardId: number;
    writerId: number;
    sellStatus: "NO" | "YES"
}

const ProductArea:React.FC<ProductAreaProps> = ({productName, price, productStatus, regDate, imgPath, imgNo, myPoint, boardId, writerId, sellStatus}) => {
    return(
        <CustomDivStyle width="100%" display="flex" paddingTop={18} height={450}>
            <ImgSlideArea imgPath={imgPath} imgNo={imgNo}></ImgSlideArea>
            <ProductDetailArea productName={productName} price={price} productStatus={productStatus} regDate={regDate} myPoint={myPoint} boardId={boardId} writerId={writerId} sellStatus={sellStatus}></ProductDetailArea>
        </CustomDivStyle>
    )
}

export default ProductArea;