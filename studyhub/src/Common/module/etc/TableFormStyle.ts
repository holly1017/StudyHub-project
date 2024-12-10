import styled from "styled-components";

export const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    text-align: center;
`;

export const Th = styled.th`
    border-bottom: 2px solid #dddddd;
    padding: 12px 15px;
    text-align: center;
`;


export const Td = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 12px 15px;
    vertical-align: middle;
    text-align: center;
    
     &:nth-child(2) {
        text-align: left; /* 첫 번째 열 왼쪽 정렬 */
    }
`;

export const PointTd = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 12px 15px;
    vertical-align: middle;
    text-align: center;
`;

export const TitleA = styled.a`
    text-decoration: none;
    color : #2c2c2c;
    cursor: pointer;
`