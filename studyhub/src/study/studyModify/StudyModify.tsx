import React, { useEffect, useState } from 'react';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import SubContent from '../studyList/component/SubContent';
import PageButton from '../studyList/component/PageButton';
import Content from '../common/BoardContent';
import Title from '../common/BoardTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, postMultiPartData } from '../../Api';

interface StudyModifyProps {

}

interface StudyModifyData {
    title: string;
    groupName: string;
}

const StudyModify: React.FC<StudyModifyProps> = ({ }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [groupName, setGroupName] = useState('');
    const [content, setContent] = useState('');
    const [headCntIndex, setHeadCntIndex] = useState(0);
    const [chipsData, setChipsData] = useState<string[]>([]);
    const options = ['4', '8', '10', '20'];
    const [optionData, setOptionData] = useState<string | number>(options[headCntIndex]);

    const updateStudyData = () => {
        reqUpdateData();
    }

    const reqUpdateData = async () => {
        try {
            const formData = new FormData();

            const data = {
                title: title,
                content: content,
                groupName: groupName,
                hashTag: chipsData,
                maxHeadCount: optionData,
            };

            formData.append("study", new Blob([JSON.stringify(data)], { type: "application/json" }));
            if (file) {
                formData.append("file", file);
            }

            const response = await postMultiPartData(`/study/list/update?id=${id}`, formData);
            console.log('POST 응답:', response);

            if (response) {
                navigate('/study');
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    function convertImageUrlToFile(imageUrl: string): Promise<File> {
        return fetch(imageUrl)
            .then(response => response.blob()) // URL을 Blob 객체로 변환
            .then(blob => {
                // Blob을 File로 변환
                const file = new File([blob], imageUrl, { type: blob.type });
                return file;
            })
            .catch(error => {
                console.error('Error converting image URL to file:', error);
                throw error;
            });
    }

    const reqData = async () => {
        try {
            const response = await getData(`/study/list/view?id=${id}`);
            console.log('POST 응답:', response);
            setTitle(response.title)
            setGroupName(response.groupName);
            setHeadCntIndex(response.maxHeadCnt);
            switch (response.maxHeadCnt) {
                case 4:
                    setOptionData(options[0]);
                    break;
                case 8:
                    setOptionData(options[1]);
                    break;
                case 10:
                    setOptionData(options[2]);
                    break;
                case 20:
                    setOptionData(options[3]);
                    break;
                default:
                    setOptionData(options[0]);
                    break
            }
            setContent(response.content);
            setChipsData(response.hashTag == null ? [] : response.hashTag.split(','));
            const imageFile = await convertImageUrlToFile(response.imgPath);
            setFile(imageFile);
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    useEffect(() => {
        reqData();
    }, [])

    return (
        <CustomDivStyle width={'100%'} margin={'auto'} maxWidth={1100} minWidth={700} marginTop={70} marginBottom={70}>
            <Title title={title} setTitle={setTitle} />
            <br></br>
            <Content content={content} setContent={setContent} />
            <br></br>
            <SubContent headCntIndex={headCntIndex} chipsData={chipsData} groupName={groupName} setGroupName={setGroupName} setChipsData={setChipsData} options={options} optionData={optionData} setOptionData={setOptionData} file={file} setFile={setFile} isHeadCnt={false}/>
            <br></br>
            <PageButton isWritePage={false} sendMethod={updateStudyData} />
        </CustomDivStyle>
    );
}

export default StudyModify;