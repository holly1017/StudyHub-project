import React from "react";
import CustomButton from "../../../Common/Component/button/CustomButton";

interface AnswerButtonProps {
    viewAnswerWriteMethod : () => any;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({viewAnswerWriteMethod}) => {
    return(
        <CustomButton content='답변하기' width='100px' height='28px' backgroundColor="#E3E3E3" borderRadius={38} textColor="#FF4444" fontWeight={900} borderColor="#B6B6B6" borderWidth={1} borderStyle="solid" sendMethod={viewAnswerWriteMethod} />
    )
}

export default AnswerButton;