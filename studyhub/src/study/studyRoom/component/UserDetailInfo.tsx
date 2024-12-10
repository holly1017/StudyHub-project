import React, { useEffect, useState } from 'react';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import CustomAvatar from '../../../Common/Component/etc/CustomAvatar';
import CustomDownThumb from './CustomDownThumb';
import CustomUpThumb from './CustomUpThumb';
import { postData } from '../../../Api';

interface UserDetailInfoProps {
    userName: User;
}

interface User {
    user: string,
    memberNo: number
}

const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ userName }) => {
    const [imgPath, setImagePath] = useState('');
    const [popCnt, setPopCnt] = useState(0);

    const getImgPath = async () => {
        try {
            console.log(userName.memberNo);
            const data = {
                memberNo: userName.memberNo
            }

            const response = await postData('member/profile', data);
            setImagePath(response.imgPath);
            setPopCnt(response.popCnt);
        } catch (err) {
            console.log(err);
        }
    }

    const popIncrement = async () => {
        try {
            const data = {
                memberNo: userName.memberNo
            }

            const response = await postData('member/pop/increment', data);
            if(response) {
                getImgPath();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const popdecrement = async () => {
        try {
            const data = {
                memberNo: userName.memberNo
            }

            const response = await postData('member/pop/decrement', data);
            if(response) {
                getImgPath();
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getImgPath();
    }, []);

    return (
        <CustomDivStyle display='flex' flexDirection='column' alignItems='center'>
            <CustomAvatar width={200} height={200} image={imgPath} />
            <ParagraphStyle fontSize={24} margin={'10px 0px'}>{userName.user}</ParagraphStyle>
            <CustomDivStyle display='flex' margin={'10px 0px'}>
                <CustomDownThumb fontSize='large' cursor='pointer' popdecrement={popdecrement}/>
                <ParagraphStyle fontSize={24} margin={'0px 20px'}>{popCnt}</ParagraphStyle>
                <CustomUpThumb fontSize='large' cursor='pointer' popIncrement={popIncrement}/>
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default UserDetailInfo;