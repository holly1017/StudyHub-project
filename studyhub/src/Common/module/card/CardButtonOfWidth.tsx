import * as React from 'react';
import {CardArea, CardContentArea, CardImgArea, ContainerButtonOfWidth, Table, TableTd, TableTdPlusRight} from './CardButtonStyle';

interface CardButtonProps {
  containerHeight?: number | string;
  content: string;
  subcontent?: string;
  price : string;
  fontSize?: number | string;
  img? : string;
  containerWidth? : number | string
  clickEvent ?: () => any;
}

const CardButtonOfWidth: React.FC<CardButtonProps> = ({ containerHeight, content, subcontent, price, fontSize, img, containerWidth, clickEvent }) => {
  return (
    <ContainerButtonOfWidth containerWidth={containerWidth} containerHeight={containerHeight}>
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
              <TableTdPlusRight fontSize={fontSize}>{subcontent}</TableTdPlusRight>
            </tr>
          </Table>
        </CardContentArea>
      </CardArea>
    </ContainerButtonOfWidth>
  );
}

export default CardButtonOfWidth;