import React from "react"
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './HomeImg.css';

import 'swiper/css';
import 'swiper/css/pagination';
import ImgDiv from "./ImgDiv";

const firstContentData = [
    "#스터디그룹", "#그룹채팅", "#화면공유", "#인기도"
]

const secondContentData = [
    "#캠스터디", "#질문공유", "#중고장터", "#해시태그"
]

const thirdContentData = [
    "#일정관리", "#탈퇴리뷰", "#친구초대", "#소통"
]


const HomeImg: React.FC = () => {
    return (
        <CustomDivStyle height={"calc(100vh - 60px)"} width={"100%"}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="swiper"
                >
                    <SwiperSlide><ImgDiv title="스터디룸" content={firstContentData} img="/HomePageImage(1).png" /></SwiperSlide>
                    <SwiperSlide><ImgDiv title="스터디 허브" content={secondContentData} img="/HomeImage(2).png" /></SwiperSlide>
                    <SwiperSlide><ImgDiv title="스터디 그룹" content={thirdContentData} img="/HomeImage(3).png" /></SwiperSlide>
                    
                </Swiper>
        </CustomDivStyle>
    )
}

export default HomeImg;
