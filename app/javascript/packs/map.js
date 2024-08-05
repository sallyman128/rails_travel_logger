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

  const fetchFlights = async () => {
    try {
      const response = await fetch("/flights.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      return [];
    }
  };

  map.on("load", async () => {
    const flights = await fetchFlights();
    flights.forEach(async (flight) => {
      const coordinates = [
        [flight.departure_longitude, flight.departure_latitude],
        [flight.arrival_longitude, flight.arrival_latitude]
      ]
      
      // Add click event listener
      map.on("click", `route-${flight.id}`, (e) => {
        window.location.href = `/itineraries/${flight.itinerary_id}`;
      });

      // Change the cursor to a pointer when the mouse is over the itinerary line
      map.on("mouseenter", `route-${flight.id}`, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to default when it leaves
      map.on("mouseleave", `route-${flight.id}`, () => {
        map.getCanvas().style.cursor = "";
      });

      map.addLayer({
        id: `route-${flight.id}`,
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": flight.color,
          "line-width": 4,
        },
      });
    });
  });
});
