import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import CardButton from "../../../Common/module/card/CardButton";
import { useNavigate } from "react-router-dom";
import './ProductList.css';
import SoldCover from "./ProductListStyle";
import { useUser } from "../../../Common/UserContext";

interface ProductListProps {
    productArr: Product[];
    page: number;
    itemCnt: number;
    boardItemCnt: number;
}

interface Product {
    id: number;
    content: string;
    subContent: string;
    price: string;
    thumbNail: string;
    sellStatus: "NO" | "YES"
}

const ProductList: React.FC<ProductListProps> = ({ productArr, page, itemCnt, boardItemCnt }) => {
    const [listWidth, setListWidth] = useState<number | string>("1017px");
    const navigate = useNavigate();
    const { user } = useUser();

    const loginCheck = (id: number) => {
        if (user) {
            navigate(`/trade/${id}`);
        } else {
            const isOk = window.confirm('로그인 후 이용가능합니다. 로그인을 하시겠습니까?');
            if (isOk) navigate('/signin');
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 824) {
                setListWidth('600px');  // 작은 화면 먼저 처리
            } else if (window.innerWidth <= 1033) {
                setListWidth('808px');
            } else {
                setListWidth('1017px');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <CustomDivStyle width={"100%"} minWidth={768} maxWidth={1017}>
            <CustomDivStyle width={listWidth} minHeight='215px' marginTop={'31px'} display="flex" flexWrap="wrap" gap={30} marginBottom={"31px"} margin="auto">
                <table>
                    {
                        Array.from({ length: Math.ceil((boardItemCnt / itemCnt)) }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                {
                                    productArr.slice(rowIndex * itemCnt, rowIndex * itemCnt + itemCnt).map((item, index) => (
                                        <td
                                            className={index === 4 ? 'product_table_last_data' : 'product_table_data'}
                                            key={index}
                                            style={{ position: 'relative' }}
                                        >
                                            <CardButton
                                                key={index}
                                                containerHeight={'183px'}
                                                content={item.content}
                                                price={`${item.price}p`}
                                                subcontent={item.subContent}
                                                img={item.thumbNail == null ? `${process.env.PUBLIC_URL}/이미지.png` : item.thumbNail}
                                                clickEvent={() => loginCheck(item.id) }
                                            />
                                            {item.sellStatus === "YES" && (
                                                <SoldCover onClick={() => loginCheck(item.id)}>
                                                    판매 완료
                                                </SoldCover>
                                            )}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </table>
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default ProductList;