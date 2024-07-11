// Ensure this file is included in your application.js or equivalent import map.js

document.addEventListener("turbo:load", () => {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const accessToken = mapElement.dataset.mapboxAccessToken;
  mapboxgl.accessToken = accessToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 1.5,
    center: [30, 50],
    projection: 'globe'
    });

  // Example itinerary data
  const itineraries = [
    {
      id: 1,
      coordinates: [
        [-74.006, 40.7128], // New York
        [-87.6298, 41.8781], // Chicago
        [-118.2437, 34.0522], // Los Angeles
      ],
      color: "#FF0000", // Red
    },
    {
      id: 4,
      coordinates: [
        [-0.1276, 51.5074], // London
        [2.3522, 48.8566], // Paris
        [13.405, 52.52], // Berlin
      ],
      color: "#0000FF", // Blue
    },
  ];

  map.on("load", () => {
    map.setFog({});
    itineraries.forEach((itinerary) => {
      // Add click event listener
      map.on("click", `route-${itinerary.id}`, (e) => {
        window.location.href = `/itineraries/${itinerary.id}`;
      });

      // Change the cursor to a pointer when the mouse is over the itinerary line
      map.on("mouseenter", `route-${itinerary.id}`, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to default when it leaves
      map.on("mouseleave", `route-${itinerary.id}`, () => {
        map.getCanvas().style.cursor = "";
      });

      map.addLayer({
        id: `route-${itinerary.id}`,
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: itinerary.coordinates,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": itinerary.color,
          "line-width": 4,
        },
      });
    });
  });
});
