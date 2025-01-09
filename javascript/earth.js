var planet = planetaryjs.planet();

// You can remove this statement if `world-110m.json`
// is in the same path as the HTML page:
planet.loadPlugin(planetaryjs.plugins.earth({
  topojson: { file: 'https://raw.githubusercontent.com/BinaryMuse/planetary.js/v1.1.2/dist/world-110m.json' },
  /* Let's add some color to the globe */
  oceans:   { fill:   '#000080' },
  land:     { fill:   '#339966' },
  borders:  { stroke: '#008000' }
}));

// Load our custom autorotate plugin
planet.loadPlugin(autorotate(10));

// Load the `pings` plugin to draw animated pings on the globe
planet.loadPlugin(planetaryjs.plugins.pings({
  color: '#ffffff', ttl: 1000, angle: 10
}));

planet.loadPlugin(planetaryjs.plugins.drag({
  // Dragging the globe should pause the
  // automatic rotation until we release the mouse.
  onDragStart: function() {
    this.plugins.autorotate.pause();
  },
  onDragEnd: function() {
    this.plugins.autorotate.resume();
  }
}));
// The `pings` plugin draws animated pings on the globe.
planet.loadPlugin(planetaryjs.plugins.pings());
// The `zoom` and `drag` plugins enable


// Make the planet fit well in its canvas
planet.projection.scale(250).translate([250, 250]);
var colors = ['yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
setInterval(function() {
  var lat = Math.random() * 170 - 85;
  var lng = Math.random() * 360 - 180;
  var color = colors[Math.floor(Math.random() * colors.length)];
  planet.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
}, 150);

var canvas = document.getElementById('globe');

planet.draw(canvas);

// Get location when clicking the button
var locationButton = window.document.getElementById('see-my-location-button');
locationButton.addEventListener('click', function() {
  // Disable button while we get the location
  locationButton.setAttribute('disabled', 'true');
  // Change button label
  locationButton.innerText = 'Getting location...';
  navigator.geolocation.getCurrentPosition(function(position) {
    // Success callback
    showLocation(position);
    locationButton.classList.add('hidden');
  }, geoError);
});

// Helper function to add one ping on the globe
function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // Add a ping on the globe every second
  setInterval(function() {
    planet.plugins.pings.add(longitude, latitude,{ color: "red", ttl: 3000, angle: 10 });
  }, 800);
}

// Geolocation API error callback
function geoError(posError) {
  locationButton.classList.add('error');
  locationButton.innerText = posError.message;
}

// This plugin will automatically rotate the globe around its vertical
// axis a configured number of degrees every second.
function autorotate(degPerSec) {
  // Planetary.js plugins are functions that take a `planet` instance
  // as an argument...
  return function(planet) {
    var lastTick = null;
    var paused = false;
    planet.plugins.autorotate = {
      pause:  function() { paused = true;  },
      resume: function() { paused = false; }
    };
    // ...and configure hooks into certain pieces of its lifecycle.
    planet.onDraw(function() {
      if (paused || !lastTick) {
        lastTick = new Date();
      } else {
        var now = new Date();
        var delta = now - lastTick;
        // This plugin uses the built-in projection (provided by D3)
        // to rotate the globe each time we draw it.
        var rotation = planet.projection.rotate();
        rotation[0] += degPerSec * delta / 1000;
        if (rotation[0] >= 180) rotation[0] -= 360;
        planet.projection.rotate(rotation);
        lastTick = now;
      }
    });
  };
};
