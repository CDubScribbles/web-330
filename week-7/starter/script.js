/*
  Web 330
  Chapter 3 - Promises
  Week 7 - Controlled Failure with AI Promises

  Author: Clifford Smith
  Date: 5/10/26

  Filename: script.js
*/
"use strict";

const chefs = [
  { name: "Chef A", specialty: "Italian cuisine", location: "New York" },
  { name: "Chef B", specialty: "French cuisine", location: "Paris" },
  { name: "Chef C", specialty: "Japanese cuisine", location: "Tokyo" }
];

function retrieveChef(index, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(chefs[index]), delay);
  });
}

// ISSUE: currentChef is a shared variable accessible by all three
// concurrent async functions. Any of the three can overwrite it
// at any time, making it an unreliable source of truth.
let currentChef;

async function displayChef(index) {
  // ISSUE: Each call receives a random delay between 400-700ms.
  // Because the ranges overlap, resolution order is unpredictable
  // on every page load. There is no guarantee Chef 0 resolves first.
  const delay = Math.floor(Math.random() * 300) + 400;

  // ISSUE: currentChef is overwritten here by whichever chef resolves
  // at this moment. If two chefs resolve close together, the second
  // one immediately stomps the first before the DOM is updated.
  currentChef = await retrieveChef(index, delay);

  // ISSUE: This 50ms pause creates a window of vulnerability.
  // While this function is waiting, another concurrent displayChef
  // call can resolve and overwrite currentChef. When this function
  // resumes, it reads the wrong chef's data and writes it to the
  // wrong DOM element — with no error, no warning, no indication
  // that anything has gone wrong.
  await new Promise(resolve => setTimeout(resolve, 50));

  const el = document.getElementById(`chef${index + 1}`);

  // ISSUE: By the time we reach this line, currentChef may no longer
  // belong to this chef. The DOM element for Chef A might display
  // Chef B or Chef C's data depending on who won the race.
  el.innerHTML = `<h2>${currentChef.name}</h2>
                  <p>Specialty: ${currentChef.specialty}</p>
                  <p>Location: ${currentChef.location}</p>`;
}

// ISSUE: All three displayChef calls are fired concurrently without
// awaiting each other. This means all three are racing to write to
// the same shared variable simultaneously.
async function loadChefs() {
  displayChef(0);
  displayChef(1);
  displayChef(2);
}

loadChefs();

/*
  Reflection:

  The AI refactor successfully converted the syntax from Promise.allSettled
  to async/await, preserved the original HTML element IDs, and produced code
  that is clean, readable, and free of syntax errors. On the surface, the
  refactored version looks like a reasonable and even improved implementation.
  However, the AI fundamentally misunderstood the relationship between
  concurrency and shared state, which is the most critical aspect of this
  program's behavior.

  The original code used Promise.allSettled to isolate each chef's data within
  its own result object, meaning no chef's information could interfere with
  another's. The refactored version replaced that isolation with a single shared
  variable, currentChef, that all three concurrent async functions read from and
  write to freely. As Krasso notes in Chapter 3, the power of promises lies in
  their ability to control the execution order of asynchronous operations — the
  refactor discards that control entirely.

  The evidence of failure is visible and repeatable. On each page refresh, the
  three chef panels display inconsistent or incorrect data — Chef A's slot shows
  Chef B, Chef B's slot shows Chef C, or multiple panels show the same chef.
  Because the delays are randomized, the wrong combination changes on every load.
  No error appears in the console. The program runs to completion and gives no
  indication that anything has gone wrong.

  This type of failure is particularly dangerous in real applications precisely
  because it is invisible at the code level. A developer reviewing the refactored
  script would likely approve it — it is syntactically valid, logically structured,
  and passes a casual reading. In a production environment handling real user data,
  this pattern could cause a customer's account information to display another
  customer's data, financial records to be attributed to the wrong user, or medical
  information to appear in the wrong patient's record. The code does not fail.
  It deceives.
*/