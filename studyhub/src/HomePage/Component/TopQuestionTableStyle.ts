import { styled } from "@mui/material";

export const QuestionTable = styled('table') (
    ({ backgroundColor: '#4C5B5A', 
        height: '301px',
        borderRadius: 20, 
        borderCollapse: 'collapse', 
        width:"100%" })
)

export const EmptyTd = styled('td') (
    ({
        width: '2%'
    })
)

export const QusetionTitleTD = styled('td') (
    ({
        fontSize:'18px', 
        fontWeight: 600, 
        width: '83%', 
        borderBottom: ' 2px solid rgba(255, 255, 255, 0.1)'
    })
)

export const ReplyCount = styled('td') (
    ({
        fontSize:'20px', 
        fontWeight: 800, 
        color: 'white', 
        textAlign: 'right', 
        width: '13%',  
        borderBottom: ' 2px solid rgba(255, 255, 255, 0.1)'
    })
)

export const QuestionTitleA = styled('a') (
    ({
        textDecoration : 'none', 
        color: 'white',
        cursor: 'pointer'
    })
)