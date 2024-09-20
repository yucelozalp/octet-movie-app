import React from 'react';
import { Pagination } from 'antd';

interface PaginationComponentProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalItems, pageSize, onPageChange }) => (
  <Pagination
    current={currentPage}
    pageSize={pageSize}
    total={totalItems}
    onChange={onPageChange}
    className="pagination"
  />
);

export default PaginationComponent;