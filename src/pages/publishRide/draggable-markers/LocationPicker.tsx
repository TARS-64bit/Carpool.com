import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import ControlPanel from './control-panel.tsx';
import Pin from './pin.tsx';
import './LP.css';

import mapboxgl from 'mapbox-gl';


import type {MarkerDragEvent, LngLat} from 'react-map-gl';

const TOKEN = 'pk.eyJ1Ijoicm9oaXRzaGlndmFuIiwiYSI6ImNsZmZiZXFxZTQydGwzb3IwbXlvOHZmczcifQ.mHHvAjNZZZExdK7Y-4hdkg'; // Set your mapbox token here

const initialViewState = {
  latitude: 18.5204,
  longitude: 73.8567,
  zoom: 8
};

function LocationPicker(props) {
  const [marker, setMarker] = useState({
    latitude: 18.5204,
    longitude: 73.8567
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });

    props.onLocationPicked(marker.longitude, marker.latitude);
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  return (
    <>
    <div className="map1">
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
      </div>
    </>
  );
}

export default LocationPicker;