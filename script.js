const container = document.querySelector(".recipes");
const input = document.querySelector("#searchInput");

// Завантаження рецептів
async function getRecipes(query = "chicken") {
  try {
    const url = https://www.themealdb.com/api/json/v1/1/search.php?s=${query};
    const res = await fetch(url);
    const data = await res.json();

    displayRecipes(data.meals || []);
  } catch (error) {
    console.error("Помилка:", error);
    container.innerHTML = "<p>Сталася помилка 😢</p>";
  }
}

// Відображення карток
function displayRecipes(meals) {
  container.innerHTML = "";

  if (!meals.length) {
    container.innerHTML = "<p>Нічого не знайдено 😢</p>";
    return;
  }

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <button onclick="openRecipe('${meal.idMeal}')">Деталі</button>
    `;

    container.appendChild(card);
  });
}

// Деталі рецепта
async function openRecipe(id) {
  const url = https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id};

  const res = await fetch(url);
  const data = await res.json();

  const meal = data.meals[0];

  alert(
    🍽️ ${meal.strMeal}\n\n📖 Інструкція:\n${meal.strInstructions}
  );
}

// Пошук
function searchRecipes() {
  const value = input.value.trim();
  getRecipes(value);
}

// старт
getRecipes();