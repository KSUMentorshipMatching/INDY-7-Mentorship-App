const swipeContainer = document.getElementById('swipe-container');
const leftSwipeBtn = document.getElementById('left-swipe');
const rightSwipeBtn = document.getElementById('right-swipe');

// Example list of mentor/mentee profiles
const profiles = [
  { name: "Mentor 1", img: "mentor1.jpg", bio: "Experienced developer" },
  { name: "Mentee 1", img: "mentee1.jpg", bio: "Learning Python" },
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
      <h2>${profile.name}</h2>
      <p>${profile.bio}</p>
    </div>
  `;
  swipeContainer.innerHTML = '';
  swipeContainer.appendChild(card);
}

leftSwipeBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % profiles.length;
  loadProfile(currentIndex);  // Swipe left, load next profile
});

rightSwipeBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % profiles.length;
  loadProfile(currentIndex);  // Swipe right, load next profile
});

function validatePassword() {
  var password = document.getElementById("password");
  var confirm_password = document.getElementById("confirm_password");

  if (password.value !== confirm_password.value) {
    //alert("Passwords don't match!");  // Visual feedback
    confirm_password.setCustomValidity("Passwords Don't Match");
    return false;  // Prevent form submission
  } else {
    confirm_password.setCustomValidity('');  // Reset error message
    return true;  // Allow form submission
  }
}