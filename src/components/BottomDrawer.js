import React from 'react';
import Paper from 'material-ui/Paper';
import Pets from 'material-ui/svg-icons/action/pets';
import Parking from 'material-ui/svg-icons/maps/local-parking';
import Smoke from 'material-ui/svg-icons/places/smoking-rooms';

import AddMarker from './AddMarker';
import BottomDrawerStyles from './BottomDrawer.sass';

const tilesData = [
  {
    title: 'Zgłoś Kupkę',
    icon: <Pets className={BottomDrawerStyles.icon} />,
    value: 'DOOG_POOP',
  },
  {
    title: 'Zgłoś Nielegalne Parkowanie',
    icon: <Parking className={BottomDrawerStyles.icon} />,
    value: 'ILLEGAL_PARKING',
  },
  {
    title: 'Zgłoś Smród z komina',
    icon: <Smoke className={BottomDrawerStyles.icon} />,
    value: 'CHIMNEY_SMOKE',
  },
];

const BottomDrawer = props => (
  <div className={BottomDrawerStyles.drawer}>
    {tilesData.map(tile => (
      <AddMarker
        className={BottomDrawerStyles.tile}
        latitude={props.latitude}
        longitude={props.longitude}
        key={tile.title}
        render={({ addMarker }) => (
          <Paper
            zDepth={1}
            rounded={false}
            onClick={() => addMarker({
              latitude: props.latitude, longitude: props.longitude, type: tile.value,
            })}
            className={BottomDrawerStyles.tile}
          >
            {tile.icon}
            <span className={BottomDrawerStyles.title}>
              {tile.title}
            </span>
          </Paper>
      )}
      />
    ))}
  </div>
);

export default BottomDrawer;
