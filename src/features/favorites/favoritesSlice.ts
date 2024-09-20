import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteMovies: string[];
}

const initialState: FavoritesState = {
  favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favoriteMovies.push(action.payload);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteMovies = state.favoriteMovies.filter(id => id !== action.payload);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;