import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { List, Card, Button, Input, Badge, Pagination, Select, Image } from 'antd';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';
import { fetchMovies } from '../features/movies/moviesSlice';
import { HeartOutlined, HeartFilled, FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const favoriteMovies = useSelector((state: RootState) => state.favorites.favoriteMovies);
    const [favoriteMoviesList, setFavoriteMoviesList] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
        const favorites = movies.filter(movie => storedFavorites.includes(movie.id));
        setFavoriteMoviesList(favorites);
    }, [movies]);

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

    return (
        <div style={{ padding: '20px' }}>
            <div className="movies-header">
                <div className="filters-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h1>Favoriler</h1>
                    </div>
                    <div>
                        <Link to="/movies">

                            <Button>Geri Dön</Button>

                        </Link>
                    </div>

                </div>
            </div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={favoriteMoviesList}
                renderItem={item => (
                    <List.Item>
                        <Card
                            style={{ border: 'none' }}
                        >
                            <div>
                                <Image width={"100%"} src={item.poster} style={{ position: "relative" }} />
                                <div style={{ position: "absolute", top: 35, right: 40 }}>
                                    <Button
                                        onClick={() => handleToggleFavorite(item.id)}
                                        style={{ border: 'none', backgroundColor: 'white', borderRadius: "100%", padding: "9px" }}
                                    >
                                        {favoriteMovies.includes(item.id) ? (
                                            <HeartFilled style={{ color: "red" }} />
                                        ) : (
                                            <HeartOutlined style={{ color: "red" }} />
                                        )}
                                    </Button>
                                </div>
                                {item.isTvSeries ? (
                                    <div style={{ position: 'absolute', top: '40px', left: '40px', backgroundColor: '#ffffff94', borderRadius: '20px', padding: '5px 10px', color: 'darkslategray', fontSize: '10px', fontWeight: 'bold' }}>
                                        <span>TV SERIES</span>
                                    </div>
                                ) : null}
                            </div>

                            <p>{item.country} -  {item.year}</p>
                            <p><h2>{item.name}</h2></p>
                            <p><strong>IMDB:</strong> {item.imdb}</p>
                            <p><strong>{item.category}</strong></p>
                        </Card>
                        <Link to={`/movies/${item.id}`}>
                            <Button style={{ marginLeft: '10px' }}>Detay</Button>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FavoritesPage;