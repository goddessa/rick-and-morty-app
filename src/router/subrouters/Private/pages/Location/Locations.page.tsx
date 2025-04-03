import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Character } from "../../../../../models/Character";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import copy from "../../../../../copy";
import useRickAndMorty from "../../../../hooks/useRickAndMorty";

const LocationPage: React.FC = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCharacters, setVisibleCharacters] = useState<Character[]>([]);

  const { getLocationById, getMultipleCharacters } = useRickAndMorty();

  // Fetch location
  const {
    data: location,
    isPending: locationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id!),
    enabled: !!id,
  });

  // Extract character IDs from location
  const characterIds: (string | number)[] =
    location?.residents
      .map((url) => url.split("/").pop())
      .filter((id): id is string => Boolean(id)) || [];

  // Fetch characters
  const {
    data: residentsRaw,
    isPending: charactersLoading,
    error: charactersError,
  } = useQuery({
    queryKey: ["residents", characterIds.join(",")],
    queryFn: () => getMultipleCharacters(characterIds),
    enabled: characterIds.length > 0,
  });

  const residents = Array.isArray(residentsRaw)
    ? residentsRaw
    : residentsRaw
    ? [residentsRaw]
    : [];

  // Set initial visible characters
  useEffect(() => {
    if (residents.length > 0) {
      setVisibleCharacters(residents.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [residents]);

  // Infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (isBottom && visibleCharacters.length < residents.length) {
        const nextPage = currentPage + 1;
        const nextItems = residents.slice(0, nextPage * ITEMS_PER_PAGE);
        setVisibleCharacters(nextItems);
        setCurrentPage(nextPage);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentPage, residents, visibleCharacters]);

  if (locationLoading || charactersLoading) {
    return (
      <p className="p-6" aria-busy="true" aria-live="polite">
        {copy.loading}
      </p>
    );
  }

  if (locationError || charactersError || !location) {
    return (
      <p className="p-6 text-red-500">
        {copy.error || "Greška pri učitavanju lokacije."}
      </p>
    );
  }

  return (
    <div
      className="h-screen overflow-hidden flex flex-col px-4 sm:px-6 md:px-10 xl:px-20 py-6"
      role="region"
      aria-labelledby="location-title"
    >
      <h1 id="location-title" className="text-3xl font-bold mb-4">
        {location.name}
      </h1>

      <div className="space-y-2 mb-6">
        <p>
          <strong>{copy.type}</strong> {location.type}
        </p>
        <p>
          <strong>{copy.dimension}</strong> {location.dimension}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{copy.residents}</h2>
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

        {(charactersLoading || locationLoading) && (
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

export default LocationPage;
