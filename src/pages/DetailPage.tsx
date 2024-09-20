import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, Card, Button, Input, Badge, Pagination, Select, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMovies } from '../features/movies/moviesSlice';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import '../styles/DetailPage.scss';
import { Link } from 'react-router-dom';


const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favoriteMovies = useSelector((state: RootState) => state.favorites.favoriteMovies);
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies.length]);

  useEffect(() => {
    const selectedMovie = movies.find(movie => movie.id === id);
    setMovie(selectedMovie);
  }, [id, movies]);

  const handleToggleFavorite = () => {
    if (movie) {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
      if (storedFavorites.includes(movie.id)) {
        const updatedFavorites = storedFavorites.filter((id: string) => id !== movie.id);
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
        dispatch(removeFavorite(movie.id));
      } else {
        const updatedFavorites = [...storedFavorites, movie.id];
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
        dispatch(addFavorite(movie.id));
      }
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className="movies-header">
        <div className="search-container">
          <div className="search-form">
          <Link to="/movies"><h1>{movie.name}</h1></Link>
          </div>
          <div className="favorites-container">
            <Link to="/favorites">
              <Badge count={favoriteMovies.length} showZero>
                <Button>Favoriler</Button>
              </Badge>
            </Link>
          </div>
        </div>
  
      </div>
      <Card
        title={movie.name}
        extra={
          <Button
            onClick={handleToggleFavorite}
          >
            {favoriteMovies.includes(movie.id) ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
          </Button>
        }
      >
        <Image src={movie.poster} style={{ position: "relative", maxHeight: "400px", margin: "0 auto" }} />
        <hr style={{ border: "0.5px solid #f0f0f0" }} />
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>IMDB:</strong> {movie.imdb}</p>
        <p><strong>Category:</strong> {movie.category}</p>
        <p><strong>TV Series:</strong> {movie.isTvSeries ? 'Yes' : 'No'}</p>
        <p><strong>Summary:</strong> {movie.summary}</p>
      </Card>
    </div>
  );
};

export default DetailPage;