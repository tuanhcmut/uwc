let map;
let infoWindow;
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: { lat: 10.871661740610213, lng: 106.77844569058713 },
      mapId: "bb3e795f67bddebf",
    });
    const triangleCoords = [
        { lat: 10.870752985423223, lng: 106.77595928292455 },
        { lat:10.872291282435492, lng: 106.77692487813333 },
        { lat: 10.871661740610213, lng: 106.77844569058713 },
        { lat: 10.869844227468276, lng: 106.77801117274319 }
      ];
      // Construct the polygon.
      const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
    
      bermudaTriangle.setMap(map);
      // Add a listener for the click event.
      bermudaTriangle.addListener("click", showArrays);
      infoWindow = new google.maps.InfoWindow();
    }
    
    function showArrays(event) {
      // Since this polygon has only one path, we can call getPath() to return the
      // MVCArray of LatLngs.
      // @ts-ignore
      const polygon = this;
      const vertices = polygon.getPath();
      let contentString =
        "<b>Bermuda Triangle polygon</b><br>" +
        "Clicked location: <br>" +
        event.latLng.lat() +
        "," +
        event.latLng.lng() +
        "<br>";
    
      // Iterate over the vertices.
      for (let i = 0; i < vertices.getLength(); i++) {
        const xy = vertices.getAt(i);
    
        contentString +=
          "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
      }
    
      // Replace the info window's content and position.
      infoWindow.setContent(contentString);
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    }
    
  
  window.initMap = initMap;