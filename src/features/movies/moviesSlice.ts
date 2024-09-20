import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Movie {
  id: string;
  name: string;
  year: number;
  country: string;
  imdb: string;
  category: string;
  isTvSeries: boolean;
  summary: string;
}

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await api.get('/movies');
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default moviesSlice.reducer;