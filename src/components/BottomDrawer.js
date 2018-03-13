import React from 'react';
import Paper from 'material-ui/Paper';
import Pets from 'material-ui/svg-icons/action/pets';
import Parking from 'material-ui/svg-icons/maps/local-parking';
import Smoke from 'material-ui/svg-icons/places/smoking-rooms';

import AddMarker from './AddMarker';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '34vh',
  },
  tile: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    padding: 10,
  },
};

const tilesData = [
  {
    title: 'Zgłoś Kupkę',
    icon: <Pets style={styles.icon} />,
    value: 'DOOG_POOP',
  },
  {
    title: 'Zgłoś Nielegalne Parkowanie',
    icon: <Parking style={styles.icon} />,
    value: 'ILLEGAL_PARKING',
  },
  {
    title: 'Zgłoś Smród z komina',
    icon: <Smoke style={styles.icon} />,
    value: 'CHIMNEY_SMOKE',
  },
];

const BottomDrawer = props => (
  <div style={styles.root}>
    {tilesData.map(tile => (
      <AddMarker
        style={styles.tile}
        latitude={props.latitude}
        longitude={props.longitude}
        render={({ addMarker }) => (
          <Paper
            key={tile.title}
            zDepth={1}
            rounded={false}
            onClick={addMarker}
            style={styles.tile}
          >
            {tile.icon}
            <span style={styles.title}>
              {tile.title}
            </span>
          </Paper>
      )}
      />
    ))}
  </div>
);

export default BottomDrawer;
