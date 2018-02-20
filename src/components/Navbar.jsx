import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar'
import {NavLink} from 'react-router-dom'

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onTitleClick = this.onTitleClick.bind(this)
    }

    handleToggle() {
        this.setState({open: !this.state.open})
    }

    handleClose() {
        this.setState({open: false})
    }

    onTitleClick() {
        this.props.history.push('/')
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
                    <Drawer open={this.state.open} containerStyle={{top: '64px'}}>
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

const TitleStyle = {
    cursor: 'pointer'
}
