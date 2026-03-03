"use client";
import css from "./Pagination.module.css";
//: Liblaries
import ReactPaginate from "react-paginate";

// До http-запиту потрібно додати параметри page та perPage. Наприклад:
// GET https://notehub-public.goit.study/api/notes?page=1&perPage=1
// Додайте умову, щоб компонент Pagination рендерився лише в тому випадку, якщо кількість сторінок колекції нотаток більше 1.

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  onPageChange,
  totalPages,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
