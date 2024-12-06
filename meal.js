document.addEventListener('DOMContentLoaded', function() {
  // Fetch meals and display them
  fetch('/user/meals')
      .then(response => response.json())
      .then(meals => {
          meals.forEach(meal => {
              const mealCard = document.createElement('div');
              mealCard.classList.add('meal-card');
              mealCard.textContent = meal.name;

              // Display meals based on their time of day (Breakfast, Lunch, Dinner)
              if (meal.time_of_day === 'Breakfast') {
                  document.querySelector('.meal-time:nth-child(2) .meal-card').appendChild(mealCard);
              } else if (meal.time_of_day === 'Lunch') {
                  document.querySelector('.meal-time:nth-child(3) .meal-card').appendChild(mealCard);
              } else if (meal.time_of_day === 'Dinner') {
                  document.querySelector('.meal-time:nth-child(4) .meal-card').appendChild(mealCard);
              }
          });
      })
      .catch(error => console.error('Error fetching meals:', error));
});
