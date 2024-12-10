import { useState } from "react";

export const useReplyVisibility = () => {
    const [isReplyVisible, setIsReplyVisible] = useState<boolean>(false); 

    const handleAddReply = () => {
    setIsReplyVisible(!isReplyVisible);
    };

    return { isReplyVisible, handleAddReply };
};
