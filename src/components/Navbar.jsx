/* eslint jsx-a11y/anchor-is-valid: "off" */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

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
        <Drawer
          open={this.state.open}
          containerStyle={{ top: '64px' }}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <NavLink to="/map" className="ml1 no-underline black" onClick={this.handleClose}>
            <MenuItem>Mapa</MenuItem>
          </NavLink>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Navbar);
