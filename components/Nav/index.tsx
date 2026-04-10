'use client';

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarMenu from './SidebarMenus';
import type { LatestPost } from '../../utils/blog';

export interface NavProps {
  isSideFolded?: boolean;
  onSideToggle?: () => void;
  latestPost: LatestPost;
}

const Nav = ({ isSideFolded, onSideToggle, latestPost }: NavProps) => {
  return (
    <>
      <Navbar isSideFolded={isSideFolded} onSideToggle={onSideToggle} />

      <Sidebar $isFolded={isSideFolded}>
        <SidebarMenu latestPost={latestPost} />
      </Sidebar>
    </>
  );
};

export default Nav;
