import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const selectedTag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, selectedTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: selectedTag === 'all' ? undefined : selectedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={selectedTag} />
    </HydrationBoundary>
  );
}
