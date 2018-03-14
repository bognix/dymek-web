/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { Marker } from 'react-google-maps';


export default ({ markers }) => (
  <MarkerClusterer
    averageCenter
    enableRetinaIcons
    gridSize={60}
  >
    {markers.map(item => (
      <Marker
        position={
                  {
                    lat: Number(item.marker.geoJson.latitude),
                    lng: Number(item.marker.geoJson.longitude),
                  }
                }
        key={item.marker.id}
      />
            ))}
  </MarkerClusterer>
);

