import React from "react";
import CustomInput from "../../../Common/Component/input/CustomInput";
import CustomBoxStyle from "../../../study/common/CustomBoxStyle";
import HashTagItem from "../../../Common/Component/etc/HashTagItem";
import { useChipData } from "../../../study/studyList/component/SubContentMethod";
import AlignCenterTd from "./InputTableStyle";


interface InputTableProps {
    chipsData : string[];
    setChipsData: (chip:string[])=>void;
    point: string;
    setPoint: (data: string) => void;
}

const InputTable:React.FC<InputTableProps> = ({chipsData, setChipsData, point, setPoint}) => {

    const { inputValue, handleKeyDown, handleDelete, handleInputChange } = useChipData(chipsData, setChipsData);

    const handlePointChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPoint(e.target.value);
    }

    return(
        <>
            <table width={"100%"} border={0}>
                <tr>
                    <AlignCenterTd width={"8%"}>태그</AlignCenterTd>
                    <td width={'40%'}>
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
                        </td>
                </tr>
                <tr>
                    <AlignCenterTd width={"8%"} style={{textAlign: 'center'}}>포인트</AlignCenterTd>
                    <td width={'40%'}>
                        <CustomInput
                            placeholderText='point'
                            width={'100%'}
                            height={'100%'}
                            value={point}
                            onChange={handlePointChange}
                        />
                    </td>
                    <td>point</td>
                </tr>
            </table>
        </>
    )
}

export default InputTable;