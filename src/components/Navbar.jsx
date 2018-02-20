import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar'

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
      console.log(Drawer)
    return (
      <div>
        <AppBar
          title="Dymek Web App"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer open={this.state.open} containerStyle={{top: '64px'}}>
          <MenuItem>Mapa</MenuItem>
          <MenuItem>Ostatnie Odczyty</MenuItem>
        </Drawer>
      </div>
    );
  }
}
