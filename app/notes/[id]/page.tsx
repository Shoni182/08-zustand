//: Libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

//: Component
import NoteDetails from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

import type { Metadata } from "next";
// Типізація
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `${note.title} `,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `${note.title}`,
      description: note.content.slice(0, 30),
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

// Функція
// : Server prefetch
const NotePage = async ({ params }: Props) => {
  // Деструктуризація з await тому що це promise
  const { id } = await params;

  // prefertch query
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  // : Return and dehydratation
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
};

export default NotePage;
