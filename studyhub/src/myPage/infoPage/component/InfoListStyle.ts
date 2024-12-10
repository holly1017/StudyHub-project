import styled from "styled-components";

export const ImgInput = styled.input`
    display: none
` 

export const StyledTd = styled.td<{color : string}>`
    font-weight: 900;
    color: ${(props)=>(props.color)};
`