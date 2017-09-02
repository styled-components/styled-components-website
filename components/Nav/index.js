import React, { Component } from 'react'
import Sidebar from './Sidebar'
import SidebarMenu from './SidebarMenu'

class Nav extends Component {
  state = {
    isNavbarMenuFolded: true
  }

  render() {
    const { onRouteChange, isSideFolded } = this.props

    return (
      <div>
        <Sidebar isFolded={isSideFolded}>
          <SidebarMenu onRouteChange={onRouteChange} />
        </Sidebar>
      </div>
    )
  }
}

export default Nav
