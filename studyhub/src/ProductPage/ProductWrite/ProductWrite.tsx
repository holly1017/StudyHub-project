import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import RegiContainer from "../../Common/module/etc/RegiContainer";
import InputSubContent from "../ProductWrite/Component/InputSubContent"
import SubmitButtonArea from "./Component/SubmitButtonArea";
import AddImage from "./Component/AddImage";
import { useNavigate } from "react-router-dom";
import { postData, postMultiPartData } from "../../Api";
import { useUser } from "../../Common/UserContext";

interface ProductWriteProps {
}

const ProductWrite: React.FC<ProductWriteProps> = ({ }) => {

    const { user } = useUser();

    const [contents, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [productStatus, setProductStatus] = useState('');
    const [price, setPrice] = useState('');
    const [firstFile, setFirstFile] = useState<File | null>(null);
    const [secondFile, setSecondFile] = useState<File | null>(null);
    const [thirdFile, setThirdFile] = useState<File | null>(null);
    const [files, setFiles] = useState<File[] | null>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setFiles([firstFile, secondFile, thirdFile].filter(file => file !== null) as File[]);
    }, [firstFile, secondFile, thirdFile]);

    const writeProduct = async () => {

        const formData = new FormData();
        const memberNo = user?.memberNo;

        const payload = {
            title: title,
            content: contents,
            productStatus: productStatus,
            price: price,
            memberNo: memberNo
        };

        formData.append("trade", new Blob([JSON.stringify(payload)], { type: "application/json" }));

        if (files && files.length > 0) {
            files.forEach((file) => {
                formData.append("file", file); // 파일 배열 처리
            });
        }

        try {
            const response = await postMultiPartData("/trade/write", formData);
            console.log("응답 완료", response);
            navigate('/trade');
        } catch (error) {
            console.log("응답 대실패");
        }

    }

    const noContent = () => {
        if(!title || !productStatus || !price || !files) {
            alert("모든 요소를 입력하셔야 등록이 가능합니다.")
        } else {
            writeProduct();
        }
    }

    return (
        <CustomDivStyle display='flex' alignItems="center" flexDirection="column" marginTop="38px" width={"100%"} minWidth={768} maxWidth={1017} margin="auto">
            <RegiContainer ContainerWidth={'100%'} InputWidth={'100%'} TitleWidth={'100%'} content={'장터 게시판'} placeholder={'내용을 입력해주세요.'} onChangeContent={setContent} onChangeTitle={setTitle} title={title} contents={contents}></RegiContainer>
            <InputSubContent productStatus={productStatus} price={price} setProductStatus={setProductStatus} setPrice={setPrice} />
            <AddImage 
            firstFile={firstFile} setFirstFile={setFirstFile} 
            secondFile={secondFile} setSecondFile={setSecondFile} 
            thirdFile={thirdFile} setThirdFile={setThirdFile} />
            <SubmitButtonArea clickEvent={noContent} price={price}/>
        </CustomDivStyle>
    )
}

export default ProductWrite;