import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Draft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: Draft;
  setDraft: (note: Draft) => void;
  clearDraft: () => void;
}

export const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);