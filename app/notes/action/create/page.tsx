import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create a note",
    description: "Page for creating a new note",
    openGraph: {
      title: "Create a note",
      description: "Page for creating a new note",
      url: `https://08-zustand-eight-beta.vercel.app/notes/action/create`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 640,
          height: 640,
          alt: "NoteHub Logo image",
        },
      ],
    },
  };
}
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
