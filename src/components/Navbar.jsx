import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const TitleStyle = {
  cursor: 'pointer',
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
  }


  onTitleClick() {
    this.props.history.push('/');
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }


  render() {
    return (
      <div>
        <AppBar
          title="Dymek Web App"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
          onTitleClick={this.onTitleClick}
          titleStyle={TitleStyle}
        />
        <Drawer open={this.state.open} containerStyle={{ top: '64px' }}>
          <NavLink exact to="/map" onClick={this.handleClose}>
            <MenuItem>Mapa</MenuItem>
          </NavLink>
          <NavLink exact to="/feed" onClick={this.handleClose}>
            <MenuItem>
                Ostatnie Odczyty
            </MenuItem>
          </NavLink>
        </Drawer>
      </div>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Navbar;
