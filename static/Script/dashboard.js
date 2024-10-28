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
  const swipeContainer = document.getElementById('swipe-container');
  const leftSwipeBtn = document.getElementById('left-swipe');
  const rightSwipeBtn = document.getElementById('right-swipe');
  const cardContainer = document.querySelector(".center-container");
  const userCardContainer = document.createElement('div'); // Temporary container for user card view

  // Add userCardContainer to the DOM but hide it initially
  userCardContainer.classList.add("user-card-view");
  cardContainer.appendChild(userCardContainer);
  userCardContainer.style.display = 'none';

  let currentIndex = 0;

  // Load the profile for the swipe view
  function loadProfile(index) {
    const profile = profiles[index];
    swipeContainer.innerHTML = `
      <div class="card">
        <img src="${profile.img}" alt="${profile.name}">
        <div class="card-content">
          <h2 class="name">${profile.name}</h2>
          <p class="bio">${profile.bio}</p>
        </div>
      </div>
    `;
  }

  function attachSwipeListeners() {
    leftSwipeBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % profiles.length; // Swipe left
      loadProfile(currentIndex);
    });

    rightSwipeBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % profiles.length; // Swipe right
      loadProfile(currentIndex);
    });
  }

  function attachUserCardListeners() {
    const userCards = document.querySelectorAll(".user-card");

    userCards.forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.getAttribute("data-name");
        const email = card.getAttribute("data-email");
        const phone = card.getAttribute("data-phone");
        const role = card.getAttribute("data-role");

        // Hide swipe container and show user card details
        swipeContainer.style.display = 'none';
        leftSwipeBtn.style.display = 'none';
        rightSwipeBtn.style.display = 'none';
        userCardContainer.style.display = 'block';

        // Populate the user card container with details
        userCardContainer.innerHTML = `
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

        // Add listener to revert button to switch back to swipe view
        document.getElementById("revertButton").addEventListener("click", () => {
          swipeContainer.style.display = 'block';
          leftSwipeBtn.style.display = 'block';
          rightSwipeBtn.style.display = 'block';
          userCardContainer.style.display = 'none';
          loadProfile(currentIndex); // Reload current profile
          attachSwipeListeners(); // Reattach swipe event listeners if needed
        });
      });
    });
  }

  loadProfile(currentIndex); // Load initial profile
  attachUserCardListeners(); // Attach user card click listeners
  attachSwipeListeners(); // Attach swipe button listeners
});
