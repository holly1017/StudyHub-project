import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

interface StyledSearchInputContainerProps {
    width : number | string;
    height : number | string;
}

export const SeachInputBox = styled('input') (
    ({width='93%'}) => ({
        width: width,
        height: '80%',
        fontSize: 14,
        border: 0,
        outline: 'none',
        borderRadius: 10,
        
    })
)

export const SerchInputContainer = styled('div')<StyledSearchInputContainerProps> (
    ({width, height}) => ({
        width: width,
        height: height,
        borderRadius: 10,
        borderColor: "#d9d9d9",
        borderWidth: '2px',
        outline: 'none',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center'
    })
)

export const IconButtonBox = styled(IconButton) (
    () => ({
    padding: '10px'    
    })
)
