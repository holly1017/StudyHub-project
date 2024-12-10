import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import TopAreaDiv from "../../QuestionPage/QuestionList/QuestionListStyle";
import PostPageBtn from "../../Common/Component/button/PostPageBtn";
import ProductList from "./Component/ProductList";
import MoreViewArea from "./Component/MoreViewArea";
import { Link, useNavigate } from "react-router-dom";
import CustomLinkStyle from "../../Common/Component/button/CustomLinkStyle";
import { getData } from "../../Api";
import { useUser } from "../../Common/UserContext";

interface ProductPageListProps {
}

interface Product {
  id: number;
  content: string;
  subContent: string;
  price: string;
  thumbNail: string;
  sellStatus: "NO" | "YES"
}

const ProductPageList: React.FC<ProductPageListProps> = ({ }) => {
  const [productArr, setProductArr] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [colCount, setColCount] = useState(5);
  const [size, setSize] = useState(colCount * 3);
  const [boardItemCnt, setBoardItemCnt] = useState(0);

  const { user } = useUser();
  const navigate = useNavigate();

  const loginCheck = () => {
    if (user) {
      navigate("/trade/write");
    } else {
      const isOk = window.confirm('로그인 후 이용가능합니다. 로그인을 하시겠습니까?');
      if (isOk) navigate('/signin');
    }
  }

  const fetchProductData = async () => {
    try {
      const response = await getData(`/trade/list?page=0&sort=tradeNo,desc&size=${size * page}`);
      console.log("응답 : ", response)
      setProductArr(response);
      setBoardItemCnt(response.length);
    } catch (error) {
      console.log("대실패", error)
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [page, size]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    getItemCnt();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getItemCnt();
  }, [windowWidth]);

  const getItemCnt = (): void => {
    if (window.innerWidth <= 824) {
      setColCount(3);
      setSize(3 * 3);
    } else if (window.innerWidth <= 1033) {
      setColCount(4);
      setSize(4 * 3);
    } else {
      setColCount(5);
      setSize(5 * 3);
    }
  }

  return (
    <CustomDivStyle display="flex" alignItems="center" flexDirection="column" marginTop="38px" width={"100%"} minWidth={768} maxWidth={1017} margin="auto">
      <TopAreaDiv>
        <CustomDivStyle fontSize={18}>장터 게시판</CustomDivStyle>
        <PostPageBtn content="글 작성하기" onClick={loginCheck}></PostPageBtn>
      </TopAreaDiv>
      <ProductList productArr={productArr} page={page} itemCnt={colCount} boardItemCnt={boardItemCnt}></ProductList>
      <MoreViewArea setPage={setPage} page={page}></MoreViewArea>
    </CustomDivStyle>
  )
}


export default ProductPageList;