import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Avatar, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation, useHistory  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/commerce.png';
import useStyles from './styles';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const location = useLocation();
  /*const logout =() =>{
    dispatch({ type: "LOGOUT" });

    history.push("/");
    setUser(null);
  };*/
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };
  /*useEffect(()=>{
    const token = user?.token;
    //jwt...
  
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);*/
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  


  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> 
            E-STORE
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )};

         
          <div className={classes.toolbar}>
            {user?.result ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;