import React, { useState } from 'react';
import CustomDivStyle from '../../Common/Component/etc/CustomDivStyle';
import Title from '../common/BoardTitle';
import Content from '../common/BoardContent';
import SubContent from '../studyList/component/SubContent';
import PageButton from '../studyList/component/PageButton';
import { useNavigate } from 'react-router-dom';
import { getData, postData, postMultiPartData } from '../../Api';
import { useUser } from '../../Common/UserContext';

interface StudyWriteProps {
}

const StudyWrite: React.FC<StudyWriteProps> = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    const [title, setTitle] = useState('');
    const [groupName, setGroupName] = useState('');
    const [content, setContent] = useState('');
    const [chipsData, setChipsData] = useState<string[]>([]);
    const options = ['4 (무료)', '8 (-5200p)', '10 (-15100p)', '20 (-32300p)'];
    const reqPoint = [0, 5200, 15100, 32300];
    const [optionData, setOptionData] = useState<string>(options[0]);
    const [file, setFile] = useState<File | null>(null);
    
    const sendData = async () => {
        const formData = new FormData();
        const result = optionData.split(' ')[0];
        const data = {
            title: title,
            content: content,
            groupName: groupName,
            hashTag: chipsData,
            maxHeadCount: result,
            memberNo: user?.memberNo
        };

        formData.append("study", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (file) {
            formData.append("file", file);
        }
        
        try {
            const response = await postMultiPartData('/study/write', formData); // 엔드포인트를 수정하세요
            console.log('POST 응답:', response);
            navigate('/study');
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    const decreamentPoint = async () => {
        try {
            const index = options.indexOf(optionData);

            if(index != 0) {
                const data = {
                    memberNo: user?.memberNo,
                    point: reqPoint[index],
                    useDetail: 'GROUP_HAED_INCREMENT'
                }
    
                const response = await postData('/member/point/decrement', data);
                console.log('POST 응답:', response);
            }
           
            await sendData();
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    const insertStudyData = async () => {
        if(title == "" || groupName == "" || content == "" || chipsData.length == 0) {
            alert("모든 항목을 작성해주세요.");
            return;
        }

        //서버에 스터디 게시물 데이터 insert 요청
        try {
            const data = {
                memberNo: user?.memberNo
            }

            const response = await postData('/member/profile', data); // 엔드포인트를 수정하세요
            console.log('POST 응답:', response);
            if(response) {
                const index = options.indexOf(optionData);
                if(response.point >= reqPoint[index]) {
                    await decreamentPoint();
                } else {
                    alert('포인트가 부족합니다. 확인후 다시 시도해주세요.');
                }
            }
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    }

    return (
        <CustomDivStyle width={'100%'} margin={'auto'} maxWidth={1100} minWidth={700} marginTop={38} marginBottom={38}>
            <Title title={title} setTitle={setTitle}/>
            <br></br>
            <Content content={content} setContent={setContent} />
            <br></br>
            <SubContent headCntIndex={0} chipsData={chipsData} setChipsData={setChipsData} groupName={groupName} setGroupName={setGroupName} options={options} optionData={optionData} setOptionData={setOptionData} file={file} setFile={setFile} isHeadCnt={true}/>
            <br></br>
            <PageButton isWritePage={false} sendMethod={insertStudyData} />
        </CustomDivStyle>
    );
}

export default StudyWrite;