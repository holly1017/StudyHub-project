import styled from "styled-components"

export const PercentTd = styled.td<{width: string}>`
    width: ${(props)=> props.width};
`