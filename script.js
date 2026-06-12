document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! YASHV Café will contact you soon ☕");
});let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

let bookings = [];

/* SAFE INIT (GitHub Pages Friendly) */
document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("bookings");
  bookings = saved ? JSON.parse(saved) : [];
  console.log("Bookings loaded:", bookings);
});

/* BOOKING FORM */
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const booking = {
    id: Date.now(),
    name: document.getElementById("bname").value,
    phone: document.getElementById("bphone").value,
    date: document.getElementById("bdate").value,
    time: document.getElementById("btime").value,
    people: document.getElementById("bpeople").value
  };

  bookings.push(booking);
  saveBookings();

  showToast(`Booking confirmed for ${booking.name}`);

  this.reset();
});

/* SAVE FUNCTION (IMPORTANT) */
function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

/* LOAD BOOKINGS */
function loadBookings() {
  const container = document.getElementById("bookingList");
  container.innerHTML = "";

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookings.forEach((b) => {
    const card = document.createElement("div");
    card.className = "booking-card";

    card.innerHTML = `
      <h4>${b.name}</h4>
      <p>📞 ${b.phone}</p>
      <p>📅 ${b.date}</p>
      <p>⏰ ${b.time}</p>
      <p👥 ${b.people} people</p>
      <button onclick="deleteBooking(${b.id})">Delete</button>
    `;

    container.appendChild(card);
  });
}

/* DELETE SINGLE BOOKING */
function deleteBooking(id) {
  bookings = bookings.filter(b => b.id !== id);
  saveBookings();
  loadBookings();
  showToast("Booking deleted");
}

/* CLEAR ALL */
function clearBookings() {
  bookings = [];
  saveBookings();
  document.getElementById("bookingList").innerHTML = "";
  showToast("All bookings cleared");
}

/* TOAST MESSAGE */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;

  setTimeout(() => {
    toast.innerText = "";
  }, 3000);
}
// SUCCESS MESSAGE
function showBookingMessage(name, date, time) {
  document.getElementById("bookingMsg").innerText =
    `✅ Thank you ${name}! Your table is booked for ${date} at ${time}.`;
}function displayBookings() {
  const container = document.getElementById("bookingList");
  container.innerHTML = "";

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach((b, index) => {
    const card = document.createElement("div");
    card.className = "booking-card";

    card.innerHTML = `
      <h4>Booking #${index + 1}</h4>
      <p><b>Name:</b> ${b.name}</p>
      <p><b>Phone:</b> ${b.phone}</p>
      <p><b>Date:</b> ${b.date}</p>
      <p><b>Time:</b> ${b.time}</p>
      <p><b>People:</b> ${b.people}</p>
    `;

    container.appendChild(card);
  });
}