const skills = [
  "Programming",
  "Data Structures",
  "Algorithms",
  "Database Management",
  "Software Development",
  "Version Control",
  "Operating Systems",
  "Networking",
  "Cybersecurity",
  "Cloud Computing",
  "Ruby",
  "JavaScript",
  "C++",
  "Java",
  "Python",
  "Artificial Intelligence",
  "Mobile App Development",
  "Object-Oriented Programming",
  "Web Development",
];

const preferences = [
  "Experience Level",
  "Higher Expertise",
  "Communication Style",
  "Frequent Availability",
  "Flexible Scheduling",
  "Goal Alignment",
  "Career Growth Focus",
  "Industry Specific Experience",
  "Hands-On Learning",
  "Theoretical Learning",
  "Constructive Feedback",
  "Positive Reinforcement",
  "Shared Values",
  "Cultural Alignment",
  "Technical Skill Development",
  "Soft Skill Growth",
  "Short-Term Project",
  "Long-Term Mentorship",
];

function saveButtonState(buttonId, color) {
  localStorage.setItem(buttonId, color);
}

function getSavedButtonState(buttonId) {
  return localStorage.getItem(buttonId);
}

const preferencesList = document.getElementById("preferences-list");

preferences.forEach((preference) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <li>
          <span class="chip">
              <span class="chip__label" id="${preference
                .toLowerCase()
                .replace(/\s+/g, "-")}">${preference}</span>
              <button class="chip__btn">
                  <svg class="cd-icon" viewBox="0 0 12 12" data-id="${preference}">
                      <title>Delete attribute</title>
                  </svg>
              </button>
          </span>
      </li>
    `;
  preferencesList.appendChild(listItem);
});

const skillsList = document.getElementById("skills-list");

skills.forEach((skill) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <li>
          <span class="chip">
              <span class="chip__label" id="${skill
                .toLowerCase()
                .replace(/\s+/g, "-")}">${skill}</span>
              <button class="chip__btn">
                  <svg class="cd-icon" viewBox="0 0 12 12" data-id="${skill}">
                      <title>Delete attribute</title>
                  </svg>
              </button>
          </span>
      </li>
    `;
  skillsList.appendChild(listItem);
});

const cdIcons = document.querySelectorAll(".cd-icon");

cdIcons.forEach((cdIcon) => {
  const buttonId = cdIcon.getAttribute("data-id");

  const savedColor = getSavedButtonState(buttonId);
  if (savedColor) {
    cdIcon.style.backgroundColor = savedColor;
  }

  cdIcon.addEventListener("click", function () {
    let newColor;
    if (cdIcon.style.backgroundColor === "green") {
      newColor = "red";
    } else {
      newColor = "green";
    }

    cdIcon.style.backgroundColor = newColor;

    saveButtonState(buttonId, newColor);

    console.log(`Button with ID ${buttonId} color is now: ${newColor}`);
  });
});
