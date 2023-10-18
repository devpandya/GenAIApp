import React from 'react'
import { styled, Grid } from '@mui/material';

const Footer = styled(Grid)(({ theme }) => ({
    position: "fixed",
    bottom: "0px",
    left: "0px",
    right: "0px",
    background: theme.palette.common.black,
    display: "flex",
    height: "55px",
    alignItems: "center",
    zIndex: 100,
    padding:"0px 24px",
    justifyContent:"space-between"
}));

/**
 * @description Fixed Footer or Master UI
 * @param id
 * @param children
 * @param className
 * @returns JSX.Element
 */
const FixedFooter = ({id,children,className}) => {
  return <Footer id={id} className={className}>{children}</Footer>;
}

export default FixedFooter