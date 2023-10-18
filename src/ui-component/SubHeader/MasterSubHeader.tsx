import * as React from 'react';
import {useEffect} from 'react';
import {Grid} from '@mui/material';
import { useContainerStore } from '../../store/containerStore';
import Icon from '../Icon';
import IconContainer from '../IconContainer';
import MasterMenu from './MasterMenu/MasterMenu';

type MasterSubHeaderProps={
    showCommentIcon?: boolean,
    commentCount?:number,
    onCommentIconClick?:()=>void,
    showAuditIcon?: boolean,
    onAuditItemClick?: ()=> void,
    subHeaderMasterContent:JSX.Element,
    showKebabIcon:boolean
}

/**
 * Sub header component for Fusion Master Modules. 
 * @param {boolean} showCommentIcon : Comment icon to show/hide 
 * @param {number} commentCount : Comments badge count
 * @param {function} onCommentIconClick : Click handler of comment icon
 * @param {function} onAuditItemClick: click handler of audit item
 * @returns component
 */
const MasterSubHeader =  ({
    showCommentIcon, 
    commentCount = 0, 
    onCommentIconClick,
    onAuditItemClick,
    subHeaderMasterContent,
    showKebabIcon = false,
}:MasterSubHeaderProps)=>{ 
    // set Zustand State Function
    const setSubHeader = useContainerStore(state=>state.setSubHeader);

    //get Zustand  State
    const subHeader = useContainerStore(state=>state.subHeader);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openKebabMenu = Boolean(anchorEl);

    const onKebabIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // TODO: check if this can be part of Master Menu
    const handleMenuItemClick = (name: string) => {
        switch (name?.toLowerCase()){
            case 'activity':
            onAuditItemClick && onAuditItemClick();
            break;
        }
    };

    useEffect(() => {
        //update sub header centarl state on commentCount props change
        setSubHeader({...subHeader, commentsCount:commentCount });
    }, [commentCount])

    return (<>
        <Grid item alignItems={"center"}>    
                <Grid container alignItems={"center"}>
                    <Grid item alignItems={"center"} >
                    {subHeaderMasterContent}
                    </Grid>

                    <Grid item alignItems={"center"}>
                        {/*Palceholder Last Update Label */}
                    </Grid>
                </Grid>  
            </Grid>
            <Grid item alignItems={"center"} >
                <Grid container alignItems={"center"} gap={1}>
                    <Grid item alignItems={"center"} > 
                            {/*Placeholder User Avatars */}
                    </Grid>
                    <Grid item alignItems={"center"} >
                        {/*Placeholder Hear Beat Icon */}
                    </Grid>
                    { showCommentIcon &&
                        <Grid item alignItems={"center"} >
                            <IconContainer id="commentIcon" onClick={onCommentIconClick}>
                                <Icon name={'comment'} badge={commentCount ? commentCount.toString() :""} />
                            </IconContainer>
                        </Grid>
                    }
                    {showKebabIcon &&
                    <Grid item alignItems={"center"} >
                        <IconContainer
                             id="kebabIcon"
                             aria-controls={openKebabMenu ? 'kebabMenu' : undefined}
                             aria-haspopup="true"
                             aria-expanded={openKebabMenu ? 'true' : undefined}
                             onClick={onKebabIconClick}>
                            <Icon name={'kebab'} />
                        </IconContainer>
                    </Grid>}
                    <Grid item alignItems={"center"} >
                            {/*Placeholder Select Website */}
                    </Grid>
                </Grid>
                <MasterMenu 
                    id='kebabMenu' 
                    open={openKebabMenu}
                    anchorEl={anchorEl} 
                    handleMenuClose={handleMenuClose}
                    handleMenuItemClick={(name: string) => {
                        setAnchorEl(null);
                        handleMenuItemClick(name);
                    }}
                />
            </Grid>
    </>)
}

export default MasterSubHeader