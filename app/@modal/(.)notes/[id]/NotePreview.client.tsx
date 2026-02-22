'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface Props {
  id: string;
}

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,

  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        <p>Something went wrong</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <h2>{data.title}</h2>
      <p><strong>Tag:</strong> {data.tag}</p>
      <p>{data.content}</p>
      <p>
        <small>
          {new Date(data.createdAt).toLocaleString()}
        </small>
      </p>
    </Modal>
  );
}
