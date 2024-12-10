import * as React from 'react';
import Rating from '@mui/material/Rating';

interface StarRatingProps {
  starPoint: number | null;
  setStarPoint: (value:number | null) => any;
}

const StarRating: React.FC<StarRatingProps> = ({starPoint, setStarPoint }) => {
  return (
    <Rating
        name="simple-controlled"
        value={starPoint}
        onChange={(event, newValue) => {
          setStarPoint(newValue);
        }}
        size="large"
      />
  );
}

export default StarRating;