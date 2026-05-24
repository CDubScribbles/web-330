/*
  Pragmatic JavaScript
  Week 9 — Guided AI-Orchestrated Build
  Programming Assignment

  Author: Clifford Smith
  Date:   5/24/26
  Filename: script.js
*/

"use strict";

// Array of national park objects — minimum of 3 items as required
// Each object contains name, state, established year, description, and a highlight
const parks = [
  {
    name: "Yellowstone",
    state: "Wyoming",
    established: 1872,
    description: "The world's first national park, home to more geysers and hot springs than anywhere else on Earth. Old Faithful erupts with stunning regularity against a backdrop of bison-dotted meadows and ancient forests.",
    highlight: "Over 500 active geysers"
  },
  {
    name: "Yosemite",
    state: "California",
    established: 1890,
    description: "A glacially carved valley of jaw-dropping proportions, where granite monoliths like El Capitan and Half Dome rise thousands of feet above the valley floor. Waterfalls, sequoias, and starlit skies complete the spectacle.",
    highlight: "Home of El Capitan & Half Dome"
  },
  {
    name: "Zion",
    state: "Utah",
    established: 1919,
    description: "A dramatic canyon of towering sandstone cliffs in shades of red, orange, and cream. The Virgin River carves through the Narrows while trails like Angels Landing offer vertigo-inducing views for those brave enough to climb.",
    highlight: "The Narrows & Angels Landing"
  },
  {
    name: "Acadia",
    state: "Maine",
    established: 1916,
    description: "Where the mountains meet the Atlantic. Acadia's rugged coastline, rocky beaches, and dense forests make it the crown jewel of the northeastern United States. Cadillac Mountain catches the first sunrise in the country each morning.",
    highlight: "First sunrise in the U.S."
  },
  {
    name: "Grand Canyon",
    state: "Arizona",
    established: 1919,
    description: "One of the seven natural wonders of the world, carved over millions of years by the Colorado River. Its layered bands of red rock reveal nearly two billion years of Earth's geological history in a single breathtaking view.",
    highlight: "277 miles long, 1 mile deep"
  }
];

// fetchPark returns a Promise that simulates an async data retrieval
// using setTimeout to mimic a network request delay.
// SAFEGUARD: No shared global variable is used. The resolved park
// object is passed directly through the Promise chain.
function fetchPark(name) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const park = parks.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (park) {
        resolve(park);
      } else {
        reject(`No park found for "${name}". Please check the name and try again.`);
      }
    }, 1000);
  });
}

// displayPark updates the DOM with the retrieved park data.
// SAFEGUARD: park is received as a direct parameter — never read
// from a shared variable — ensuring data integrity regardless of timing.
function displayPark(park) {
  const resultEl = document.getElementById("park-result");
  const errorEl = document.getElementById("error-message");

  errorEl.textContent = "";
  errorEl.classList.add("hidden");

  resultEl.innerHTML = `
    <div class="park-card revealed">
      <div class="park-header">
        <span class="park-year">Est. ${park.established}</span>
        <h2 class="park-name">${park.name}</h2>
        <p class="park-state">${park.state}</p>
      </div>
      <div class="park-body">
        <p class="park-description">${park.description}</p>
        <div class="park-highlight">
          <span class="highlight-label">Highlight</span>
          <span class="highlight-value">${park.highlight}</span>
        </div>
      </div>
    </div>`;

  resultEl.classList.remove("hidden");
}

// Form submit handler — async function using await to enforce correct
// execution order. fetchPark must complete before displayPark runs.
// SAFEGUARD: await enforces sequential execution.
// SAFEGUARD: try/catch handles both fulfilled and rejected states.
// SAFEGUARD: movie data is scoped locally to this function — no global variable.
document.getElementById("park-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("park-input").value.trim();
  const resultEl = document.getElementById("park-result");
  const errorEl = document.getElementById("error-message");
  const btn = document.querySelector("button[type='submit']");

  if (!name) return;

  // Reset state and show loading
  resultEl.classList.add("hidden");
  errorEl.classList.add("hidden");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Searching…";

  try {
    // await ensures fetchPark resolves before displayPark is called.
    // The park object is passed directly — no shared variable involved.
    const park = await fetchPark(name);
    displayPark(park);
  } catch (error) {
    errorEl.textContent = error;
    errorEl.classList.remove("hidden");
  } finally {
    btn.disabled = false;
    btn.querySelector(".btn-label").textContent = "Search";
  }
});