import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar'

//inspiration => https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
function Header() {
  return (
    <div className="Header">
      <ResponsiveAppBar />
    </div>
  );
}

export default Header;
