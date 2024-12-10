import React, { useState } from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import AddImageBtn from "../../../Common/Component/button/AddImageBtn";

interface AddImageProps {
    firstFile: File | null;
    setFirstFile: (value: File | null) => any;
    secondFile: File | null;
    setSecondFile: (value: File | null) => any;
    thirdFile: File | null;
    setThirdFile: (value: File | null) => any;
}

const AddImage: React.FC<AddImageProps> = ({ firstFile, setFirstFile, secondFile, setSecondFile, thirdFile, setThirdFile }) => {

    const [viewFirstBtn, setViewFirstBtn] = useState(false);
    const [viewSecondBtn, setViewSecondBtn] = useState(false);

    const handleViewFirstBtn = () => {
        setViewFirstBtn(true);
    }  

    const handleViewSecondBtn = () => {
        setViewSecondBtn(true);
    } 

    return (
        <CustomDivStyle width="100%" marginTop={26}>
            <AddImageBtn file={firstFile} setFile={setFirstFile} viewMethod={handleViewFirstBtn} />
            {viewFirstBtn && <AddImageBtn file={secondFile} setFile={setSecondFile} viewMethod={handleViewSecondBtn}/>}
            {viewSecondBtn && <AddImageBtn file={thirdFile} setFile={setThirdFile} />}
        </CustomDivStyle>
    );
};

export default AddImage;
