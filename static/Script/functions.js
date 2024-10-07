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
      <h2 class = "name">${profile.name}</h2>
      <p = class = "bio">${profile.bio}</p>
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

function validateEmail() {
  var email = document.getElementById("email");
  var confirm_email = document.getElementById("confirm_email");

  if (email.value !== email_password.value) {
    alert("Emails don't match!");  // Visual feedback
    confirm_email.setCustomValidity("Email Don't Match");
    return false;  // Prevent form submission
  } else {
    confirm_email.setCustomValidity('');  // Reset error message
    return true;  // Allow form submission
  }
}

function validatePasswordReq(){
  var password = document.getElementById("password");
  var confirm_password = document.getElementById("confirm_password");

  // Regular expressions for validation
  var uppercaseRegex = /[A-Z]/; // At least one uppercase letter
  var specialCharRegex = /[\W]/; // At least one special character (non-alphanumeric)

  // Check if the password is at least 8 characters long
  if (password.value.length < 8) {
    password.setCustomValidity("Password must be at least 8 characters long.");
    return false; // Prevent form submission and allow another attempt
  }

  // Check for at least one uppercase letter
  if (!uppercaseRegex.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one uppercase letter."
    );
    return false; // Prevent form submission and allow another attempt
  }

  // Check for at least one special character
  if (!specialCharRegex.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one special character."
    );
    return false; // Prevent form submission and allow another attempt
  }

  if (password.value.length > 8 && uppercaseRegex.test(password.value) && specialCharRegex.test(password.value)){
    password.setCustomValidity("")
    return true;
  }
}

function validatePassword() {
  

  if (password.value !== confirm_password.value) {
    //alert("Passwords don't match!");  // Visual feedback
    confirm_password.setCustomValidity("Passwords Don't Match");
    return false;  // Prevent form submission
  } else {
    confirm_password.setCustomValidity('');  // Reset error message
    return true;  // Allow form submission
  }
}

// Add input event listeners to reset validation when user types
document.getElementById("password").addEventListener('input', function() {
  document.getElementById("confirm_password").setCustomValidity('');
});

document.getElementById("confirm_password").addEventListener('input', function() {
  confirm_password.setCustomValidity('');  // Reset custom validity on typing
})


