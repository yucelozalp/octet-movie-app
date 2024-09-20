import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface FiltersProps {
  filter: string;
  sortBy: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, sortBy, onFilterChange, onSortChange }) => (
  <div className="filter-sort">
    <Select
      value={filter}
      onChange={onFilterChange}
      className="filter-select"
    >
      <Option value="">Tümü</Option>
      <Option value="favorites">Favoriler</Option>
      <Option value="new">Yeniler</Option>
    </Select>
    <Select
      value={sortBy}
      onChange={onSortChange}
      className="sort-select"
    >
      <Option value="name">Film Adı</Option>
      <Option value="year">Yayın Yılı</Option>
      <Option value="imdb">IMDB Puanı</Option>
    </Select>
  </div>
);

export default Filters;