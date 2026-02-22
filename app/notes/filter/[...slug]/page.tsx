import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';

  return {
    title: `Notes: ${tag} | NoteHub`,
    description: `Filtered notes by ${tag}`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Filtered notes by ${tag}`,
      url: `https://notehub.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
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
