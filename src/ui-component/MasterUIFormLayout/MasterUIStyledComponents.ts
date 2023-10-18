import {styled, Grid} from '@mui/material';

export const SideMenu = styled(Grid)(({ theme }) => ({
  position: 'fixed',
  top: '65px',
  left: '0px',
  width: '19%',
  backgroundColor: theme.palette.common.white,
  height: '100vh',
  borderRight: '1px solid #E5E5E5',
  zIndex: 1,
}));