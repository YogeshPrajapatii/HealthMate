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
      
      // Add active class to the clicked nav item and update the underline
      document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
      });
      this.classList.add('active');
      updateNavUnderline();
    }
  });
});

// Function to update navigation underline position
const updateNavUnderline = () => {
  const activeNavItem = document.querySelector('.nav-link.active');
  const navBar = document.querySelector('.navbar-nav');
  
  if (activeNavItem && navBar) {
    const itemRect = activeNavItem.getBoundingClientRect();
    const navRect = navBar.getBoundingClientRect();
    
    // Create or update the underline element
    let underline = document.getElementById('nav-underline');
    if (!underline) {
      underline = document.createElement('div');
      underline.id = 'nav-underline';
      underline.style.position = 'absolute';
      underline.style.height = '2px';
      underline.style.backgroundColor = 'var(--primary-color)';
      underline.style.transition = 'all 0.3s ease';
      navBar.appendChild(underline);
    }
    
    // Set the position and width of the underline
    underline.style.width = `${itemRect.width}px`;
    underline.style.left = `${itemRect.left - navRect.left}px`;
    underline.style.bottom = '0';
  }
};

// Initialize the underline on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavUnderline();
  
  // Update the underline when the window is resized
  window.addEventListener('resize', updateNavUnderline);
  
  // Update the underline when scrolling to handle active section
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100; // Offset for better accuracy
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === `#${sectionId}`) {
            navLink.classList.add('active');
          }
        });
        updateNavUnderline();
      }
    });
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

// Health Tips Carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('tips-carousel');
  const prevButton = document.getElementById('prev-tip');
  const nextButton = document.getElementById('next-tip');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  
  if (!carousel || !prevButton || !nextButton || !indicatorsContainer) return;
  
  const cards = Array.from(carousel.querySelectorAll('.tip-card'));
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  
  // Create indicators
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    const totalIndicators = Math.ceil(cards.length / cardsPerView);
    
    for (let i = 0; i < totalIndicators; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      
      indicator.addEventListener('click', () => {
        goToSlide(i * cardsPerView);
      });
      
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  function getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }
  
  function updateCarousel() {
    const translateX = -currentIndex * (100 / cardsPerView);
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update active indicator
    const activeIndicatorIndex = Math.floor(currentIndex / cardsPerView);
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndicatorIndex);
    });
    
    // Update active card
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
    
    // Enable/disable buttons
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= cards.length - cardsPerView;
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    updateCarousel();
  }
  
  // Initialize carousel
  function initCarousel() {
    cardsPerView = getCardsPerView();
    createIndicators();
    updateCarousel();
    
    // Set the first card as active
    if (cards.length > 0) {
      cards[0].classList.add('active');
    }
  }
  
  // Event listeners
  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  // Auto-rotate the carousel
  let autoRotateInterval = setInterval(() => {
    if (currentIndex < cards.length - cardsPerView) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }, 5000);
  
  // Pause auto-rotation on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoRotateInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoRotateInterval = setInterval(() => {
      if (currentIndex < cards.length - cardsPerView) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0);
      }
    }, 5000);
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      createIndicators();
      goToSlide(Math.floor(currentIndex / cardsPerView) * cardsPerView);
    }
  });
  
  // Initialize the carousel
  initCarousel();
});

// Initialize features
setDailyChallenge();
displayReminders();
