import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1.5rem',
    [theme.breakpoints.down('md')]: { height: '.5rem' },
    [theme.breakpoints.down('sm')]: { height: '0rem' },
  },
  logo: {
    height: '6em',
    [theme.breakpoints.down('md')]: { height: '5rem' },
    [theme.breakpoints.down('sm')]: { height: '4.5rem' },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md')); // return true if it's bel9ow of md
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuOptions = [
    { name: 'Services', link: '/services', key: 'menu_item-1' },
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
      key: 'menu_item-2',
    },
    { name: 'Movile App Development', link: '/mobileapps', key: 'menu_item-3' },
    { name: 'Website Development', link: '/websites', key: 'menu_item-4' },
  ];

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={e => handleClick(e)}
          to="/services"
          label="Services"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/revolution"
          label="The Revolution"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/about"
          label="About Us"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/contact"
          label="Contact US"
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option.key}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={e => {
              handleMenuItemClick(e, i);
              setValue(1);
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0);
          setSelectedIndex(0);
        }
        break;
      case '/services':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/revolution':
        if (value !== 2) {
          setValue(2);
        }
        break;
      case '/about':
        if (value !== 3) {
          setValue(3);
        }
        break;
      case '/contact':
        if (value !== 4) {
          setValue(4);
        }
        break;
      case '/customsoftware':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case '/mobileapps':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case '/websites':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      default:
        break;
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <ToolBar disableGutters>
            <Button
              component={Link}
              to="/"
              onClick={() => setValue(0)}
              disableRipple
              className={classes.logoContainer}
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            {matches ? null : tabs}
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
};

export default Header;
