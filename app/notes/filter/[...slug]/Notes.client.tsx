'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import css from './NotePage.module.css';
import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

interface Props {
  tag: string;
}

export default function Notes({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useQuery({
    queryKey: ['notes', page, tag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
        tag: tag === 'all' ? undefined : tag,
      }),
    placeholderData: prev => prev,
  });

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

return (
  <div className={css.app}>
    <div className={css.toolbar}>
      <SearchBox onSearch={handleSearch} />

      <Link href="/notes/action/create" className={css.createLink}>
        Create note +
      </Link>
    </div>

    {data && <NoteList notes={data.notes} />}

    {data && (
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onChange={setPage}
      />
    )}
  </div>
);
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}