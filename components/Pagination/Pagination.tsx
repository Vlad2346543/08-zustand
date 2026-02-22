import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}
    

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      activeClassName={css.active}
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={e => onChange(e.selected + 1)}
      previousLabel="<"
      nextLabel=">"
    />
  );
}
