    function updateClock() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').textContent = timeString;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Call once immediately