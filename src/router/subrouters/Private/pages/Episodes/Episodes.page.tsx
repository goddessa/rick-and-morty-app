import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Episode } from "../../../../../models/Episode";
import { Character } from "../../../../../models/Character";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import copy from "../../../../../copy";
import useRickAndMorty from "../../../../hooks/useRickAndMorty";

const EpisodePage: React.FC = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const { getEpisodeById, getMultipleCharacters } = useRickAndMorty();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadEpisodeData = async () => {
      try {
        if (!id) return;

        const ep = await getEpisodeById(id);
        setEpisode(ep);

        const characterIds = ep.characters
          .map((url: string) => url.split("/").pop())
          .filter(Boolean) as (string | number)[];

        const charactersRes = await getMultipleCharacters(characterIds);
        const allCharacters = Array.isArray(charactersRes)
          ? charactersRes
          : [charactersRes];

        setCharacters(allCharacters);
        setVisibleCharacters(allCharacters.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error loading episode data", error);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodeData();
  }, [id, getEpisodeById, getMultipleCharacters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (isBottom && visibleCharacters.length < characters.length) {
        const nextPage = currentPage + 1;
        const nextItems = characters.slice(0, nextPage * ITEMS_PER_PAGE);
        setVisibleCharacters(nextItems);
        setCurrentPage(nextPage);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentPage, characters, visibleCharacters]);

  if (loading || !episode) {
    return (
      <p className="p-6" aria-busy="true" aria-live="polite">
        {copy.loading}
      </p>
    );
  }

  return (
    <div
      className="h-screen flex flex-col px-4 sm:px-6 md:px-10 xl:px-20 py-6 overflow-hidden"
      role="region"
      aria-labelledby="episode-title"
    >
      <h1 id="episode-title" className="text-3xl font-bold mb-4">
        {episode.name}
      </h1>

      <div className="space-y-2 mb-6">
        <p>
          <strong>{copy.episode}</strong> {episode.episode}
        </p>
        <p>
          <strong>{copy.airDate}</strong> {episode.air_date}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{copy.characters}</h2>
      <div
        ref={containerRef}
        role="list"
        className="overflow-y-auto max-h-[calc(100vh-320px)] grid grid-cols-2 md:grid-cols-4 gap-4 pr-2"
      >
        {visibleCharacters.map((char) => (
          <Link
            key={char.id}
            to={`/characters/${char.id}`}
            role="listitem"
            aria-label={`View details about ${char.name}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition text-center cursor-pointer hover:scale-105 duration-300"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="font-semibold">{char.name}</h3>
            <p className="text-sm text-gray-500">{char.status}</p>
          </Link>
        ))}
        {loading && (
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

export default EpisodePage;
