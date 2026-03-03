"use client";
//: Components
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
// import NoteList from "@/components/NoteList/NoteList";

//: Fn
const NoteDetails = () => {
  const { id } = useParams();

  //: Use Query
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", { id: id }],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Some error..</p>;

  //: Return
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
