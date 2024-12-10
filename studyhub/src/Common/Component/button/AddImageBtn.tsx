import React, { useRef, useState } from "react";
import { CameraIcon, ImageBtn, ImageInput } from "./AddImageBtnStyle";
import CustomDivStyle from "../etc/CustomDivStyle";

interface AddImageBtnProps {
  file: File | null;
  setFile: (value: File | null) => any;
  viewMethod?: () => any;
}


const AddImageBtn: React.FC<AddImageBtnProps> = ({ file, setFile, viewMethod }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (viewMethod) {
      viewMethod(); 
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      
    }
  };

  return (
    <CustomDivStyle display="inline-block" paddingRight={15}>
      <ImageInput ref={fileInputRef} type="file" onChange={handleFileChange} />
      
      <ImageBtn
        onClick={handleButtonClick}
        style={{
          backgroundImage: file ? `url(${URL.createObjectURL(file)})` : `url(${process.env.PUBLIC_URL}/camera-icon.png)`, 
          backgroundSize: file ? 'cover' : '50px 48px', 
          backgroundPosition: 'center', 
          backgroundRepeat: "no-repeat"
        }}
      >
      </ImageBtn>
    </CustomDivStyle>
  );
}

export default AddImageBtn;