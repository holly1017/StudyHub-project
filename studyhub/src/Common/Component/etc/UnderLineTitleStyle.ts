import { styled } from "@mui/material";

interface StyledUnderLineTitleProps {
    width: number | string;
}

const TitleContainer = styled('div')<StyledUnderLineTitleProps> (
    ({width}) => ({
        width: width,
        fontSize: 20,
        fontWeight: 700,
        borderBottom: '2px solid #2C2C2C',
        height: '45px',
    })
);

export default TitleContainer;