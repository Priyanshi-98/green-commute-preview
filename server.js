// Green Commute Planner – Backend (Public Version)
// -----------------------------

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Parse form data 
app.use(express.urlencoded({ extended: false }));

// ---------- Demo Routes (Safe to Share) -----------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/auth.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth.html'));
});

app.get('/mainpage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'mainpage.html'));
});

// ---------- Auth & DB Logic Hidden -------------------
// Signup, login, and MySQL database logic are implemented in the full version of the app (private repository).
// Contact the author for access.

// ---------- Demo Route ------------------
app.get('/status', (req, res) => {
  res.send("✅ Server is running (Public Preview)");
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
