import { Burger } from '../types/Burger';


const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const burgersApi = {
  searchBurgers: async (query: string = 'burger'): Promise<Burger[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search.php?s=${query}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch burgers');
    }
  },

  getBurgerById: async (id: string): Promise<Burger | null> => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch burger details');
    }
  }
};