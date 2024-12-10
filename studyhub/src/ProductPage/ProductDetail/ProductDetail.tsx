import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import ProfileArea from "./Component/ProfileArea";
import ProductArea from "./Component/ProductArea";
import DetailContent from "./Component/DeatilContent";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../Api";
import ReplyArea from "./Component/ReplyArea";
import { useUser } from "../../Common/UserContext";

interface ProductDetailProps {

}

interface ProductProps {
    id: number;
    writer: string;
    productName: string;
    price: number;
    productStatus: "BEST" | "TOP" | "MIDDLE" | "LOW";
    regDate: string;
    imgPath: string[];
    imgNo: number[];
    content: string;
    sellStatus: "NO" | "YES";
    writerId: number;
    profile: string;
}

interface Reply {
    id: number;
    user: string;
    content: string;
    parentId: number | null;
    dept: number;
    status: string;
    memberNo: number;
    profile: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ }) => {
    const [productDetail, setProductDetail] = useState<ProductProps>({ id: 0, writer: '', productName: '', price: 0, productStatus: "BEST", regDate: '', imgPath: [], content: '', imgNo: [], sellStatus: "NO", writerId: 0, profile: '' });
    const { id } = useParams();
    const { user } = useUser();

    const [replyArr, setReplyArr] = useState<Reply[]>([]);
    const [comment, setComment] = useState<string>('');
    const [replyContent, setReplyContent] = useState<string>('');
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [myPoint, setMypoint] = useState(0);
    const [writerId, setWriterId] = useState(0);


    const reqData = async () => {
        try {
            const response = await getData(`/trade/list/view?id=${id}`);
            console.log("응돕 : ", response);
            setProductDetail(response);
            setWriterId(response.writerId);
        } catch (error) {
            console.log("요청 실패입니다. : ", error);
        }
    }

    const insertReply = async (parentId: number) => {
        try {
            let contentData = parentId == -1 ? comment : replyContent;
            const data = {
                content: contentData,
                memberNo: user?.memberNo
            }

            const response = await postData(`/trade/reply/write?id=${id}&parentId=${parentId}`, data);
            console.log('POST 응답:', response);
            if (response) {
                parentId == -1 ? setComment('') : setReplyContent('');
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqCommentData = async () => {
        try {
            const response = await getData(`/trade/reply/list?id=${id}&page=${page - 1}&size=10&sort=replyNo,asc`);
            console.log('POS응:', response);
            setReplyArr(response.reply);
            setMaxPage(response.replyCount);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };
    

    const modifyReply = async (replyNo: number) => {
        try {
            const data = {
                content: replyContent
            }

            const response = await postData(`/trade/reply/list/update?id=${replyNo}`, data);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const deleteReply = async (replyNo: number) => {
        try {
            const response = await getData(`/trade/reply/list/delete?id=${replyNo}`);
            console.log('POST 응답:', response);
            if (response) {
                reqCommentData();
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const reqReplyContent = async (replyNo: number) => {
        try {
            const response = await getData(`/trade/reply?id=${replyNo}`);
            console.log('POST 응답답답:', response);
            setReplyContent(response);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const reqMemberData = async () => {
        const payload = {
            memberNo: user?.memberNo
        }
        try {
            const response = await postData('/member/profile', payload);
            console.log("멤버 정보", response);
            setMypoint(response.point);
        } catch (error) {
            console.log("멤버 정보 요청 에러", error);
        }
    }

    useEffect(() => {
        console.log(id);
        reqData();
        reqMemberData();
    }, [])

    useEffect(() => {
        reqCommentData();
    }, [page])

    return (
        <CustomDivStyle display="flex" alignItems="center" flexDirection="column" marginTop="38px" width="100%" maxWidth={'1017px'} minWidth={'768px'} margin="auto" marginBottom={38}>
            <ProfileArea writer={productDetail.writer} profile={productDetail.profile}></ProfileArea>
            <ProductArea
                productName={productDetail.productName}
                price={productDetail.price}
                productStatus={productDetail.productStatus}
                regDate={productDetail.regDate}
                imgPath={productDetail.imgPath}
                imgNo={productDetail.imgNo}
                myPoint={myPoint}
                boardId={productDetail.id}
                writerId={writerId}
                sellStatus={productDetail.sellStatus}
            />
            <DetailContent content={productDetail.content}></DetailContent>
            <ReplyArea
                replyArr={replyArr}
                replyMethod={insertReply}
                modifyMethod={modifyReply}
                deleteMethod={deleteReply}
                content={comment}
                setContent={setComment}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                page={page}
                handleChange={handleChange}
                reqReplyContent={reqReplyContent}
                maxPage={maxPage}
            >
            </ReplyArea>
        </CustomDivStyle>
    )
}

export default ProductDetail;