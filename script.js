// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

let isDarkTheme = false;

themeToggle.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  body.classList.toggle("dark-theme");
  themeToggle.textContent = isDarkTheme ? "☀️" : "🌙";
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Modal Handling
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const closeBtns = document.querySelectorAll(".close");

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "block";
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "block";
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.style.display = "none";
  if (e.target === signupModal) signupModal.style.display = "none";
});

// Form Validation
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Basic validation
  if (email && password) {
    // Here you would typically make an API call to authenticate
    console.log("Login attempt:", { email });
    loginModal.style.display = "none";
    loginForm.reset();
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const passwords = signupForm.querySelectorAll('input[type="password"]');

  // Basic validation
  if (name && email && passwords[0].value === passwords[1].value) {
    // Here you would typically make an API call to register
    console.log("Signup attempt:", { name, email });
    signupModal.style.display = "none";
    signupForm.reset();
  } else {
    alert("Please check your inputs. Passwords must match.");
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// BMI Calculator
const calculateBMI = () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');

    if (weight && height) {
        const bmi = (weight / (height * height)).toFixed(1);
        bmiValue.textContent = bmi;

        if (bmi < 18.5) bmiCategory.textContent = 'Underweight';
        else if (bmi < 25) bmiCategory.textContent = 'Normal';
        else if (bmi < 30) bmiCategory.textContent = 'Overweight';
        else bmiCategory.textContent = 'Obese';
    }
};

document.getElementById('calculate-bmi').addEventListener('click', calculateBMI);

// Daily Health Challenge
const challenges = [
    "Drink 8 glasses of water today",
    "Walk 10,000 steps",
    "Do 20 minutes of stretching",
    "Eat 5 servings of fruits and vegetables",
    "Get 8 hours of sleep tonight",
    "Take a 15-minute meditation break",
    "Do 30 jumping jacks",
    "Take the stairs instead of the elevator",
    "Have a sugar-free day",
    "Practice good posture for the entire day"
];

const setDailyChallenge = () => {
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('dailyChallenge');
    const savedDate = localStorage.getItem('challengeDate');

    if (savedDate !== today) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        document.getElementById('challenge-text').textContent = randomChallenge;
        localStorage.setItem('dailyChallenge', randomChallenge);
        localStorage.setItem('challengeDate', today);
    } else if (savedChallenge) {
        document.getElementById('challenge-text').textContent = savedChallenge;
    }
};

document.getElementById('new-challenge').addEventListener('click', () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('challenge-text').textContent = randomChallenge;
    localStorage.setItem('dailyChallenge', randomChallenge);
    localStorage.setItem('challengeDate', new Date().toDateString());
});

// Medicine Reminder
const reminders = JSON.parse(localStorage.getItem('medicineReminders') || '[]');

const addReminder = (e) => {
    e.preventDefault();
    const name = document.getElementById('medicine-name').value;
    const time = document.getElementById('medicine-time').value;

    if (name && time) {
        const reminder = { id: Date.now(), name, time };
        reminders.push(reminder);
        localStorage.setItem('medicineReminders', JSON.stringify(reminders));
        displayReminders();
        e.target.reset();
    }
};

const deleteReminder = (id) => {
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
        reminders.splice(index, 1);
        localStorage.setItem('medicineReminders', JSON.stringify(reminders));
        displayReminders();
    }
};

const displayReminders = () => {
    const list = document.getElementById('reminders-list');
    list.innerHTML = '';

    reminders.sort((a, b) => a.time.localeCompare(b.time)).forEach(reminder => {
        const div = document.createElement('div');
        div.className = 'reminder-item';
        div.innerHTML = `
            <div>
                <strong>${reminder.name}</strong>
                <span>${reminder.time}</span>
            </div>
            <button onclick="deleteReminder(${reminder.id})">Delete</button>
        `;
        list.appendChild(div);
    });
};

document.getElementById('medicine-form').addEventListener('submit', addReminder);

// Interactive Body Map
const bodyPartDiseases = {
    head: ['Migraine', 'Tension Headache', 'Sinusitis'],
    chest: ['Asthma', 'Bronchitis', 'Heart Disease'],
    abdomen: ['Gastritis', 'Appendicitis', 'IBS'],
    arms: ['Carpal Tunnel', 'Tennis Elbow', 'Arthritis'],
    legs: ['Varicose Veins', 'Knee Arthritis', 'Sciatica']
};

const showDiseases = (part) => {
    const diseasesList = document.getElementById('diseases-list');
    const diseases = bodyPartDiseases[part];

    if (diseases) {
        diseasesList.innerHTML = diseases.map(disease =>
            `<div class="disease-item">
                <h4>${disease}</h4>
            </div>`
        ).join('');
    }
};

document.querySelectorAll('.body-part').forEach(part => {
    part.addEventListener('click', (e) => {
        const partName = e.target.getAttribute('data-part');
        showDiseases(partName);
    });
});

// Initialize features
setDailyChallenge();
displayReminders();

// Health Calculator Functions
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values');
        return;
    }
    
    const bmi = weight / (height * height);
    const resultElement = document.getElementById('bmi-result');
    const categoryElement = document.getElementById('bmi-category');
    const descriptionElement = document.getElementById('bmi-description');
    
    resultElement.textContent = bmi.toFixed(1);
    
    let category, description;
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consider consulting a healthcare professional.';
    } else if (bmi < 25) {
        category = 'Normal weight';
        description = 'Your weight is within a healthy range. Maintain your current lifestyle.';
    } else if (bmi < 30) {
        category = 'Overweight';
        description = 'Consider making lifestyle changes to achieve a healthier weight.';
    } else {
        category = 'Obese';
        description = 'It is recommended to consult a healthcare professional for guidance.';
    }
    
    categoryElement.textContent = category;
    descriptionElement.textContent = description;
}

function calculateBMR() {
    const weight = parseFloat(document.getElementById('weight-bmr').value);
    const height = parseFloat(document.getElementById('height-bmr').value);
    const age = parseInt(document.getElementById('age-bmr').value);
    const gender = document.getElementById('gender-bmr').value;
    
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        alert('Please enter valid values for all fields');
        return;
    }
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const resultElement = document.getElementById('bmr-result');
    resultElement.textContent = Math.round(bmr);
}

function calculateCalorieNeeds() {
    const weight = parseFloat(document.getElementById('weight-calories').value);
    const height = parseFloat(document.getElementById('height-calories').value);
    const age = parseInt(document.getElementById('age-calories').value);
    const gender = document.getElementById('gender-calories').value;
    const activityLevel = document.getElementById('activity-level').value;
    
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        alert('Please enter valid values for all fields');
        return;
    }
    
    // Calculate BMR first
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Activity level multipliers
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    };
    
    const calories = bmr * activityMultipliers[activityLevel];
    const resultElement = document.getElementById('calories-result');
    resultElement.textContent = Math.round(calories);
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // BMI Calculator
    const bmiForm = document.getElementById('bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
    }
    
    // BMR Calculator
    const bmrForm = document.getElementById('bmr-form');
    if (bmrForm) {
        bmrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMR();
        });
    }
    
    // Calorie Needs Calculator
    const caloriesForm = document.getElementById('calories-form');
    if (caloriesForm) {
        caloriesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalorieNeeds();
        });
    }
});
