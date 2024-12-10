import { styled } from "@mui/material";

export const HashTag = styled('span') (
    () => ({
        fontSize: '18px', 
        fontWeight: 'bold', 
        color:"#1C24D1"
    })
)
export const UserId = styled('span') (
    () => ({
        color: '#2C2C2C', 
        fontSize: '12px', 
        fontWeight: 750, 
        alignSelf: 'center'
    })
)
export const DateSpan = styled('span') (
    () => ({
        fontSize: '12px', 
        fontWeight:'normal'
    })
)
export const ViewsSpan = styled('span') (
    () => ({
        fontSize: '12px', 
        fontWeight:'normal', 
        marginLeft: '5%'
    })
)
export const PointText = styled('text') (
    () => ({
        fontWeight: 'bold', 
        color: '#25BB00'
    })
)