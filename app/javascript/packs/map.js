// Ensure this file is included in your application.js or equivalent import map.js

document.addEventListener('turbo:load', () => {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const accessToken = mapElement.dataset.mapboxAccessToken;
  mapboxgl.accessToken = accessToken;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // map style
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

  // Example itinerary data
  const itineraries = [
    {
      id: 1,
      coordinates: [
        [-74.006, 40.7128], // New York
        [-87.6298, 41.8781], // Chicago
        [-118.2437, 34.0522] // Los Angeles
      ],
      color: '#FF0000' // Red
    },
    {
      id: 2,
      coordinates: [
        [-0.1276, 51.5074], // London
        [2.3522, 48.8566], // Paris
        [13.4050, 52.5200] // Berlin
      ],
      color: '#0000FF' // Blue
    }
  ];

  map.on('load', () => {
    itineraries.forEach(itinerary => {
      map.addLayer({
        id: `route-${itinerary.id}`,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: itinerary.coordinates
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': itinerary.color,
          'line-width': 4
        }
      });
    });
  });
});