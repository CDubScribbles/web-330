/*
  Assignment 8.2
  Web 330: Week 8

  Author: Clifford Smith
  Date:   5/17/26
  Filename: script.js
*/

"use strict";

const movies = [
  { title: "Inception", director: "Christopher Nolan", year: 2010, synopsis: "A thief enters dreams." },
  { title: "The Matrix", director: "The Wachowskis", year: 1999, synopsis: "Reality is not what it seems." },
  { title: "Interstellar", director: "Christopher Nolan", year: 2014, synopsis: "A journey beyond Earth." }
];

// REMOVED: let currentMovie = null;
// Shared variable removed — movie data is now passed directly as a parameter

function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
      movie ? resolve(movie) : reject("Movie not found");
    }, 800);
  });
}

document.getElementById("movie-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title-input").value;

  // FIXED: await enforces that fetchMovie completes before displayMovie runs
  // Movie data is passed directly — no shared variable involved
  try {
    const movie = await fetchMovie(title);
    displayMovie(movie);
  } catch (err) {
    showError(err);
  }
});

function displayMovie(movie) {
  if (!movie) return;

  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-director").textContent = "Director: " + movie.director;
  document.getElementById("movie-year").textContent = "Year: " + movie.year;
  document.getElementById("movie-synopsis").textContent = movie.synopsis;
  document.getElementById("movie-info").style.display = "block";
}

function showError(message) {
  document.getElementById("error-message").textContent = message;
}
