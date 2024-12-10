import { CardActionArea, CardContent, CardMedia, styled } from "@mui/material";
import Card from '@mui/material/Card';

interface CardButtonProps {
    containerHeight?: number | string;
    fontSize?: number | string;
    img?: string;
    containerWidth?: number | string;
    overflow?: string;
    textOverflow?: string;
    whiteSpace?: string;
}

export const ContainerButton = styled(Card)<CardButtonProps>(
    ({ containerHeight }) => ({
        height: containerHeight,
        width: typeof containerHeight === 'string'
            ? `calc(${containerHeight} * 0.98)` // 만약 문자열인 경우(%)
            : containerHeight
                ? `${containerHeight * 0.98}px` // 숫자인 경우(px)
                : '100%' // containerHeight가 없으면 기본값 사용
    })
)

export const ContainerButtonOfWidth = styled(Card)<CardButtonProps>(
    ({ containerWidth }) => ({
        width: containerWidth,
        aspectRatio: '1 / 1.02', // 비율 설정 (가로 : 세로)
        display: 'flex',
        flexDirection: 'column',
    })
)


export const TableTd = styled('td')<CardButtonProps>(
    ({ fontSize, overflow, textOverflow, whiteSpace }) => ({
        width: '50%',
        fontSize: fontSize,
        overflow: overflow,
        textOverflow: textOverflow,
        whiteSpace: whiteSpace
    })
)

export const CardArea = styled(CardActionArea)(
    () => ({
        height: '100%',
        overflow: 'hidden'
    })
)

export const CardImgArea = styled(CardMedia)<CardButtonProps>(
    ({ img }) => ({
        component: "img",
        height: "65%",
        image: img,
        alt: "green iguana"
    })
)

export const CardContentArea = styled(CardContent)(
    () => ({
        height: '25%',
        padding: '5%'
    })
)

export const Table = styled('table')<CardButtonProps>(
    () => ({
        width: '100%',
        height: '100%',
        tableLayout: 'fixed'
    })
)

export const TableTdPlusRight = styled('td')<CardButtonProps>(
    ({ fontSize, overflow, textOverflow, whiteSpace }) => ({
        width: '50%',
        fontSize: fontSize,
        textAlign: 'right',
        overflow: overflow,
        textOverflow: textOverflow,
        whiteSpace: whiteSpace,
    })
)