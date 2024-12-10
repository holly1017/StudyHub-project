import React from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./ImgSlideArea.css";
import { Navigation } from "swiper/modules";

interface ImgSlideAreaProps {
  imgPath: string[];
  imgNo: number[];
}

const ImgSlideArea: React.FC<ImgSlideAreaProps> = ({ imgPath, imgNo }) => {
  // 기본 이미지 경로
 
  // imgPath가 비어 있으면 기본 이미지 추가
  const images = imgPath.length > 0
    ? imgPath.map((path, index) => ({
        path: path && path.trim() !== "" ? path : `${process.env.PUBLIC_URL}/이미지.png`, // 기본 이미지 처리
        no: imgNo[index],
      })).sort((a, b) => a.no - b.no)
    : [{ path: `${process.env.PUBLIC_URL}/이미지.png`, no: 0 }];  // 빈 배열이면 기본 이미지만 추가

  return (
    <CustomDivStyle
      width={"50%"}
      height={"100%"}
      display="flex"
      flexDirection="row"
      marginRight={"10%"}
    >
      <CustomDivStyle width={"100%"}>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {images.map((image, index) => (
            <SwiperSlide key={image.no || index}>
              <img
                src={image.path}
                alt={`Slide ${index + 1}`}  // alt 속성 추가
                width="100%"
                height="100%"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CustomDivStyle>
    </CustomDivStyle>
  );
};

export default ImgSlideArea;
