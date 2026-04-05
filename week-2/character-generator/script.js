/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Clifford Smith
  Date: 4/3/26
  Filename: script.js
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  return {
    getName: function () {
      return name;
    },
    getGender: function () {
      return gender;
    },
    getClass: function () {
      return characterClass;
    },
  };
}

document.getElementById("generateHero").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("heroName").value;
  const gender = document.getElementById("heroGender").value;
  const formattedGender = gender[0].toUpperCase() + gender.slice(1);
  const characterClass = document.getElementById("heroClass").value;
  const formattedClass = characterClass[0].toUpperCase() + characterClass.slice(1);

  const character = createCharacter(name, formattedGender, formattedClass);

  const classIcons = {
    Warrior: "⚔️",
    Mage: "🔮",
    Rogue: "🗡️",
  };

  const output = document.getElementById("characterOutput");
  output.innerHTML = `
    <div class="character-card">
      <div class="card-header">
        <span class="class-icon">${classIcons[character.getClass()]}</span>
        <h2 class="character-name">${character.getName()}</h2>
        <span class="card-divider">✦ ✦ ✦</span>
      </div>
      <div class="card-body">
        <div class="stat-row">
          <span class="stat-label">Gender</span>
          <span class="stat-value">${character.getGender()}</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Class</span>
          <span class="stat-value">${character.getClass()}</span>
        </div>
      </div>
      <div class="card-footer">
        <p class="card-motto">Your legend begins now.</p>
      </div>
    </div>
  `;
});