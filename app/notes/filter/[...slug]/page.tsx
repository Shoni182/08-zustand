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
  const tag = slug[0] === "all" ? "All" : slug[0];
  const useTags =
    tag === "All" || "Todo" || "Work" || "Personal" || "Meeting" || "Shopping"
      ? tag
      : "All";

  // тут проблема полягає в тому що слаг на all буде видавати undefined
  // Треба відфільрувати тільки ті параметри які існують всі ішні ні

  return {
    title: `Notes: ${useTags}`,
    description: "Notes description",
    openGraph: {
      title: `Notes:ddddd`,
      description: "Notes description",
      url: `https://08-zustand-eight-beta.vercel.app/notes/filter/${useTags}`,
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
