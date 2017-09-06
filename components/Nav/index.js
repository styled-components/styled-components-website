import React, { Component } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import SidebarMenu from './SidebarMenu'

class Nav extends Component {
  state = {
    isNavbarMenuFolded: true
  }

  render() {
    const { onRouteChange, onSideFold, isSideFolded } = this.props

    return (
      <div>
        <Navbar
          isFolded={isSideFolded}
          onFold={onSideFold}
        />
        <Sidebar isFolded={isSideFolded}>
          <SidebarMenu onRouteChange={onRouteChange} />
        </Sidebar>
      </div>
    )
  }
}

export default Nav
