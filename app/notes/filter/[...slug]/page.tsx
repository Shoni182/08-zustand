// app/notes/filter/[...slug]/page.tsx
import Notes from "./Notes.client";

//?   SSR server side rendering - default mode
//

type Props = {
  params: Promise<{ slug: string[] }>;
};

type NoteParams = {
  page: number;
  query: string;
  tag?: string;
};

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
