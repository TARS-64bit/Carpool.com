import * as React from 'react';
import type {LngLat} from 'react-map-gl';
import './Control.css';


const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel(props: {events: Record<string, LngLat>}) {
  return (
    <div className="control-panel">
      <p>Try dragging the marker to another location.</p>
      <div>
        {eventNames.map(eventName => {
          const {events = {}} = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong>{' '}
              {lngLat ? `${round5(lngLat.lng)}, ${round5(lngLat.lat)}` : <em>null</em>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ControlPanel;
