import css from "@/app/NotFound.module.css";
//: Metatags
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Note-Hub not found",
  description: "Page - Note-Hub is not foun",
  openGraph: {
    title: "Note-Hub not found",
    description: "Page - Note-Hub is not foun",
    url: "https://08-zustand-eight-beta.vercel.app",
    images: {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 640,
      height: 640,
      alt: "NoteHub Logo image",
    },
  },
};

export default function NotFound() {
  return (
    <div>
      {" "}
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
