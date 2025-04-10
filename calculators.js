// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight values');
        return;
    }
    
    const bmi = weight / (height * height);
    const resultElement = document.getElementById('bmi-result');
    const valueElement = document.getElementById('bmi-value');
    const categoryElement = document.getElementById('bmi-category');
    const descriptionElement = document.getElementById('bmi-description');
    
    valueElement.textContent = bmi.toFixed(1);
    
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
    resultElement.style.display = 'block';
}

// BMR Calculator
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
    const valueElement = document.getElementById('bmr-value');
    
    valueElement.textContent = Math.round(bmr);
    resultElement.style.display = 'block';
}

// Daily Calorie Needs Calculator
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
    const valueElement = document.getElementById('calories-value');
    
    valueElement.textContent = Math.round(calories);
    resultElement.style.display = 'block';
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