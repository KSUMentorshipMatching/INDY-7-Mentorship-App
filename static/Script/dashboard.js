const swipeContainer = document.getElementById('swipe-container');
const leftSwipeBtn = document.getElementById('left-swipe');
const rightSwipeBtn = document.getElementById('right-swipe');

// Example list of mentor/mentee profiles
const profiles = [
  {
    name: "Mentor 1",
    img: "static/images/mentor1.jpg",
    bio: "Experienced developer",
  },
  {
    name: "Mentee 1",
    img: "static/images/mentee1.jpg",
    bio: "Learning Python",
  },
  {
    name: "Mentee 2",
    img: "static/images/person1.jpg",
    bio: "Learning Python",
  },
  {
    name: "Mentee 3",
    img: "static/images/person2.jpg",
    bio: "Learning Python",
  },
  // Add more profiles as needed
];

// Load the first profile
let currentIndex = 0;
loadProfile(currentIndex);

function loadProfile(index) {
  const profile = profiles[index];
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${profile.img}" alt="${profile.name}">
    <div class="card-content">
      <h2 class="name">${profile.name}</h2>
      <p class="bio">${profile.bio}</p>
    </div>
  `;
  swipeContainer.innerHTML = '';
  swipeContainer.appendChild(card);
}

function attachSwipeListeners() {
  // Swipe left functionality
  leftSwipeBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % profiles.length; // Swipe left, load next profile
    loadProfile(currentIndex);
  });

  // Swipe right functionality
  rightSwipeBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % profiles.length; // Swipe right, load next profile
    loadProfile(currentIndex);
  });
}

// User card functionality
document.addEventListener("DOMContentLoaded", () => {
  const userCards = document.querySelectorAll(".user-card");
  const cardContainer = document.querySelector(".center-container");

  // Store the original content of the card container for reverting
  const originalContent = cardContainer.innerHTML;

  // Function to attach user card click event listeners
  function attachUserCardListeners() {
    const userCards = document.querySelectorAll(".user-card"); // Re-query the user cards

    userCards.forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.getAttribute("data-name");
        const email = card.getAttribute("data-email");
        const phone = card.getAttribute("data-phone");
        const role = card.getAttribute("data-role");

        cardContainer.innerHTML = `
          <div class="center-card">          
            <div class="user-image">
              <img class="user-icon" src="${card.querySelector("img").src}">
            </div>
            <div class="center-info">
              <p>${name}</p>
              <p>${email}</p>
              <p>${phone}</p>
              <p>${role}</p>
            </div>

            <div class="revert-div">
              <box-icon class="revertButton" id="revertButton" name='x'></box-icon>
            </div>
          </div>          
        `;

        // Reattach revert button click event
        document.getElementById("revertButton").addEventListener("click", () => {
          cardContainer.innerHTML = originalContent; // Restore original content
          attachUserCardListeners(); // Reattach event listeners
          loadProfile(currentIndex); // Load current profile after revert
          attachSwipeListeners(); // Reattach swipe event listeners
        });
      });
    });
  }

  attachUserCardListeners(); // Initial attachment of event listeners
  attachSwipeListeners(); // Attach swipe functionality initially
});
