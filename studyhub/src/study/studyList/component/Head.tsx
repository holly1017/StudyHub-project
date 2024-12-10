import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import SearchInput from '../../../Common/Component/input/SearchInput';
import PostPageBtn from '../../../Common/Component/button/PostPageBtn';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../Common/UserContext';

interface HeadProps {
    onClick ?: () => any;
    search: string;
    setSearch: (value:string)=> any;
}

const Head: React.FC<HeadProps> = ({onClick, search, setSearch}) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleCreateGroupClick = () => {
        console.log(user);
        if (user) {
            navigate('/study/write');
        } else {
            const isOk = window.confirm('로그인 후 그룹을 만들 수 있습니다. 로그인을 하시겠습니까?');
            if(isOk) navigate('/signin');
        }
    };

    return (
        <>
        <CustomDivStyle display='flex' alignItems='center' justifyContent='space-between' width={'100%'} height={80} minWidth={600} borderBottom='1.7px solid #2c2c2c'>
            <ParagraphStyle fontSize={18} minWidth={181}>모집 중인 스터디 그룹</ParagraphStyle>
            <CustomDivStyle width={20}></CustomDivStyle>
            <SearchInput width={'100%'} height={36} inputWidth={'100%'} placeholder='스터디 그룹 명또는 스터디 분야' onClick={onClick} search={search} setSearch={setSearch}/>
            <CustomDivStyle width={20}></CustomDivStyle>
            <PostPageBtn content='그룹만들기' onClick={handleCreateGroupClick}/>
        </CustomDivStyle>
        </>
    );
}

export default Head;