import React, { useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
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

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const history = useHistory()
  const location = useLocation()

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
          <Styled.Title id='app-title'>
            {
              routes.filter(route => route.path === location.pathname)[0]
                .displayName
            }
          </Styled.Title>
          &quot;Symptom assessment&quot; FG MMVB for AI4H (WHO/ITU)
        </Toolbar>
      </AppBar>
      <Drawer open={menuOpen} onClose={(): void => setMenuOpen(false)}>
        <Styled.SideMenuList>
          {routes.map(({ displayName, path }) => (
            <ListItem
              button
              onClick={(): void => {
                history.push(path)
                setMenuOpen(false)
              }}
            >
              <ListItemText>{displayName}</ListItemText>
            </ListItem>
          ))}
        </Styled.SideMenuList>
      </Drawer>
      <Styled.Main>
        <Switch>
          {routes.map(({ id, path, component, exact }) => (
            <Route key={id} path={path} component={component} exact={exact} />
          ))}
        </Switch>
      </Styled.Main>
    </div>
  )
}
export default App
