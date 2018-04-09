import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Pets from 'material-ui/svg-icons/action/pets';
import Parking from 'material-ui/svg-icons/maps/local-parking';
import Terrain from 'material-ui/svg-icons/maps/terrain';
import Done from 'material-ui/svg-icons/action/done';

import AddMarker from './AddMarker';
import BottomDrawerStyles from '../styles/BottomDrawer.sass';

class BottomDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markerTypes: {
        DOG_POOP: {
          title: 'Zanieczyszczona przestrzeń',
          titleSuccess: 'Dziękujemy za zgłoszenie!',
          icon: <Pets className={BottomDrawerStyles.icon} />,
          iconSuccess: <Done className={BottomDrawerStyles['icon-success']} />,
          value: 'DOG_POOP',
          canPost: true,
        },
        ILLEGAL_PARKING: {
          title: 'Brak miejsc parkingowych',
          titleSuccess: 'Dziękujemy za zgłoszenie!',
          icon: <Parking className={BottomDrawerStyles.icon} />,
          iconSuccess: <Done className={BottomDrawerStyles['icon-success']} />,
          value: 'ILLEGAL_PARKING',
          canPost: true,
        },
        CHIMNEY_SMOKE: {
          title: 'Dziury w nawierzchni',
          titleSuccess: 'Dziękujemy za zgłoszenie!',
          icon: <Terrain className={BottomDrawerStyles.icon} />,
          iconSuccess: <Done className={BottomDrawerStyles['icon-success']} />,
          value: 'CHIMNEY_SMOKE',
          canPost: true,
        },
      },
    };
  }

  async onMarkerClick(addMarkerFunc, markerType) {
    if (this.state.markerTypes[markerType].canPost) {
      const { latitude, longitude } = this.props;
      await addMarkerFunc({ lat: latitude, lng: longitude, type: markerType });
      this.setState({
        markerTypes: {
          ...this.state.markerTypes,
          [markerType]: {
            ...this.state.markerTypes[markerType],
            canPost: false,
          },
        },
      });
    }
  }
  render() {
    const { markerTypes } = this.state;

    return (
      <div className={BottomDrawerStyles.drawer}>
        {Object.values(markerTypes).map(tile => (
          <AddMarker
            className={BottomDrawerStyles.tile}
            key={tile.title}
            render={({ addMarker }) => (
              <Paper
                zDepth={1}
                rounded={false}
                onClick={() => this.onMarkerClick(addMarker, tile.value)}
                className={BottomDrawerStyles.tile}
              >
                {tile.canPost ? tile.icon : tile.iconSuccess}
                <span className={BottomDrawerStyles.title}>
                  {tile.canPost ? tile.title : tile.titleSuccess }
                </span>
              </Paper>
            )}
          />
        ))}
      </div>
    );
  }
}

export default BottomDrawer;
