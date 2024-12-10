import React, { useEffect, useState } from 'react';
import StudyGroupButton from '../../../Common/module/card/CardButton';
import './Content.css';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { useNavigate } from 'react-router-dom';
import ParagraphStyle from '../../../Common/Component/etc/ParagraphStyle';

interface Study {
    id: number;
    title: string;
    currentHeadCnt: number;
    maxHeadCnt: number;
    imgPath: string[];
}

interface ContentProps {
    studyArr: Study[];
    page: number;
    itemCnt: number;
    boardItemCnt: number;
    searchTitle: string;
}

const Content: React.FC<ContentProps> = ({ studyArr, page, itemCnt, boardItemCnt,searchTitle }) => {
    const [listWidth, setListWidth] = useState<number | string>("1017px");
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 824) {
                setListWidth('600px');  // 작은 화면 먼저 처리
            } else if (window.innerWidth <= 1033) {
                setListWidth('808px');
            } else {
                setListWidth('1017px');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <CustomDivStyle width={"100%"} minWidth={768} maxWidth={1017}>
            {
                studyArr.length === 0 ? (
                    <CustomDivStyle fontSize={20} paddingTop={50}>
                        "{searchTitle}"(이)가 존재하지 않습니다.
                    </CustomDivStyle>
                ) : (
                    <CustomDivStyle width={listWidth} minHeight='215px' marginTop={'31px'} display="flex" flexWrap="wrap" gap={30} marginBottom={"31px"} margin="auto">
                        <table>
                            {
                                Array.from({ length: Math.ceil((boardItemCnt / itemCnt)) }, (_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {
                                            studyArr.slice(rowIndex * itemCnt, rowIndex * itemCnt + itemCnt).map((item, index) => (
                                                <td className={index === 4 ? 'study_table_last_data' : 'study_table_data'} key={index}>
                                                    <StudyGroupButton
                                                        containerHeight={'183px'}
                                                        price={''}
                                                        subcontent={item.currentHeadCnt + '/' + item.maxHeadCnt}
                                                        content={item.title}
                                                        img={item.imgPath[0] == null ? `${process.env.PUBLIC_URL}/이미지.png` : item.imgPath[0]}
                                                        clickEvent={() => { navigate(`/study/${item.id}`) }}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                    </CustomDivStyle>
                )
            }
        </CustomDivStyle>
    );
}

export default Content;
