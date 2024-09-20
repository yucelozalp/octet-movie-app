import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/movies/moviesSlice';
import authReducer from './features/auth/authSlice';
import favoritesReducer from './features/favorites/favoritesSlice';


const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;