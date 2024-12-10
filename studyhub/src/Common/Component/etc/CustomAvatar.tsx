import React from 'react';
import CustomStyledAvatar from './CustomAvatarStyle';

interface CustomAvatarProps {
  image?: string;
  width?: number | string;
  height?: number | string;
  onClick?: ()=>any;
  cursor?: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({width, height, image, cursor, onClick}) => {
  
  return (
    <div>
        <CustomStyledAvatar src={image} width={width} height={height} onClick={onClick} cursor={cursor}/>
    </div>
  );
}

export default CustomAvatar;