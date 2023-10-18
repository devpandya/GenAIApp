import { Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type drawer = {
  children?: any,
  open: boolean,
  direction?: string,
  closeHandler: () => void,
  chevronIconClassName?: string
}

/**
 * Component to create right drawer for the application
 * @param {Object} children - React Elements
 * @param {boolean} open - State to open/close drawer
 * @param {string} direction - Direction to show chevron icon
 * @param {function} closeHandler - function on clsing the drawer
 * @returns 
 */
const RightDrawer = ({
    children,
    open,
    direction,
    closeHandler,
    chevronIconClassName
}: drawer) => {

  const drawerWidth = 550; //660; figma

  const handleDrawerClose = () => {
    closeHandler && closeHandler();
  };

  return (
      <Drawer
        id={"right-drawer"}
        sx={{
          width: drawerWidth,
          top: '42%',
          marginTop:'132px !important',
          flexShrink: 0,
          backgroundColor: "white",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height:"78vh",
            marginTop:'132px !important',
            overflow:'inherit',
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {direction === 'right' && 
          <IconButton id="right-icon" sx={{ 
            position:'absolute',
            top: '2vw',
            zIndex:'1',
            left: '-0.5vw'}} 
            onClick={handleDrawerClose}
            className={chevronIconClassName}>
            <ChevronRightIcon /> 
        </IconButton>}
        {direction === 'left' &&
          <IconButton id="left-icon" onClick={handleDrawerClose} className={chevronIconClassName}>
            <ChevronLeftIcon /> 
        </IconButton>}
        {children}
      </Drawer>
  );
}

export default RightDrawer;
