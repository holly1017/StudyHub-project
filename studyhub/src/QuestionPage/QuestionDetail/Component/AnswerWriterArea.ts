import { styled } from "@mui/material";


const TextArea = styled('textarea')(
    () => ({
        width: '100%',
        height: '300px',
        padding: '10px',
        paddingTop: '2%',
        fontSize: '14px',
        border: 0,
        borderBottom: '1px solid #DBDBDB',
        outline: 'none',
        backgroundColor: '#fafafa',
        resize: 'none',
        boxSizing: 'border-box'
    })
)

export default TextArea;