"use client";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, type FormikHelpers, Field, ErrorMessage } from "formik";
import type { NewNote } from "@/types/note";
import * as Yup from "yup";

interface NoteFormProps {
  close: () => void;
}
const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ close }: NoteFormProps) {
  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    actions.resetForm();
    mutate(values);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (noteData: NewNote) => createNote(noteData),
    onSuccess: () => (
      queryClient.invalidateQueries({ queryKey: ["notes"] }),
      close()
    ),
  });

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string().required("Tag is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={close}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
