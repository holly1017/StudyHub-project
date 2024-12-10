import React from 'react';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface ContentProps {
    content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {

    return (
        <CustomDivStyle padding={10} minHeight={320}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </CustomDivStyle>
    );
}

export default Content;
