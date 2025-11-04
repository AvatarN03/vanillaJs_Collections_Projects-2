const hour = document.querySelector(".arrows .hour");
const minute = document.querySelector(".arrows .minute");
const seconds = document.querySelector(".arrows .second");
const digitalTime = document.getElementById("digitalTime");
const dateDisplay = document.getElementById("date");

function updateClock() {
  const date = new Date();

  // Analog clock
  const hours = date.getHours() % 12;
  const mins = date.getMinutes();
  const secs = date.getSeconds();


  const hourX = (hours / 12) * 360;
  const minX = (mins / 60) * 360;
  const hourF = mins * 0.5; // Hour hand moves 0.5° per minute
  const secX = (secs / 60) * 360;
  
  hour.style.transform = `rotate(${hourX + hourF}deg)`;
  minute.style.transform = `rotate(${minX}deg)`;
  seconds.style.transform = `rotate(${secX}deg)`;

  // Digital time
  const hours24 = date.getHours().toString().padStart(2, "0");
  const minsStr = mins.toString().padStart(2, "0");
  const secsStr = secs.toString().padStart(2, "0");
  digitalTime.textContent = `${hours24}:${minsStr}:${secsStr}`;

  // Date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  dateDisplay.textContent = date.toLocaleDateString("en-US", options);
}

// Update immediately and then every second
updateClock();
setInterval(updateClock, 1000);
