const fetchBtn = document.getElementById('fetchBtn');
const dateInput = document.getElementById('date');
const eventsList = document.getElementById('eventsList');

fetchBtn.addEventListener('click', () => {
  const dateValue = dateInput.value;
  if (!dateValue) {
    alert('Please select a date!');
    return;
  }

  const [year, month, day] = dateValue.split('-');
  eventsList.innerHTML = '<li>Loading events...</li>';
  fetch(`https://history.muffinlabs.com/date/${parseInt(month)}/${parseInt(day)}`)
    .then(res => res.json())
    .then(data => {
    const events = data.data.Events;
    if (events.length === 0) {
    eventsList.innerHTML = '<li>No historical events found for this date.</li>';
    return;
      }
      const selectedEvents = events.sort(() => 0.5 - Math.random()).slice(0, 5);
      eventsList.innerHTML = '';
      selectedEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.year}: ${event.text}`;
        eventsList.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      eventsList.innerHTML = '<li>Error fetching events. Try again later.</li>';
    });
});
