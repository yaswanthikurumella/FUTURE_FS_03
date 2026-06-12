document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! YASHV Café will contact you soon ☕");
});

let bookings = [];

/* LOAD BOOKINGS ON PAGE LOAD */
document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("bookings");
  bookings = saved ? JSON.parse(saved) : [];
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

  showToast(
    `✅ Thank you ${booking.name}! Your table is booked for ${booking.date} at ${booking.time}.`
  );

  this.reset();
});

/* SAVE */
function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

/* LOAD BOOKINGS BUTTON */
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
      <p>👥 ${b.people} people</p>
      <button onclick="deleteBooking(${b.id})">Delete</button>
    `;

    container.appendChild(card);
  });
}

/* DELETE */
function deleteBooking(id) {
  bookings = bookings.filter((b) => b.id !== id);
  saveBookings();
  loadBookings();
  showToast("Booking deleted successfully");
}

/* CLEAR ALL */
function clearBookings() {
  bookings = [];
  saveBookings();
  document.getElementById("bookingList").innerHTML = "";
  showToast("All bookings cleared");
}

/* SUCCESS MESSAGE */
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.innerText = message;

  setTimeout(() => {
    toast.innerText = "";
  }, 5000);
}
