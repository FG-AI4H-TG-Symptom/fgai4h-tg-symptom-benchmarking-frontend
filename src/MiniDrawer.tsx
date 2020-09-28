import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { routes } from './routes';
import LinkWrapper from './components/common/LinkWrapper';
import * as Styled from './App.style';
import logo from './logo.svg';

// Adapted from https://material-ui.com/components/drawers/#mini-variant-drawer

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const MiniDrawer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const currentRoute = routes.filter((route) =>
    route.path.includes(':')
      ? location.pathname.startsWith(route.path.split(':')[0])
      : route.path === location.pathname,
  )[0];
  const title = currentRoute ? currentRoute.displayName : '';

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          <Styled.Title id="app-title">{title}</Styled.Title>
          &quot;Symptom assessment&quot; FG MMVB for AI4H (ITU/WHO)
          <Styled.Logo src={logo} alt="FG AI4H logo" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes
            .filter(({ visibleInMenu }) => visibleInMenu)
            .map(({ id, displayName, path, icon: Icon, action }) => (
              <LinkWrapper key={id} to={path}>
                <ListItem
                  button
                  selected={currentRoute.id === id}
                  onClick={(): void => {
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>{Icon ? <Icon /> : <></>}</ListItemIcon>
                  <ListItemText>{displayName.replace('manager', '')}</ListItemText>
                  {action && (
                    <ListItemSecondaryAction
                      onClick={(): void => {
                        setOpen(false);
                      }}
                    >
                      {/* todo: this is illegal HTML since it's a link inside a link */}
                      {/* <LinkWrapper to={action.targetPath}>
                        <IconButton>
                          <action.icon />
                        </IconButton>
                      </LinkWrapper> */}
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              </LinkWrapper>
            ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MiniDrawer;
