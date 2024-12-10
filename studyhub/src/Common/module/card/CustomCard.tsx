import React from 'react';
import CustomCardStyle from './CustomCardStyle';

interface CustomCardProps {
    width: number | string,
    height?: number | string,
    minHeight?: number | string,
    children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ width, height, children, minHeight }) => {

    return (
        <div>
            <CustomCardStyle width={width} height={height} minHeight={minHeight}>
                {children}
            </CustomCardStyle>
        </div>
    );
}

export default CustomCard;