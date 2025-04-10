// Diet Tracker Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mealForm = document.getElementById('mealForm');
    const mealsContainer = document.getElementById('mealsContainer');
    const totalMealsElement = document.getElementById('totalMeals');
    const totalCaloriesElement = document.getElementById('totalCalories');
    const avgCaloriesElement = document.getElementById('avgCalories');
    const suggestionElement = document.getElementById('suggestion');

    // Load meals from local storage
    let meals = JSON.parse(localStorage.getItem('meals')) || [];
    updateMealsDisplay();

    // Handle form submission
    mealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const mealType = document.getElementById('mealType').value;
        const foodItem = document.getElementById('foodItem').value;
        const calories = parseInt(document.getElementById('calories').value);

        // Create new meal object
        const meal = {
            id: Date.now(),
            type: mealType,
            food: foodItem,
            calories: calories,
            timestamp: new Date().toISOString()
        };

        // Add to meals array
        meals.push(meal);
        
        // Save to local storage
        localStorage.setItem('meals', JSON.stringify(meals));
        
        // Update display
        updateMealsDisplay();
        
        // Reset form
        mealForm.reset();
    });

    // Update meals display
    function updateMealsDisplay() {
        // Clear container
        mealsContainer.innerHTML = '';
        
        // Filter today's meals
        const today = new Date().toISOString().split('T')[0];
        const todayMeals = meals.filter(meal => meal.timestamp.startsWith(today));
        
        // Update summary
        const totalMeals = todayMeals.length;
        const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
        const avgCalories = totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0;
        
        totalMealsElement.textContent = totalMeals;
        totalCaloriesElement.textContent = totalCalories;
        avgCaloriesElement.textContent = avgCalories;
        
        // Update suggestion
        updateSuggestion(totalCalories, totalMeals);
        
        // Display meals
        todayMeals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.className = 'meal-item';
            mealElement.innerHTML = `
                <div class="meal-info">
                    <h4>${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</h4>
                    <p>${meal.food}</p>
                </div>
                <div class="meal-calories">${meal.calories} cal</div>
                <button class="remove-meal" data-id="${meal.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            mealsContainer.appendChild(mealElement);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-meal').forEach(button => {
            button.addEventListener('click', function() {
                const mealId = parseInt(this.getAttribute('data-id'));
                meals = meals.filter(meal => meal.id !== mealId);
                localStorage.setItem('meals', JSON.stringify(meals));
                updateMealsDisplay();
            });
        });
    }

    // Update suggestion based on total calories and meals
    function updateSuggestion(totalCalories, totalMeals) {
        if (totalMeals === 0) {
            suggestionElement.textContent = 'Start adding your meals to get personalized suggestions.';
            return;
        }

        const suggestions = [
            { condition: totalCalories < 1200, text: 'Your calorie intake seems low. Consider adding more nutrient-dense foods.' },
            { condition: totalCalories > 2500, text: 'Your calorie intake is high. Consider more balanced portion sizes.' },
            { condition: totalMeals < 3, text: 'Try to have at least 3 meals a day for better metabolism.' },
            { condition: totalMeals > 5, text: 'You\'re eating frequently. Make sure to maintain portion control.' },
            { condition: true, text: 'Keep up the good work! Your meal pattern looks balanced.' }
        ];

        const suggestion = suggestions.find(s => s.condition);
        suggestionElement.textContent = suggestion.text;
    }
}); 