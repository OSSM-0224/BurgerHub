export interface Burger {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: `strIngredient${number}`]: string | undefined;
}
