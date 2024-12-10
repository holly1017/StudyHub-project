import React, { useState } from 'react';
import AddImageBtn from '../../../Common/Component/button/AddImageBtn';
import CustomInput from '../../../Common/Component/input/CustomInput';
import HashTagItem from '../../../Common/Component/etc/HashTagItem';
import { useChipData } from './SubContentMethod';
import './SubContentStyle.css';
import CustomBoxStyle from '../../common/CustomBoxStyle';
import SelectItems from '../../../Common/Component/etc/SelectItems';
import CustomDivStyle from '../../../Common/Component/etc/CustomDivStyle';

interface SubContentProps {
    headCntIndex: number;
    chipsData: string[];
    groupName: string;
    setChipsData: (chip:string[])=>void;
    options: string[];
    optionData: string | number;
    setOptionData: (value: string)=>any;
    setGroupName: (value: string)=>any;
    file: File | null;
    setFile: (value:File | null)=>any;
    isHeadCnt: boolean;
}

const SubContent: React.FC<SubContentProps> = ({ headCntIndex, chipsData, groupName, setChipsData, options, optionData, setOptionData, setGroupName, file, setFile, isHeadCnt }) => {
    const { inputValue, handleKeyDown, handleDelete, handleInputChange } = useChipData(chipsData, setChipsData);
    
    const changeGroupNameVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    }

    return (
        <CustomDivStyle minWidth={510}>
            <hr className='horizontal_rule'></hr>
            <table>
                { isHeadCnt &&
                <tr>
                    <td>인원수</td>
                    <td className='table_data'><SelectItems width={'100%'} height={'100%'} options={options} optionData={optionData} setOptionData={setOptionData} /></td>
                </tr>
                }
                <tr>
                    <td>태그</td>
                    <td className='table_data'>
                        <br></br>

                        <CustomInput
                            placeholderText='해시태그'
                            width={'100%'}
                            height={'100%'}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />

                        <CustomBoxStyle display='flex' gap={5} mt={1}>
                            {chipsData.map((chip, index) => (
                                <HashTagItem key={index} content={chip} onDelete={() => handleDelete(chip)} />
                            ))}
                        </CustomBoxStyle>
                        <br></br>
                    </td>
                </tr>
                <tr>
                    <td>그룹명</td>
                    <td className='table_data'><CustomInput placeholderText='그룹명' width={'100%'} height={'100%'} value={groupName} onChange={changeGroupNameVal}/></td>
                </tr>
            </table>
            <hr className='horizontal_rule'></hr>
            <AddImageBtn file={file} setFile={setFile}/>
        </CustomDivStyle>
    );
}

export default SubContent;