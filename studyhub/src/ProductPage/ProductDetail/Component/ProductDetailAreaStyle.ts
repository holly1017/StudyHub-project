import { styled } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Tr30 = styled('tr') (
    () => ({
        height:"30%",
    })
)

export const Tr20 = styled('tr') (
    () => ({
        height:"20%"
    })
)

export const ProductNameTd = styled('td') (
    () => ({
        fontSize: '22px', 
        fontWeight: 700,
    })
)
export const RightTd = styled('td') (
    () => ({
        fontSize: '17px',
        textAlign: 'end',
        fontWeight: 550
    })
)
export const StatusAndDateTd = styled('td') (
    () => ({
        fontSize: '15px', 
        fontWeight: 700, 
        color: "#898989"
    })
)
export const StatusAndDateDetailTd = styled('td') (
    () => ({
        textAlign: 'end', 
        fontSize: '15px', 
        fontWeight: 700, 
        color: "#898989"
    })
)

export const EmptyHeartIcon = styled(FavoriteBorderIcon) (
    () => ({
        fontSize: '30px',
        cursor: 'pointer'
    })
)
export const FullHeartIcon = styled(FavoriteIcon) (
    () => ({
        fontSize: '30px',
        cursor: 'pointer'
    })
)
export const Table = styled('table') (
    () => ({
        width:'100%',
        height:"80%"
    })
)

export const ProductStatusSpan= styled('span')<{isActive: boolean}> (
    ({isActive}) => ({
        fontWeight: isActive ? "bold" : 700,
        color : isActive ? "black" : "#d7d7d7"
    })
)