import React from 'react';
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
          <MenuItem>Mapa</MenuItem>
          <MenuItem>
                Ostatnie Odczyty
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
