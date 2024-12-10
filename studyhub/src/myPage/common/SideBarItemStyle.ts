import styled from "styled-components";

export const CustomBtn = styled.div<{ selected: boolean }>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  font-size: 18px;
  font-weight: 900;
  border: none;
  color: #2C2C2C;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#e0e0e0' : 'transparent')};
`;

export const CustomIcon = styled.img`
  width: 25px;
  height: 25px;
`;
