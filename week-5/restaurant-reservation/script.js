/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Clifford Smith
  Date: 4/24/26
  Filename: script.js
  Author Comment: Thank you for the feedback on the previous assignment. I have tried to make sure that my indentation is consistent and that my code is well-organized. I'm always looking for pointers, though, so please give me more, if it's needed! Thanks again!
*/

"use strict";

// Create an in-memory object array for each table in the restaurant
let tables = [
  { tableNumber: 1,  capacity: 2,  isReserved: false },
  { tableNumber: 2,  capacity: 2,  isReserved: false },
  { tableNumber: 3,  capacity: 4,  isReserved: false },
  { tableNumber: 4,  capacity: 4,  isReserved: false },
  { tableNumber: 5,  capacity: 4,  isReserved: false },
  { tableNumber: 6,  capacity: 6,  isReserved: false },
  { tableNumber: 7,  capacity: 6,  isReserved: false },
  { tableNumber: 8,  capacity: 6,  isReserved: false },
  { tableNumber: 9,  capacity: 8,  isReserved: false },
  { tableNumber: 10, capacity: 8,  isReserved: false },
  { tableNumber: 11, capacity: 10, isReserved: false },
  { tableNumber: 12, capacity: 12, isReserved: false },
];

// Create a function reserveTable
function reserveTable(tableNumber, callback, time) {
  const table = tables.find((t) => t.tableNumber === tableNumber);

  if (!table) {
    callback(`Table ${tableNumber} does not exist.`, false);
    return;
  }

  if (table.isReserved) {
    callback(
      `We're sorry — Table ${tableNumber} has already been reserved for this evening.`,
      false
    );
    return;
  }

  // Mark as reserved immediately, then fire callback after delay
  table.isReserved = true;
  setTimeout(() => {
    callback(
      `Your reservation has been confirmed. We look forward to welcoming you to Table ${tableNumber}.`,
      true
    );
  }, time);
}

// When the form is submitted, call the reserveTable function
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const tableNumber = parseInt(document.getElementById("tableNumber").value);
    const messageEl = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");

    if (!name || !tableNumber) {
      showMessage("Please enter your name and select a table.", false);
      return;
    }

    // Show pending state
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").textContent = "Confirming...";
    messageEl.className = "message pending";
    messageEl.textContent = "Please wait while we confirm your reservation…";
    messageEl.classList.remove("hidden");

    reserveTable(
      tableNumber,
      function (msg, success) {
        const greeting = success ? `${name}, ` : "";
        showMessage(greeting + msg, success);
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Request Reservation";
      },
      2000
    );
  });

function showMessage(text, success) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = success
    ? "message success"
    : "message error";
  messageEl.classList.remove("hidden");
}