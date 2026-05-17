/*
  Pragmatic JavaScript
  Chapter 4
  Programming Assignment

  Author: Clifford Smith
  Date:   5/17/26
  Filename: script.js
*/

"use strict";

// Array of movie objects — each contains title, director, releaseYear, and synopsis
const movies = [
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    synopsis: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son, setting off a chain of events that will test the bonds of family, loyalty, and power."
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    synopsis: "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. — but his own subconscious may be his greatest enemy."
  },
  {
    title: "Spirited Away",
    director: "Hayao Miyazaki",
    releaseYear: 2001,
    synopsis: "During her family's move to the suburbs, a sullen ten-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts — and only work will win her freedom."
  },
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    releaseYear: 2019,
    synopsis: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan, in a darkly comic thriller about the collision of two worlds."
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseYear: 1994,
    synopsis: "Over the course of several years, two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency in the harsh environment of Shawshank State Penitentiary."
  }
];

// fetchMovie returns a Promise that simulates a network request using setTimeout
// Resolves with the matching movie object, or rejects if the title is not found
function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = movies.find(
        (m) => m.title.toLowerCase() === title.toLowerCase()
      );
      if (movie) {
        resolve(movie);
      } else {
        reject(`No results found for "${title}". Please check the title and try again.`);
      }
    }, 1000);
  });
}

// displayMovie updates the DOM with the retrieved movie data
function displayMovie(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-director").textContent = `Directed by ${movie.director}`;
  document.getElementById("movie-year").textContent = movie.releaseYear;
  document.getElementById("movie-synopsis").textContent = movie.synopsis;

  const movieInfo = document.getElementById("movie-info");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  movieInfo.classList.remove("hidden");
  movieInfo.classList.add("revealed");
}

// Form submit event listener — async function uses await to enforce correct execution order
// fetchMovie must complete before displayMovie runs
// try/catch handles both fulfilled and rejected promise states
document.getElementById("movie-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title-input").value.trim();
  const movieInfo = document.getElementById("movie-info");
  const errorMessage = document.getElementById("error-message");
  const submitBtn = document.querySelector("button[type='submit']");

  if (!title) return;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text").textContent = "Searching…";
  movieInfo.classList.add("hidden");
  movieInfo.classList.remove("revealed");
  errorMessage.classList.add("hidden");

  try {
    // await ensures fetchMovie completes before displayMovie is called
    // movie data is passed directly — no shared variables
    const movie = await fetchMovie(title);
    displayMovie(movie);
  } catch (error) {
    movieInfo.classList.add("hidden");
    errorMessage.textContent = error;
    errorMessage.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text").textContent = "Search";
  }
});