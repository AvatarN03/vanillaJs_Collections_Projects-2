const monthInput = document.getElementById("month-name");
const day = document.getElementById("day-name");
const date = document.getElementById("day-number");
const yearInput = document.getElementById("year");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const todayBtn = document.getElementById("today-btn");
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");

let currentDate = new Date();

function updateCalendar(dateObj) {
  monthInput.value = dateObj.toLocaleDateString("en", {
    month: "long",
  });

  day.innerHTML = dateObj.toLocaleDateString("en", {
    weekday: "long",
  });

  date.innerHTML = dateObj.getDate();
  yearInput.value = dateObj.getFullYear();
}

function goToPreviousDay() {
  currentDate.setDate(currentDate.getDate() - 1);
  updateCalendar(currentDate);
}

function goToNextDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateCalendar(currentDate);
}

function goToPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar(currentDate);
}

function goToNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar(currentDate);
}

function goToToday() {
  currentDate = new Date();
  updateCalendar(currentDate);
}

// Handle year input on Enter key
yearInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const newYear = parseInt(this.value);

    if (!isNaN(newYear) && newYear > 0 && newYear < 10000) {
      currentDate.setFullYear(newYear);
      updateCalendar(currentDate);
      this.blur(); // Remove focus after update
    } else {
      // Reset if invalid
      this.value = currentDate.getFullYear();
      alert("Please enter a valid year between 1 and 9999");
    }
  }
});

// Handle month input on Enter key
monthInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const monthNames = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    
    const inputMonth = this.value.toLowerCase().trim();
    const monthIndex = monthNames.findIndex(m => m.startsWith(inputMonth));
    
    if (monthIndex !== -1) {
      currentDate.setMonth(monthIndex);
      updateCalendar(currentDate);
      this.blur(); // Remove focus after update
    } else {
      // Reset to current month if invalid
      updateCalendar(currentDate);
      alert("Please enter a valid month name");
    }
  }
});

// Event listeners for navigation buttons
prevBtn.addEventListener("click", goToPreviousDay);
nextBtn.addEventListener("click", goToNextDay);
todayBtn.addEventListener("click", goToToday);
prevMonthBtn.addEventListener("click", goToPreviousMonth);
nextMonthBtn.addEventListener("click", goToNextMonth);

// Initialize calendar with current date
updateCalendar(currentDate);