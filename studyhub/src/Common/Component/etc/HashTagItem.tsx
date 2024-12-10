import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface HashTagItemProps {
    content: string
    onDelete?: () => void;
}

const HashTagItem: React.FC<HashTagItemProps> = ({content, onDelete}) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={`#${content}`} variant="outlined" onDelete={onDelete} />
    </Stack>
  );
}

export default HashTagItem;
