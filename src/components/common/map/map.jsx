import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import "leaflet/dist/leaflet.css";

const Map = ({city, points}) => {

  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.latitude,
        lng: city.longitude,
      },
      zoom: city.zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);
  }, []);

  useEffect(() => {

    const markers = [];
    points.forEach((point) => {
      const customIcon = leaflet.icon({
        iconUrl: `./img/pin.svg`,
        iconSize: [30, 30]
      });

      const marker = leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon: customIcon
      });
      markers.push(marker);
      marker.addTo(mapRef.current);
    });

    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };

  }, [points]);

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef} />
  );
};

Map.propTypes = {
  city: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  points: PropTypes.array.isRequired,
};

export default Map;
