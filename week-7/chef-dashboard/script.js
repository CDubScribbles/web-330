/*
  Pragmatic JavaScript
  Chapter 3
  Programming Assignment

  Author: Clifford Smith
  Date: 5/10/26
  Filename: script.js
*/

"use strict";

// Array of chef objects — each contains name, specialty, weakness, and restaurantLocation
let chefs = [
  {
    name: 'Chef Marco "Il Vulcano" Rossi',
    specialty: "Wood-fired everything, including his temper",
    weakness: "Incapable of measuring — 'a pinch' means 'half the jar'",
    restaurantLocation: "Naples, Italy"
  },
  {
    name: 'Chef Yuki "The Surgeon" Tanaka',
    specialty: "Molecular gastronomy sushi (four hours per piece)",
    weakness: "Weeps openly when a guest requests soy sauce",
    restaurantLocation: "Kyoto, Japan"
  },
  {
    name: 'Chef Brigitte "La Tempête" Moreau',
    specialty: "Butter. Just butter. On absolutely everything.",
    weakness: "Physically cannot acknowledge that other cuisines exist",
    restaurantLocation: "Lyon, France"
  }
];

// Retrieves the first chef's information
// Returns a promise that resolves with the chef's data after a 2-second delay
// Math.random() simulates an occasional rejection
function retrieveChef1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(chefs[0]);
      } else {
        reject("Chef Marco is currently on fire. (Literally.)");
      }
    }, 2000);
  });
}

// Retrieves the second chef's information
// Returns a promise that resolves with the chef's data after a 3-second delay
// Math.random() simulates an occasional rejection
function retrieveChef2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(chefs[1]);
      } else {
        reject("Chef Yuki is mid-ceremony. Please do not disturb.");
      }
    }, 3000);
  });
}

// Retrieves the third chef's information
// Returns a promise that resolves with the chef's data after a 4-second delay
// Math.random() simulates an occasional rejection
function retrieveChef3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(chefs[2]);
      } else {
        reject("Chef Brigitte refuses to be retrieved. She retrieves YOU.");
      }
    }, 4000);
  });
}

// Promise.allSettled retrieves all three chefs before updating the webpage
// Both fulfilled and rejected states are handled independently per section
Promise.allSettled([
  retrieveChef1(),
  retrieveChef2(),
  retrieveChef3()
]).then(results => {
  const ids = ["chef1", "chef2", "chef3"];
  const numbers = ["01", "02", "03"];

  results.forEach((result, index) => {
    const el = document.getElementById(ids[index]);

    if (result.status === "fulfilled") {
      const chef = result.value;
      el.innerHTML = `
        <div class="chef-content">
          <div class="chef-number">${numbers[index]}</div>
          <h2 class="chef-name">${chef.name}</h2>
          <div class="card-divider"></div>
          <div class="chef-details">
            <div class="detail-row">
              <span class="detail-label">Specialty</span>
              <span class="detail-value">${chef.specialty}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Weakness</span>
              <span class="detail-value">${chef.weakness}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location</span>
              <span class="detail-value">${chef.restaurantLocation}</span>
            </div>
          </div>
        </div>`;
    } else {
      // If the promise is rejected, display an error message in the correct section
      el.innerHTML = `
        <div class="error-content">
          <div class="error-icon">✕</div>
          <p class="error-label">Chef Unavailable</p>
          <p class="error-message">${result.reason}</p>
        </div>`;
    }

    // Trigger reveal animation after content is injected
    setTimeout(() => el.classList.add("revealed"), 50);
  });
});
