// app/notes/filter/[...slug]/Notes.client.tsx
//?  USE CLIETN derective for - CSR Client side rendering
//
"use client";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import Link from "next/link";

//: Components

import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  tag?: string;
};

//:  Fn
const Notes = ({ tag }: Props) => {
  //: Initial Values

  //: Pages
  // const perPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  //: Search and Debounce
  const [query, setQuery] = useState("");
  const debaucedSetQuery = useDebouncedCallback(setQuery, 300);

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    debaucedSetQuery(value);
  };

  //: Use Query
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, query, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        query: query,
        tag: tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages || 0;

  //: Return
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={query} onSearch={handleSearch} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}

        <Link href={`/notes/action/create`} className={css.button}>
          Create note +
        </Link>
      </header>
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
};

//: Export of the Fn

export default Notes;
