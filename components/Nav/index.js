import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { DocsSidebarMenu, SimpleSidebarMenu } from './SidebarMenus'

const Nav = props => {
  const {
    isSideFolded,
    isMobileNavFolded,
    onSideToggle,
    onMobileNavToggle,
    onRouteChange,
    showSideNav,
    useDocsSidebarMenu,
    transparent,
    pages,
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

      {showSideNav !== false &&
        <Sidebar isFolded={isSideFolded}>
          {useDocsSidebarMenu !== false
            ? <DocsSidebarMenu onRouteChange={onRouteChange} />
            : <SimpleSidebarMenu onRouteChange={onRouteChange} pages={pages} />}
        </Sidebar>}
    </div>
  )
}

export default Nav
