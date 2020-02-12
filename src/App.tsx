import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import {
  AppBar,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import * as Styled from './App.style'
import { routes } from './routes'
import LinkWrapper from './components/util/LinkWrapper'
import NotFound from './components/util/NotFound'

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const currentRoute = routes.filter(route =>
    route.path.includes(':')
      ? location.pathname.startsWith(route.path.split(':')[0])
      : route.path === location.pathname,
  )[0]
  const title = currentRoute ? currentRoute.displayName : ''

  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={(): void => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Styled.Title id='app-title'>{title}</Styled.Title>
          &quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={(): void => setMenuOpen(false)}>
        <Styled.SideMenuList>
          {routes
            .filter(({ visibleInMenu }) => visibleInMenu)
            .map(({ id, displayName, path }) => (
              <LinkWrapper key={id} to={path}>
                <ListItem
                  button
                  onClick={(): void => {
                    setMenuOpen(false)
                  }}
                >
                  <ListItemText>{displayName}</ListItemText>
                </ListItem>
              </LinkWrapper>
            ))}
        </Styled.SideMenuList>
      </Drawer>
      <Styled.Main>
        <Switch>
          {routes.map(({ id, path, component, exact }) => (
            <Route key={id} path={path} component={component} exact={exact} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Styled.Main>
    </div>
  )
}
export default App
