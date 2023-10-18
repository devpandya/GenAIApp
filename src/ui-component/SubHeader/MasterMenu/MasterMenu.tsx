import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import KebabMenu from "../../KebabMenu";
import { menuItems } from './MenuData';

// Master Menu props
type MasterMenuProps={
    id: string,
    open:boolean,
    anchorEl: HTMLElement | null,
    handleMenuClose:() => void,
    handleMenuItemClick: (arg1 : string) => void
}

const Text = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    fontWeight: '400',
    fontStyle: 'normal',
    color: theme.palette.common.black
}));

/**
 * Construct the Master Menu
 * @category Components
 * @param {string} id : ID of the component
 * @param {boolean} open : show/hide menu
 * @param {HTMLElement} anchorEl : reference html element 
 * @param {function} handleMenuClose : menu close hanlder
 * @param {function} handleMenuItemClick : menu item click handler
 * @returns {component} MasterMenu
 */
const MasterMenu = ({
    id,
    open,
    anchorEl, 
    handleMenuClose,
    handleMenuItemClick
}: MasterMenuProps) => {

    // function to get icon based on menu name
    const getIcon = (name : string) => {
        if(name){
            switch (name.toLowerCase()){
                case 'activity':
                return <TrackChangesIcon id={"auditIcon"} />
            }
        }
        return;
    };
    return (
        <KebabMenu 
        id={id}
        open={open}
        anchorEl={anchorEl} 
        handleClose={handleMenuClose}>
        <Grid container sx={{width: '400px'}} rowSpacing={2}>
            {menuItems && menuItems.map((item) => (
            <Grid 
                id={`${item.name}Id`}
                key={item.id}
                item 
                display={"flex"} 
                direction={"column"} 
                justifyContent={'center'} 
                alignItems={'center'} 
                xs={4}
                onClick={() => handleMenuItemClick(item.name)}>
                {getIcon(item.name)}
                <Text id="name">{item.name}</Text> 
            </Grid>
            ))}
            </Grid>
        </KebabMenu>
    );
}

export default MasterMenu;