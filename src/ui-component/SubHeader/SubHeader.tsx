import {useEffect} from 'react';
import { styled, } from '@mui/material/styles';
import { Grid} from '@mui/material';
import { useContainerStore } from '../../store/containerStore';
import { ReactNode } from 'react';

const SubHeaderStyled = styled (Grid) ({
    marginTop: "5px !important",
    backgroundColor: "#FFF",
    height: "auto",
    top:"60px",
    left:"0",
    zIndex: 100,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
    position: "fixed",
    padding:"16px 24px",

});


type SubHeaderProps ={
    showSubHeader:boolean,
    children: ReactNode
}
    
/*
/* Sub header conatiner for different Fusion Sub Header Children. 
*/
const SubHeader = ({showSubHeader, children}:SubHeaderProps) => {
    const setSubHeader = useContainerStore(state=>state.setSubHeader);
    const subHeader = useContainerStore(state=>state.subHeader);

    useEffect(() => {
        setSubHeader({...subHeader, subHeader:showSubHeader });
    }, [showSubHeader])
    
    if(!showSubHeader){
        return null;
    }
    
    return (
        <SubHeaderStyled container alignItems={"center"} justifyContent={"space-between"}>
            {children}
        </SubHeaderStyled>
    )
}

export default SubHeader