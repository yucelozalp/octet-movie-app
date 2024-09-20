import React from 'react';
import { Badge, Button } from 'antd';
import { Link } from 'react-router-dom';

interface FavoritesBadgeProps {
  count: number;
}

const FavoritesBadge: React.FC<FavoritesBadgeProps> = ({ count }) => (
  <Link to="/favorites">
    <Badge count={count} showZero>
      <Button>Favoriler</Button>
    </Badge>
  </Link>
);

export default FavoritesBadge;