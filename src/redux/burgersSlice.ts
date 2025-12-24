import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Burger } from '../types';

interface BurgersState {
  burgers: Burger[];
  filteredBurgers: Burger[];
  currentPage: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  pageSize: number;
}

const initialState: BurgersState = {
  burgers: [],
  filteredBurgers: [],
  currentPage: 1,
  loading: false,
  error: null,
  searchQuery: '',
  pageSize: 10
};

const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setBurgers: (state, action: PayloadAction<Burger[]>) => {
      state.burgers = action.payload;
      state.filteredBurgers = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;

      if (!action.payload.trim()) {
        state.filteredBurgers = state.burgers;
      } else {
        state.filteredBurgers = state.burgers.filter(burger =>
          burger.strMeal.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    loadMorePage: (state) => {
      const maxPage = Math.ceil(state.filteredBurgers.length / state.pageSize);
      if (state.currentPage < maxPage) {
        state.currentPage += 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetState: (state) => {
      state.burgers = [];
      state.filteredBurgers = [];
      state.currentPage = 1;
      state.error = null;
      state.searchQuery = '';
    }
  }
});

export const {
  setBurgers,
  setLoading,
  setError,
  setSearchQuery,
  loadMorePage,
  setCurrentPage,
  resetState
} = burgersSlice.actions;

export default burgersSlice.reducer;