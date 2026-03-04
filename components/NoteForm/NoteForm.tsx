"use client";
import css from "./NoteForm.module.css";
import { createNote, fetchNoteById } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Formik, Form, } from "formik";
import type { NewNote } from "@/types/note";
import type { NoteTag } from "@/types/note";
// import * as Yup from "yup";

// metatags
import { Metadata } from "next";

type Props = {
  params: NewNote;
};

//! Добавити Router

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, content } = await params;

  return {
    title: title,
    description: content,
    openGraph: {
      title: title,
      description: content,
      url: `https://08-zustand-eight-beta.vercel.app/notes/action/create`,
      images: {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 640,
        height: 640,
        alt: "NoteHub Logo image",
      },
    },
  };
}

const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const handleSubmit = (formData: FormData) => {
    const note: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };
    mutate(note);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (noteData: NewNote) => createNote(noteData),
    onSuccess: () => (
      queryClient.invalidateQueries({ queryKey: ["notes"] }),
      close()
    ),
  });

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
        {/* <ErrorMessage component="span" name="title" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        {/* <ErrorMessage component="span" name="content" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage component="span" name="tag" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={close}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
