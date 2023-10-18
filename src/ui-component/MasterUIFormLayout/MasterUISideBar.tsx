import React from 'react'
import { SideMenu } from './MasterUIStyledComponents';

const MasterUISideBar = ({
  show,
  children,
  showSubHeader,
}: {
  show: boolean;
  children: any;
  showSubHeader?: boolean;
}) => {
  if (!show) {
    return null;
  }
  return (
    <SideMenu sx={{ top: showSubHeader ? '125px' : '65px' }}>
      {children}
    </SideMenu>
  );
};

export default MasterUISideBar