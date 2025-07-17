// Green Commute Planner – Public Preview
// -------------------------------------------
// Note: This file is a trimmed version. Full logic (including metro graph routing and full route APIs) is available in the private repo.


// ---------- MAP SETUP -------------------------

const map = L.map('map').setView([17.3850, 78.4867], 13); // Hyderabad

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Live location functionality
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();
    map.setView([lat, lng], 14);
  });
}

// Add geocoder
L.Control.geocoder({ defaultMarkGeocode: true }).addTo(map);

// ---------- CONSTANTS -------------------------

const emissionRates = {
  "4-wheeler": 120,
  "2-wheeler": 80,
  foot: 0,
  bike: 0,
  metro: 25
};

const calorieRates = {
  walking: 50,
  cycling: 30
};

// ---------- UTILITY FUNCTIONS ------------------

// Geocode a location string using Nominatim API
function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
      throw new Error("Location not found");
    });
}

// Haversine distance formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Placeholder for fetching routes 
function getOSRMRoute(profile, from, to) {
  // Full OSRM API integration available in private repo
  return Promise.resolve({
    distance: 5000, 
    duration: 900   
  });
}

// ---------- PARTIAL ROUTING FUNCTION -------------------

// Triggered when user clicks "Get Route"
function getRoute() {
  const fromAddr = document.getElementById('from').value;
  const toAddr = document.getElementById('to').value;

  if (!fromAddr || !toAddr) {
    alert("Please enter both From and To addresses.");
    return;
  }

  Promise.all([geocode(fromAddr), geocode(toAddr)]).then(([fromCoord, toCoord]) => {
    const modes = {
      Walking: "foot",
      Cycling: "bike",
      "2-Wheeler": "car",
      "4-Wheeler": "car"
    };

    let results = [];

    const promises = Object.entries(modes).map(([mode, profile]) =>
      getOSRMRoute(profile, fromCoord, toCoord).then(route => {
        const km = route.distance / 1000;
        const min = route.duration / 60;
        const emissions = emissionRates[mode.toLowerCase()] * km || 0;
        const calories = mode === "Walking" ? calorieRates.walking * km :
                         mode === "Cycling" ? calorieRates.cycling * km : 0;

        results.push({ mode, km, min, emissions, calories });
      })
    );

    Promise.all(promises).then(() => displayOptions(results));
  });
}

// ---------- SIMPLE UI DISPLAY -------------------

function displayOptions(options) {
  const panel = document.getElementById("options-panel");
  panel.style.display = "block";
  let html = `<table>
                <tr><th>Mode</th><th>Distance</th><th>Time</th><th>Emissions</th><th>Calories</th></tr>`;

  options.forEach(opt => {
    html += `<tr>
      <td>${opt.mode}</td>
      <td>${opt.km.toFixed(2)} km</td>
      <td>${opt.min.toFixed(1)} min</td>
      <td>${opt.emissions.toFixed(2)} g CO₂</td>
      <td>${opt.calories ? opt.calories.toFixed(0) + ' kcal' : '-'}</td>
    </tr>`;
  });

  html += `</table>`;
  panel.innerHTML = html;
}

// ---------- METRO & ADVANCED ROUTING ----------
// Full metro graph-building, path-finding, and station logic
// are included in the private version of this project.
// Contact author for access.
