import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import utils from '../utils';

export default function <T>(
  makeRequest: (
    currentPage: number,
    searchString: string
  ) => Promise<{ items: T[]; totalPages: number }>,
  defaultItems: T[] = [],
  customSetItems?: React.Dispatch<React.SetStateAction<T[]>>,
  dependencies: Array<any> = [],
  debounceTime: number | null = null,
  skipFirst = false
) {
  const [loading, setLoading] = useState(!skipFirst);
  const [items, setItems] = useState<T[]>(defaultItems);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const lastSearchString = useRef(searchString);
  const first = useRef(true);
  const skipFirstRef = useRef(skipFirst);

  const setItemsFinal = useMemo(
    () => customSetItems || setItems,
    [customSetItems]
  );

  const onContainerScrolled = useCallback(() => {
    if (loading) return;
    if (currentPage < totalPages) {
      setCurrentPage((old) => old + 1);
    }
  }, [loading, currentPage, totalPages]);

  // Reset pagination on search change
  useEffect(() => {
    setCurrentPage(1);
    setItems([]);
  }, [searchString]);

  const getLibraryFiles = useMemo(
    () =>
      utils.debounce(
        async (
          currentPage: number,
          searchString: string,
          setItemsFinal: React.Dispatch<React.SetStateAction<T[]>>
        ) => {
          try {
            setLoading(true);
            const { items, totalPages } = await makeRequest(
              currentPage,
              searchString
            );

            if (currentPage === 1) {
              setItemsFinal(items);
            } else {
              setItemsFinal((old: T[]) => [...old, ...items]);
            }

            setTotalPages(totalPages);
          } catch (e) {
            utils.toastError(e);
          } finally {
            setLoading(false);
          }
        },
        debounceTime ?? 0
      ),
    [debounceTime, ...dependencies]
  );

  useEffect(() => {
    if (skipFirstRef.current && first.current) {
      first.current = false;
      return;
    }

    getLibraryFiles(currentPage, searchString, setItemsFinal);
  }, [currentPage, searchString, ...dependencies, setItemsFinal]);

  return {
    items,
    loading,
    searchString,
    currentPage,
    totalPages,
    setItems,
    onContainerScrolled,
    setSearchString,
    setCurrentPage,
  };
}
