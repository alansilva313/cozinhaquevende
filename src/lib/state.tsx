import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { readStored, writeStored } from './storage';

export type ReaderProgress = { completed: string[]; lastChapter: string };
export type AppState = {
  favorites: string[]; setFavorites: Dispatch<SetStateAction<string[]>>;
  readers: Record<string, ReaderProgress>; setReaders: Dispatch<SetStateAction<Record<string, ReaderProgress>>>;
  checklists: Record<string, string[]>; setChecklists: Dispatch<SetStateAction<Record<string, string[]>>>;
  planChecks: string[]; setPlanChecks: Dispatch<SetStateAction<string[]>>;
  fontScale: number; setFontScale: Dispatch<SetStateAction<number>>;
  theme: 'light' | 'dark'; setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
};
function useStored<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readStored(localStorage,key,initial));
  useEffect(() => { writeStored(localStorage,key,value); }, [key, value]);
  return [value, setValue];
}
const StateContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useStored<string[]>('cqr:favorites', []);
  const [readers, setReaders] = useStored<Record<string, ReaderProgress>>('cqr:readers', {});
  const [checklists, setChecklists] = useStored<Record<string, string[]>>('cqr:checklists', {});
  const [planChecks, setPlanChecks] = useStored<string[]>('cqr:plan', []);
  const [fontScale, setFontScale] = useStored<number>('cqr:font-scale', 1);
  const [theme, setTheme] = useStored<'light' | 'dark'>('cqr:theme', 'light');
  return <StateContext.Provider value={{favorites,setFavorites,readers,setReaders,checklists,setChecklists,planChecks,setPlanChecks,fontScale,setFontScale,theme,setTheme}}>{children}</StateContext.Provider>;
}
export function useAppState() { const value = useContext(StateContext); if (!value) throw new Error('AppProvider ausente'); return value; }
