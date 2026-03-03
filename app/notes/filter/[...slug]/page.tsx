// app/notes/filter/[...slug]/page.tsx
import { fetchNoteById } from "@/lib/api";
import Notes from "./Notes.client";

//?   SSR server side rendering - default mode

import type { Metadata } from "next";

//

type Props = {
  params: Promise<{ slug: string[] }>;
};

type NoteParams = {
  page: number;
  query: string;
  tag?: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const pageNotes = await fetchNotes({
    page: 1,
    query: "",
    tag: tag,
  });

  return {
    title: `Notes ${tag} `,
    description: `Page - Note-Hub ${tag}`,
    openGraph: {
      title: `Notes ${tag}`,
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
}

//: Libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

//: Component

import { fetchNotes } from "@/lib/api";
// import { NoteTag } from "@/types/note";

// : Server prefetch
const NotesPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  //- Запамятати
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryParams: NoteParams = {
    page: 1,
    query: "",
    tag: tag,
  };

  await queryClient.prefetchQuery({
    // На серверній частині ключі записуються обєктами задля вдомності,
    // так як вони повинні співпадати з Кількістю ключів в клієнському компоненті
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(queryParams),
  });

  // : Return and dehydratation
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
