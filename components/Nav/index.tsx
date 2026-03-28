'use client';

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarMenu from './SidebarMenus';

export interface NavProps {
  isSideFolded?: boolean;
  onSideToggle?: () => void;
  showSideNav?: boolean;
}

const Nav = ({ isSideFolded, onSideToggle, showSideNav }: NavProps) => {
  return (
    <div>
      <Navbar showSideNav={showSideNav} isSideFolded={isSideFolded} onSideToggle={onSideToggle} />

      {showSideNav !== false && (
        <Sidebar $isFolded={isSideFolded}>
          <SidebarMenu />
        </Sidebar>
      )}
    </div>
  );
};

export default Nav;
