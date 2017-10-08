import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { DocsSidebarMenu } from './SidebarMenus'

const Nav = props => {
  const {
    isSideFolded,
    isMobileNavFolded,
    onSideToggle,
    onMobileNavToggle,
    onRouteChange,
    showSideNav,
    transparent,
  } = props

  return (
    <div>
      <Navbar
        showSideNav={showSideNav}
        transparent={transparent}
        isSideFolded={isSideFolded}
        isMobileNavFolded={isMobileNavFolded}
        onSideToggle={onSideToggle}
        onMobileNavToggle={onMobileNavToggle}
      />
      {showSideNav !== false && (
        <Sidebar isFolded={isSideFolded}>
          <DocsSidebarMenu onRouteChange={onRouteChange} />
        </Sidebar>
      )}
    </div>
  )
}

export default Nav
