import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import Toggle from 'material-ui/Toggle';
import { Menu, MenuItem } from 'material-ui/Menu';
import FilterIcon from 'material-ui/svg-icons/image/tune';
import Checkbox from 'material-ui/Checkbox';
import MarkersFiltersStyles from './MarkersFilters.sass';

import { MARKER_TYPES } from '../consts';

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

    const markerTypes = Object.keys(MARKER_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: {
        ...MARKER_TYPES[type],
        checked: true,
      },
    }), {});

    this.state = {
      open: false,
      anchorEl: null,
      markerTypes,
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

  handleCheckType(isChecked, type) {
    // TODO issue new request on filter change
    this.setState({
      markerTypes: {
        ...this.state.markerTypes,
        [type]: {
          ...this.state.markerTypes[type],
          checked: isChecked,
        },
      },
    });
  }

  render() {
    const menuItems = Object.keys(this.state.markerTypes);

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
                  onCheck={(event, isChecked) => this.handleCheckType(isChecked, type)}
                  checked={this.state.markerTypes[type].checked}
                />
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </div>
    );
  }
}
