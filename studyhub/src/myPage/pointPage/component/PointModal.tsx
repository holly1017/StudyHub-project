import React, {useState} from "react";
import CustomDivStyle from "../../../Common/Component/etc/CustomDivStyle";
import { LeftTd, RightTd } from '../../../ProductPage/ProductDetail/Component/BuyModalStyle'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface PointModalProps {
    currPoint: number;
    chargePoint: number;
    setChargePoint: (value:number)=>void;
}

const PointModal:React.FC<PointModalProps> = ({currPoint, setChargePoint, chargePoint}) => {
    

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(Number(event.target.value));
        setChargePoint(Number(event.target.value));
    }
    
    return(
        <CustomDivStyle width={'100%'}>
            <CustomDivStyle height={180}>
                <FormControl>
                    <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleStatusChange}
                    >
                    <FormControlLabel value={2000} control={<Radio />} label="2,000 point (2,000원)" />
                    <FormControlLabel value={5000} control={<Radio />} label="5,000 point (5,000원)" />
                    <FormControlLabel value={10000} control={<Radio />} label="10,000 point (10,000원)" />
                    <FormControlLabel value={50000} control={<Radio />} label="50,000 point (50,000원)" />
                    </RadioGroup>
                </FormControl>
            </CustomDivStyle>
            <table width={'100%'} style={{border: "1px solid black", height: '112px', borderCollapse: 'collapse'}}>
                <colgroup>
                    <col style={{backgroundColor: '#EEEEEE'}}/>
                </colgroup>
                <tr>
                    <LeftTd>현재 포인트</LeftTd>
                    <RightTd>{currPoint} p</RightTd>
                </tr>
                <tr>
                    <LeftTd>구매 후 포인트</LeftTd>
                    <RightTd>{currPoint + chargePoint} p</RightTd>
                </tr>
            </table>

            <CustomDivStyle fontSize={12} height={50} display="flex" justifyContent="center" alignItems="center">
                확인하기를 누르시면 포인트가 차감됩니다.
            </CustomDivStyle>
        </CustomDivStyle>
    )
}

export default PointModal;