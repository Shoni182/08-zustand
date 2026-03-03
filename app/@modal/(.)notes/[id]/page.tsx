import { fetchNoteById } from "@/lib/api";
//: Libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
// import css from "./Modal.module.css";
import NoteModal from "./NotePreview.client";
type Props = {
  // тут обовязково має бут "params"
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const { id } = await params;
  // const note = await fetchNoteById(id);

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteModal />
    </HydrationBoundary>
  );
};

export default NotePreview;
