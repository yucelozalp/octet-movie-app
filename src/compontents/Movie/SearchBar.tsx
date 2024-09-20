import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => (
  <Search
    placeholder="What do you want to watch?"
    onChange={(e) => onSearch(e.target.value)}
    value={value}
    enterButton
    style={{ width: "600px",margin: "0 auto" }}
  />
);

export default SearchBar;