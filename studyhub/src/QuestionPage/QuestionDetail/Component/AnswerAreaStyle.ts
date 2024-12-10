import { styled } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const EmptyHeart = styled(FavoriteBorderIcon) (
    () => ({
       cursor: 'pointer',
       color: 'red' 
    })
)

export const FullHeart = styled(FavoriteIcon) (
    () => ({
        cursor: 'pointer' ,
        color : 'red'
    })
)

export const AddCommentButton = styled('button') (
    () =>  ({
        border: 0, 
        cursor: 'pointer', 
        width: '65px', 
        backgroundColor: 'transparent'
    })
)

export const UnderLineText = styled('u') (
    () => ({
        fontSize: '12px', 
        color: 'black'
    })
)