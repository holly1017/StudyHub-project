import React from 'react';
import UnderLineTitle from '../../Common/Component/etc/UnderLineTitle';
import UnderlineTextBox from '../../Common/Component/input/UnderlineTextBox'; 

interface BoardTitleProps {
    title: string;
    setTitle: (data:string)=>any;
}

const BoardTitle: React.FC<BoardTitleProps> = ({title, setTitle}) => {
    return (
        <>
            <UnderLineTitle content='스터디 게시판' width={'100%'} />
            <UnderlineTextBox width={'100%'} value={title} changeValue={setTitle}/>
        </>
    );
}

export default BoardTitle;