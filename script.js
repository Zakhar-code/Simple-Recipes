const recipe = document.getElementById("recipe");

async function searchRecipe() {

    const search =
        document.getElementById("search")
        .value
        .trim();

    const result =
        document.getElementById("result");

    const main =
        document.querySelector("main");

    if(search === ""){

        result.innerHTML = "";

        search.style.display = "block";

        return;
    }

    try{

        const response =
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
            );

        const data =
            await response.json();

        if(!data.meals){

            recipe.style.display = "none";

            result.innerHTML = `
                <div class="not-found">
                    <h2>
                        На жаль нічого не знайдено 😢
                    </h2>
                </div>
            `;

            return;
        }

        recipe.style.display = "none";

        const meal = data.meals[0];

        let ingredients = "";

        for(let i=1;i<=20;i++){

            const ingredient =
                meal[`strIngredient${i}`];

            const measure =
                meal[`strMeasure${i}`];

            if(
                ingredient &&
                ingredient.trim() !== ""
            ){

                ingredients += `
                    <li>
                        ${ingredient}
                        ${measure}
                    </li>
                `;
            }
        }

        result.innerHTML = `
            <div class="api-card">

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >

                <div class="api-info">

                    <h2>
                        ${meal.strMeal}
                    </h2>

                    <h3>
                        Інгредієнти:
                    </h3>

                    <ul>
                        ${ingredients}
                    </ul>

                    <button
                        onclick="toggleRecipe()"
                    >
                        Більше
                    </button>

                    <div
                        id="recipeDetails"
                        style="display:none;"
                    >

                        <h3>
                            Приготування:
                        </h3>

                        <p>
                            ${meal.strInstructions}
                        </p>

                    </div>

                </div>

            </div>
        `;

    }catch(error){

        result.innerHTML = `
            <h2>
                Помилка API 😢
            </h2>
        `;

        console.log(error);
    }
}

function toggleRecipe(){

    const details =
        document.getElementById("recipeDetails");

    if(
        details.style.display === "none"
    ){

        details.style.display = "block";

    }else{

        details.style.display = "none";
    }
}