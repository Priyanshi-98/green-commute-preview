# green-commute-preview
A green commute planner web application — public showcase version

GREEN MAPS
Smart, sustainable routes for a greener commute!

## Overview
A smart, eco-friendly route planner that helps users choose the most sustainable way to travel in Hyderabad.  
This web app calculates distance, time, CO₂ emissions, and calories burned for multiple travel modes — including walking, cycling, metro, and personal vehicles.

> ⚠️ This is a **public preview**. Sensitive backend code and full database logic are excluded for privacy and security.
> Full version available upon request. Feel free to reach out!

---

## 🚀 Features

- 🗺️ Interactive map with Leaflet.js and OpenStreetMap
- 📍 Geolocation-based origin detection
- 🔎 Search box with geocoding support
- 🚌 Metro-aware routing, including transfer stations (available in private version)
- 🚲 Emission and calorie stats for:
  - Walking
  - Cycling
  - 2-Wheeler
  - 4-Wheeler
  - Metro
- 📊 Clean results panel showing travel options and simple UI
- 📁 Lightweight Express.js server setup

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Map Libraries:** Leaflet.js, Leaflet Routing Machine
- **Geocoding:** Nominatim, Leaflet-Control-Geocoder
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Routing API:** OSRM (Open Source Routing Machine)
- **Data:** Hyderabad Metro JSON dataset

--- 

## 🧭 How It Works
Green Maps helps users plan sustainable travel routes by combining live map data, metro connectivity, and custom environmental calculations.

🔐 1. User Authentication
- Users sign up or log in through a secure form (auth.html)
- Credentials are verified against a MySQL database via an Express.js backend (server.js)
- Successful login redirects users to the interactive map page

🗺️ 2. Interactive Map Interface
- The map loads on mainpage.html using Leaflet.js and OpenStreetMap
- User's current location is auto-detected via the Geolocation API
- Two geocoder search inputs let users select:
  Start location
  Destination

📍 3. Route Planning (OSRM API)
- When both points are selected, the user clicks "Calculate Route"
- The app fetches optimal walking/driving directions using the OSRM API
- Route is rendered on the map with distance and travel time

🚇 4. Metro Integration
- Hyderabad metro stops are loaded from a custom-built JSON dataset
- If start/end points are near metro stations:
  Metro route overlays are suggested
  Station names and connections are shown to the user

🌱 5. Environmental Stats & Feedback
- The route panel displays:
  CO₂ emissions saved or generated (based on selected mode)
  Calories burned for walking/cycling routes
  Distance, duration, and travel mode

☁️ 6. Backend & Database (MySQL)
- User data is managed through a secure Node.js + Express.js backend
- MySQL is used to store and validate login/signup credentials

---

## 📷 Screenshots

<img width="940" height="561" alt="image" src="https://github.com/user-attachments/assets/acfc93f1-01c1-4991-897a-67df550073a8" />
<img width="989" height="591" alt="image" src="https://github.com/user-attachments/assets/c4ecb25c-a5c5-4c39-acba-0237c04cd7eb" />
<img width="988" height="589" alt="image" src="https://github.com/user-attachments/assets/b2036ee2-f7ee-45a5-9875-e5cdc859d68c" />
<img width="992" height="591" alt="image" src="https://github.com/user-attachments/assets/a793e569-d5c8-408c-b8ae-664da3d38176" />
<img width="989" height="591" alt="image" src="https://github.com/user-attachments/assets/30bf4806-020f-4ad4-b08e-77a1cd554456" />

---

## 📁 Project Structure

```bash
green-commute-planner/
├── mainpage.html            # Main HTML page with map & UI
├── mainpage.css             # Styles for map and control panels
├── mainpage.js              # JS for map, routing, and logic
├── /data
│   └── hyderabad_metro.json # Metro station dataset
├── /backend                 # Optional backend folder
│   └── server.js
├── .env                     # Environment variables (DB credentials etc.)
└── README.md                # This file

---

## 🧾 Dataset Overview
<details> <summary><strong>📊 Click to view metro dataset preview</strong></summary>
| Field                    | Description                            |
| ------------------------ | -------------------------------------- |
| `Station Name`           | Name of the metro station              |
| `Line`                   | Metro line (Red, Blue, or Green)       |
| `Latitude` / `Longitude` | GPS coordinates of the station         |
| `Next Station`           | Name of the next station on the line   |
| `Distance to Next (km)`  | Distance in kilometers to next station |
| `Time to Next (min)`     | Estimated travel time in minutes       |
| `Connections`            | Line interchanges (e.g., "Red / Blue") |
| `Emission per km (gCO2)` | Carbon emission per kilometer          |

Sample Entries
[
  {
    "Station Name": "Miyapur",
    "Line": "Red Line",
    "Latitude": 17.49656,
    "Longitude": 78.37293,
    "Next Station": "J.N.T.U College",
    "Distance to Next (km)": 1.8,
    "Time to Next (min)": 3,
    "Connections": "None",
    "Emission per km (gCO2)": 0
  },
  {
    "Station Name": "Ameerpet",
    "Line": "Red Line",
    "Latitude": 17.434803,
    "Longitude": 78.448011,
    "Next Station": "Punjagutta",
    "Distance to Next (km)": 1.3,
    "Time to Next (min)": 3,
    "Connections": "Red / Blue",
    "Emission per km (gCO2)": 0
  }
]

</details>

---

## 🧑‍💻 **Author**
github.com/Priyanshi-98
github.com/Sriya-09

---
## 📄 **License**
This preview is open for viewing and feedback.
The full version is available upon request and is not publicly licensed for reuse.
