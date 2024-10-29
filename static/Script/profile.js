function createCheckboxInputs(containerId, items) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "form-check form-check-inline";
      
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "form-check-input";
      input.name = containerId; // name attribute set to containerId for grouping
      input.value = item;
      input.id = `${containerId}-${item.replace(/\s+/g, '-')}`;
      
      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.innerText = item;
      
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      container.appendChild(checkboxContainer);
  });
}

// Execute functions to populate HTML
document.addEventListener("DOMContentLoaded", () => {
  createCheckboxInputs("preferences-div", attributes);
  createCheckboxInputs("skills-container", skills);
});

const experience = document.getElementById("experience");
const cd = document.getElementById("cd-icon");

cd.onclick = function () {
    // Check the current color and toggle
    if (experience.style.color === 'green') {
        experience.style.color = 'red';
    } else {
        experience.style.color = 'green';
    }
};

const expert = document.getElementById("expert");
const cd2 = document.getElementById("cd-icon2");

cd2.onclick = function () {
    // Check the current color and toggle
    if (expert.style.color === 'green') {
        expert.style.color = 'red';
    } else {
        expert.style.color = 'green';
    }
};

const com = document.getElementById("com");
const cd3 = document.getElementById("cd-icon3");

cd3.onclick = function () {
    // Check the current color and toggle
    if (com.style.color === 'green') {
        com.style.color = 'red';
    } else {
        com.style.color = 'green';
    }
};

const program = document.getElementById("program");
const cd4 = document.getElementById("cd-icon4");

program.onclick = function () {
    // Check the current color and toggle
    if (program.style.color === 'green') {
        program.style.color = 'red';
    } else {
        program.style.color = 'green';
    }
};