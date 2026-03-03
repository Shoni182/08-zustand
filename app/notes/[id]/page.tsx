//: Libraries
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

//: Component
import NoteDetails from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

// Типізація
type Props = {
  params: Promise<{ id: string }>;
};

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
