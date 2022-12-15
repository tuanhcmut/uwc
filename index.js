function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: mcps.get("123").getLatLng(),
    mapId: "bb3e795f67bddebf",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  const tourStops = getContentMCPs();
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  tourStops.forEach(({mcpId, percentage, position, title }, i) => {
    const pinView = new google.maps.marker.PinView({
      glyph: `${i + 100}`,  background: (percentage < 30)?"green":(percentage<50)?"#FBBC04":"red", borderColor: "#137333",  glyphColor: "white"
    });
    const marker = new google.maps.marker.AdvancedMarkerView({
      position,
      map,
      title: `${i + 200}. ${title}<br> <button class = 'navigate' onclick = "selectMCP('${mcpId}')">Select</button>`,
      content: pinView.element,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

window.initMap = initMap;