import { Burger } from '../types';

export type RootStackParamList = {
  BurgerList: undefined;
  BurgerDetail: {
    burger: Burger;
  };
};
