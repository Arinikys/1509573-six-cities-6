import React, {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import "leaflet/dist/leaflet.css";

const Map = ({points, activeCardId}) => {

  const mapRef = useRef();

  const city = points[0].city.location;
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

    return () => {
      mapRef.current.remove();
    };

  }, [city]);

  useEffect(() => {
    const markers = [];
    points.forEach((point) => {
      const customIcon = leaflet.icon({
        iconUrl: point.id === activeCardId ? `./img/pin-active.svg` : `./img/pin.svg`,
        iconSize: [30, 30]
      });

      const marker = leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon: customIcon
      });
      marker.addTo(mapRef.current);
      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => {
        mapRef.current.removeLayer(marker);
      });
    };

  }, [points, activeCardId]);

  return (
    <div id="map" style={{height: `100%`}} />
  );
};

Map.propTypes = {
  points: PropTypes.array.isRequired,
  activeCardId: PropTypes.number,
};

export default Map;
