import React from "react";
import { CustomBtn, CustomIcon } from "./PostPageBtnStyle";

interface PostPageBtnProps {
    content: string;
    onClick?: ()=>any;
}

const PostPageBtn: React.FC<PostPageBtnProps> = ({content, onClick}) => {
    return (
        <div>
            <CustomBtn onClick={onClick}>{content}<CustomIcon src={`${process.env.PUBLIC_URL}/pencil-icon.png`} alt="icon" /></CustomBtn>
        </div>
    )
}

export default PostPageBtn;