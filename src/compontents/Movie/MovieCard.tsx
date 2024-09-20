import React from 'react';
import { Card, Button, Image } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => (
  <Card style={{ border: 'none' }}>
    <div>
      <Image width={"100%"} src={movie.poster} style={{ position: "relative" }} />
      <div style={{ position: "absolute", top: 35, right: 40 }}>
        <Button
          onClick={onToggleFavorite}
          style={{ border: 'none', backgroundColor: 'white', borderRadius: "100%", padding: "9px" }}
        >
          {isFavorite ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined style={{ color: "red" }} />}
        </Button>
      </div>
      {movie.isTvSeries && (
        <div style={{ position: 'absolute', top: '40px', left: '40px', backgroundColor: '#ffffff94', borderRadius: '20px', padding: '5px 10px', color: 'darkslategray', fontSize: '10px', fontWeight: 'bold' }}>
          <span>TV SERIES</span>
        </div>
      )}
    </div>
    <p>{movie.country} - {movie.year}</p>
    <p><h2>{movie.name}</h2></p>
    <p><strong>IMDB:</strong> {movie.imdb}</p>
    <p><strong>{movie.category}</strong></p>
    <Link to={`/movies/${movie.id}`}>
      <Button style={{ marginLeft: '10px' }}>Detay</Button>
    </Link>
  </Card>
);

export default MovieCard;