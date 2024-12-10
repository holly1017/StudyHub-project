import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import './UserInfoStyle.css';
import UserInfoItem from './UserInfoItem';

interface UserInfoProps {
    userName: User[];
}

interface User {
    user: string,
    memberNo: number,
    profile: string
}

const UserInfo: React.FC<UserInfoProps> = ({ userName }) => {
    return (
        <CustomDivStyle width={'100%'} height={775} border='1px solid #E5E7ED' borderRadius={3} display='flex' flexDirection='column'>
            <CustomDivStyle overflow='auto'>
                {
                    userName.map((item, index) => (
                        <UserInfoItem userName={item}/>
                    ))
                }
            </CustomDivStyle>
        </CustomDivStyle>
    );
}

export default UserInfo;