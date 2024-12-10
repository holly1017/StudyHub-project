import { styled } from "@mui/material";

export const LeftTd = styled('td') (
    () => ({
        border: '1px solid black',
        width: '40%',
        paddingLeft : '10px'
    })
)

export const RightTd = styled('td') (
    () => ({
        border: '1px solid black',
        width: '60%',
        paddingLeft : '10px'
    })
)
export const NoMoneyRightTd = styled('td') (
    () => ({
        border: '1px solid black',
        width: '60%',
        paddingLeft : '10px',
        color: "red"
    })
)
