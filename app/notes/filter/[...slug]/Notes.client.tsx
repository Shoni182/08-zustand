// app/notes/filter/[...slug]/Notes.client.tsx
//?  USE CLIETN derective for - CSR Client side rendering
//
"use client";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
// import { toast, Toaster } from "react-hot-toast";
import css from "./Notes.module.css";

//: Components
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

// import { FetchNotesResponse } from "@/lib/api";

// interface InitialValuesProps {
//   initialValues: { tag?: string };
// }

type Props = {
  tag?: string;
};

//:  Fn
const Notes = ({ tag }: Props) => {
  //: Initial Values

  //: Pages
  // const perPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  //: Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal close={closeModal}>
            <NoteForm close={closeModal} />
          </Modal>
        )}
      </header>
      {/* {isLoading && <strong>Завантаження</strong>} */}
      {/* {isError && toast.error("Щось пішло не так!")} */}
      {/* <Toaster /> */}
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
};

//: Export of the Fn

export default Notes;
