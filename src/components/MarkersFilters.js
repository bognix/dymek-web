import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import Toggle from 'material-ui/Toggle';
import { Menu, MenuItem } from 'material-ui/Menu';
import FilterIcon from 'material-ui/svg-icons/image/tune';
import Checkbox from 'material-ui/Checkbox';
import MarkersFiltersStyles from '../styles/MarkersFilters.sass';

const MenuItemStyle = {
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const FILTERS_LABELS = {
  DOOG_POOP: 'Pokaż psie kupki',
  ILLEGAL_PARKING: 'Pokaż nielegalne parkowanie',
  CHIMNEY_SMOKE: 'Pokaż smród z komina',
};

export default class MarkersFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleUserFilter = this.handleUserFilter.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleUserFilter(event, isChecked) {
    event.preventDefault();
    event.stopPropagation();

    this.props.onUserChange(isChecked);
  }

  render() {
    const menuItems = Object.keys(this.props.markerTypes);

    return (
      <div className={MarkersFiltersStyles['markers-list']}>
        <RaisedButton
          label="Filtruj listę"
          labelPosition="before"
          primary
          onClick={this.handleClick}
          icon={<FilterIcon />}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem style={MenuItemStyle}>
              <Toggle
                label="Tylko Twoje Zgłoszenia"
                toggled={this.props.userFilter}
                onToggle={this.handleUserFilter}
                labelPosition="right"
              />
            </MenuItem>
            {menuItems.map(type => (
              <MenuItem style={MenuItemStyle} key={type}>
                <Checkbox
                  label={FILTERS_LABELS[type]}
                  labelPosition="right"
                  onCheck={(event, isChecked) => this.props.onTypesChange(isChecked, type)}
                  checked={this.props.markerTypes[type].checked}
                />
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </div>
    );
  }
}
