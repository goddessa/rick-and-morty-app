import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import copy from "../../../../../copy";
import SearchInput from "../../../../../components/Search";
import { Character } from "../../../../../models/Character";
import useRickAndMorty from "../../../../hooks/useRickAndMorty";

const CharactersPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getPaginatedCharacters } = useRickAndMorty();
  const [searchString, setSearchString] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["characters", searchString],
      queryFn: ({ pageParam = 1 }) =>
        getPaginatedCharacters(pageParam, searchString),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.info?.next;
        if (!nextUrl) return undefined;
        const nextPage = new URL(nextUrl).searchParams.get("page");
        return nextPage ? parseInt(nextPage, 10) : undefined;
      },
    });

  const characters: Character[] =
    data?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="h-screen overflow-hidden flex flex-col px-4 sm:px-6 md:px-10 xl:px-20 py-6">
      <h1 className="text-2xl font-bold mb-4">{copy.characters}</h1>

      <div className="mb-6">
        <SearchInput
          value={searchString}
          onChange={(val) => setSearchString(val)}
          placeholder={copy.searchPlaceholder}
        />
      </div>

      <div
        ref={containerRef}
        role="list"
        className="overflow-y-auto max-h-[calc(100vh-250px)] grid grid-cols-2 md:grid-cols-4 gap-4 pr-2"
      >
        {characters.map((char) => (
          <Link
            key={char.id}
            to={`/characters/${char.id}`}
            role="listitem"
            aria-label={`View details about ${char.name}`}
            className="bg-white rounded shadow p-4 flex flex-col items-center hover:scale-105 hover:shadow-lg transition duration-300"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-32 h-32 rounded-full mb-2 object-cover"
            />
            <h2 className="font-semibold text-center">{char.name}</h2>
            <p className="text-sm text-gray-500">{char.status}</p>
          </Link>
        ))}

        {(isLoading || isFetchingNextPage) && (
          <p
            className="text-center col-span-full"
            aria-busy="true"
            aria-live="polite"
          >
            {copy.loading}
          </p>
        )}
      </div>
    </div>
  );
};

export default CharactersPage;
