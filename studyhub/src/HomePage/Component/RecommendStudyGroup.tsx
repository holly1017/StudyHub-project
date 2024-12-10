import React, { useEffect, useState } from "react";
import CustomDivStyle from "../../Common/Component/etc/CustomDivStyle";
import CardButtonOfWidth from "../../Common/module/card/CardButtonOfWidth";
import { useNavigate } from "react-router-dom";

interface Study {
    id: number;
    title: string,
    currentHeadCnt: number,
    maxHeadCnt: number,
    imgPath: string[]
}

interface RecommendProps {
    studyList: Study[];
    id: string;
}

const UpgradeTable: React.FC<RecommendProps> = ({ studyList, id }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const navigate = useNavigate();

    // Resize event listener to update window width state
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // 최초 렌더링 시에도 window width 설정
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine how many CardButtons to display based on window width
    const visibleStudies = windowWidth < 989 ? studyList.slice(0, 2) : studyList;

    return (
        <CustomDivStyle display="flex" width="100%" minWidth={768} maxWidth={1017} justifyContent="space-between" alignItems="center" marginTop={38}>
            <CustomDivStyle display="flex" flexDirection="column" flex={1} justifyContent="space-evenly" height={250}>
                <CustomDivStyle fontSize={35} fontWeight={700}>
                    당신의 스터디 취향에 맞는 <br />
                    스터디 그룹을 추천해드립니다!
                </CustomDivStyle>
                <CustomDivStyle fontSize={15}>
                    STUDY HUB는 다양한 학습 자원과 연결된 커뮤니티를 통해 여러분의 성장 <br />
                    여정을 지원하는 온라인 스터디 플랫폼입니다.
                </CustomDivStyle>
            </CustomDivStyle>
            <CustomDivStyle flex={1} flexDirection="row" display="flex" flexWrap="wrap" gap={50} justifyContent="center" alignItems="center" height={520}>
                {visibleStudies.map((study, index) => (
                    <CardButtonOfWidth
                        key={index}
                        content={study.title}
                        containerWidth={218}
                        price=""
                        subcontent={`${study.currentHeadCnt} / ${study.maxHeadCnt}`}
                        fontSize={18}
                        img={study.imgPath[0]}
                        clickEvent={() => { navigate(`/study/${study.id}`) }}
                    />
                ))}
            </CustomDivStyle>
        </CustomDivStyle>
    );
};

export default UpgradeTable;
