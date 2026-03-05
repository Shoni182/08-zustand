// app/notes/filter/[...slug]/page.tsx
//  SSR server side rendering - default mode
import Notes from "./Notes.client";
import type { Metadata } from "next";
import type { NoteTag } from "@/types/note";

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
  const tag = slug[0];

  if (tag === "all") {
    return {
      title: `All notes`,
      description: `Page includes all notes`,
      openGraph: {
        title: `All notes`,
        description: `Page includes all notes`,
        url: `https://08-zustand-eight-beta.vercel.app/notes/filter/all`,
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

  return {
    title: `Notes: ${tag}`,
    description: `Notes that includes ${tag} tags`,
    openGraph: {
      title: `Notes:${tag}`,
      description: `Notes that includes ${tag} tags`,
      url: `https://08-zustand-eight-beta.vercel.app/notes/filter/${tag}`,
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

//: Libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

//: Component

import { fetchNotes } from "@/lib/api";

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
