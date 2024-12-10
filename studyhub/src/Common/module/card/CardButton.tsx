import * as React from 'react';
import {CardArea, CardContentArea, CardImgArea, ContainerButton, Table, TableTd, TableTdPlusRight} from './CardButtonStyle';

interface CardButtonProps {
  containerHeight: number | string;
  content: string;
  subcontent?: string;
  price : string;
  fontSize?: number | string;
  img? : string;
  clickEvent ?: () => any;
}

const CardButton: React.FC<CardButtonProps> = ({ containerHeight, content, subcontent, price, fontSize, img, clickEvent }) => {
  return (
    <ContainerButton containerHeight={containerHeight}>
      <CardArea onClick={clickEvent}>
        <CardImgArea image={img}/>
        <CardContentArea>
          <Table>
            <tr>
              <TableTd fontSize={fontSize} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{content}</TableTd>
              <TableTdPlusRight fontSize={fontSize}>{price}</TableTdPlusRight>
            </tr>
            <tr>
              <TableTd></TableTd>
              <TableTdPlusRight fontSize={fontSize} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{subcontent}</TableTdPlusRight>
            </tr>
          </Table>
        </CardContentArea>
      </CardArea>
    </ContainerButton>
  );
}

export default CardButton;