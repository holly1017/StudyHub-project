import { Box, styled } from "@mui/material";

interface StyledModalProps {
  height: number | string;
  width: number | string;
}

export const ModalBox = styled(Box)<StyledModalProps>(
  ({ theme, height, width }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: width,
  height: height,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[4],
  display: 'flex',
  flexDirection: 'column'
  })
);

export const ContentFont = styled('div')(
  () => ({
  fontSize: 25,
  fontWeight: 900,
  display: 'flex',
  alignItems: 'flex-end',
  paddingLeft: '10%',
  paddingRight: '10%',
  marginTop: "40px",

})
);

export const SubContentFont = styled('div')(
  () => ({
  fontSize: 15,
  paddingTop: '11%',
  paddingLeft: '11%',
  paddingRight: '11%',
  paddingBottom: '11%'
})
);

export const ButtonArea = styled('div')(
  () => ({
  flex : 1,
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',

})
);
