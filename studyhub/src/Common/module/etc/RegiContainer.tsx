import * as React from 'react';
import {Container, Textarea} from './RegiContainerStyle';
import UnderLineTitle from '../../Component/etc/UnderLineTitle';
import UnderlineTextBox from '../../Component/input/UnderlineTextBox';

interface RegiContainerProps {
    TitleWidth : number | string;
    InputWidth : number | string;
    content : string;
    ContainerWidth : number | string;
    placeholder : string;
    onChangeContent: (data : string) => void; 
    onChangeTitle: (data: string) => void;
    title : string;
    contents: string;
}

const RegiContainer : React.FC<RegiContainerProps> = ({TitleWidth, InputWidth, ContainerWidth, content, placeholder, onChangeContent, onChangeTitle, title, contents}) => {

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChangeContent(e.target.value);
    }

    return(
        <Container width={ContainerWidth}>
            <UnderLineTitle width={TitleWidth} content={content}></UnderLineTitle>
            <UnderlineTextBox width={InputWidth} value={title} changeValue={onChangeTitle}></UnderlineTextBox>
            <Textarea placeholder={placeholder} value={contents} onChange={handleContentChange}></Textarea>
        </Container>
    )
}

export default RegiContainer;