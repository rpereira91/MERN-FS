import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {PATHS, getRoute} from '../utils/constants/pathNames'
const NavBar = () => {
    
    const [activeItem, setActiveItem] = useState(() => {
        // get the path name
        return getRoute(window.location.pathname)   
    })
    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
      <div>
        <Menu attached='top' tabular color="grey">
          <Menu.Item
            name={PATHS.HOME.name}
            active={activeItem === PATHS.HOME.name}
            onClick={handleItemClick}
            as={Link}
            to={PATHS.HOME.route}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name={PATHS.LOGIN.name}
                active={activeItem === PATHS.LOGIN.name}
                onClick={handleItemClick}
                as={Link}
                to={PATHS.LOGIN.route}
            />
            <Menu.Item
                name={PATHS.REGISTER.name}
                active={activeItem === PATHS.REGISTER.name}
                onClick={handleItemClick}
                as={Link}
                to={PATHS.REGISTER.route}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
}
export default NavBar