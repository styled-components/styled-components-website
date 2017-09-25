import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SidebarMenu from './SidebarMenu'

const Nav = props => {
  const {
    isSideFolded,
    isMobileNavFolded,
    onSideToggle,
    onMobileNavToggle,
    onRouteChange,
  } = props

  return (
    <div>
      <Navbar
        isSideFolded={isSideFolded}
        isMobileNavFolded={isMobileNavFolded}
        onSideToggle={onSideToggle}
        onMobileNavToggle={onMobileNavToggle}
      />
      <Sidebar isFolded={isSideFolded}>
        <SidebarMenu onRouteChange={onRouteChange} />
      </Sidebar>
    </div>
  )
}

export default Nav
