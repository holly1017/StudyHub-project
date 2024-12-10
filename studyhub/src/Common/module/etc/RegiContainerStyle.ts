import { styled } from "@mui/material";

interface StyledRegiContainerProps {
    width : number | string;
}

export const Container = styled('div')<StyledRegiContainerProps> (
    ({width}) => ({
        width: width,
    })
)

export const Textarea = styled('textarea') (
    () => ({
    width: '100%',
    height: '309px',
    padding: '10px',
    paddingTop: '3%',
    fontSize: '14px',
    border: 0,
    borderBottom: '1px solid #DBDBDB',
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'none',
    backgroundColor: "#fafafa"
    })
)
