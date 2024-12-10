import { Badge, styled } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Bell = styled(NotificationsNoneIcon)(
    () => ({
        color: 'white',
        cursor: 'pointer',
    })
)

export const BudgeButton = styled(Badge)(
    () => ({
        cursor: 'pointer'
    })
)

export const ArrowDownIcon = styled(KeyboardArrowDownIcon)(
    () => ({
        color: 'white'
    })
)

export const ArrowUpIcon = styled(KeyboardArrowUpIcon)(
    () => ({
        color: 'white'
    })
)