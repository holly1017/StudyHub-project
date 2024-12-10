import React from 'react';
import StudyGroupButton from '../../../Common/module/card/CardButton';
import './Content.css';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';
import { useNavigate } from 'react-router-dom';

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
}

const Content: React.FC<ContentProps> = ({ studyArr, page, itemCnt, boardItemCnt }) => {
    const navigate = useNavigate();

    return (
        <CustomDivStyle>
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
    );
}

export default Content;