import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMovies } from '../features/movies/moviesSlice';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import SearchBar from '../compontents/Movie/SearchBar';
import FavoritesBadge from '../compontents/Movie/FavoritesBadge';
import MovieCard from '../compontents/Movie/MovieCard';
import Filters from '../compontents/Movie/Filters';
import PaginationComponent from '../compontents/Movie/Pagination';
import { List } from 'antd';
import '../styles/MoviesPage.scss';

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favoriteMovies = useSelector((state: RootState) => state.favorites.favoriteMovies);
  const status = useSelector((state: RootState) => state.movies.status);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    },
    []
  );

  useEffect(() => {
    let results = [...movies];

    if (searchTerm) {
      results = results.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'favorites') {
      results = results.filter(movie => favoriteMovies.includes(movie.id));
    } else if (filter === 'new') {
      results = results.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());
    }

    if (sortBy === 'name') {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'year') {
      results = results.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'imdb') {
      results = results.sort((a, b) => parseFloat(b.imdb) - parseFloat(a.imdb));
    }

    setFilteredMovies(results);
  }, [searchTerm, filter, sortBy, movies, favoriteMovies]);

  const handleToggleFavorite = (movieId: string) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    if (storedFavorites.includes(movieId)) {
      const updatedFavorites = storedFavorites.filter((id: string) => id !== movieId);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      dispatch(removeFavorite(movieId));
    } else {
      const updatedFavorites = [...storedFavorites, movieId];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      dispatch(addFavorite(movieId));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const moviesToDisplay = filteredMovies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="movies-page">
      <div className="movies-header">
        <div className="search-container">
          <SearchBar value={searchTerm} onSearch={handleSearch} />
          <FavoritesBadge count={favoriteMovies.length} />
        </div>
        <div className="filters-container">
          <div className="title">
            <h1>Movies</h1>
          </div>
          <Filters
            filter={filter}
            sortBy={sortBy}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={moviesToDisplay}
        renderItem={item => (
          <List.Item>
            <MovieCard
              movie={item}
              isFavorite={favoriteMovies.includes(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          </List.Item>
        )}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalItems={filteredMovies.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MoviesPage;