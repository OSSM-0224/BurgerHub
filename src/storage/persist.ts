import AsyncStorage from '@react-native-async-storage/async-storage';
import { Burger } from '../types';

const BURGERS_KEY = 'burgerhub_burgers';
const PAGE_KEY = 'burgerhub_page';
const TIMESTAMP_KEY = 'burgerhub_timestamp';

export const storage = {
  saveBurgers: async (burgers: Burger[]): Promise<void> => {
    try {
      await AsyncStorage.multiSet([
        [BURGERS_KEY, JSON.stringify(burgers)],
        [TIMESTAMP_KEY, new Date().toISOString()]
      ]);
    } catch (error) {
      console.error('Failed to save burgers:', error);
    }
  },

  getBurgers: async (): Promise<Burger[] | null> => {
    try {
      const data = await AsyncStorage.getItem(BURGERS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get burgers:', error);
      return null;
    }
  },

  savePage: async (page: number): Promise<void> => {
    try {
      await AsyncStorage.setItem(PAGE_KEY, page.toString());
    } catch (error) {
      console.error('Failed to save page:', error);
    }
  },

  getPage: async (): Promise<number> => {
    try {
      const page = await AsyncStorage.getItem(PAGE_KEY);
      return page ? parseInt(page, 10) : 1;
    } catch (error) {
      return 1;
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([BURGERS_KEY, PAGE_KEY, TIMESTAMP_KEY]);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};