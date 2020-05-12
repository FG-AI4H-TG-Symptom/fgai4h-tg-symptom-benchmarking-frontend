import React, { useState } from 'react'
import { connect } from 'react-redux'
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
import LinkWrapper from './components/common/LinkWrapper'
import NotFound from './components/common/NotFound'
import logo from './logo.svg'
import { RootState } from './data/rootReducer'
import Error from './components/common/Error'

interface AppProps {
  fatalError?: string
}

const App: React.FC<AppProps> = ({ fatalError }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const currentRoute = routes.filter(route =>
    route.path.includes(':')
      ? location.pathname.startsWith(route.path.split(':')[0])
      : route.path === location.pathname,
  )[0]
  const title = currentRoute ? currentRoute.displayName : ''

  return (
    <>
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
          <Styled.Logo src={logo} alt='FG AI4H logo' />
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
                  <ListItemText>
                    {displayName.replace('manager', '')}
                  </ListItemText>
                </ListItem>
              </LinkWrapper>
            ))}
        </Styled.SideMenuList>
      </Drawer>
      <Styled.Main>
        {fatalError ? (
          <Error error={fatalError} />
        ) : (
          <Switch>
            {routes.map(({ id, path, component, exact }) => (
              <Route key={id} path={path} component={component} exact={exact} />
            ))}
            <Route component={NotFound} />
          </Switch>
        )}
      </Styled.Main>
    </>
  )
}

const mapStateToProps = (state: RootState): AppProps => ({
  fatalError: state.application.fatalError,
})

export default connect(mapStateToProps)(App)
