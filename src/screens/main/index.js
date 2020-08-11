import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import MenuList, {otherMailFolderListItems } from './menuData';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Category from '../../components/category'
import SubCategory from '../../components/sub-category'
import Product from '../../components/product'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 1000,
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 36,
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 70,
    [theme.breakpoints.up('sm')]: {
      width: 70,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height : "100px",
    width : "inherit",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    width : "100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const menuTempData = [
  { id : '' ,label : 'Category', path : "category"},
  { id : '' ,label : 'Sub Category', path : "sub-category" },
  { id : '' ,label : 'Product', path : "product" },
]
class SidebarLayout extends React.Component {
  state = {
    open: true,
    pageName : ""
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ open: window.innerWidth >= 760 });
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  showPage = (page) => {
    console.log("Here is data",page)
    switch(page){
      case "category" : 
        return(<Category />)
      case "sub-category" :
        return(<SubCategory />)
      case "product" :
        return(<Product />)
    }
  }

  setPage = (page) => {
    this.setState({ pageName : page })
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const drawer = (
      <div>
        <div style={{ position : "fixed", zIndex : 10000}} className={classes.toolbar}>
        </div>
        <Divider />
        <div
          style={{
            marginTop : 100
          }}
        >
          <List>
            <MenuList 
              menuData={menuTempData}
              setPage={this.setPage}
            />
          </List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </div>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classNames(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              App Layout with Sidebar
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.showPage(this.state.pageName)}
         
        </main>
      </div>
    );
  }
}

SidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SidebarLayout);