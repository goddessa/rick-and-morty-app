import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Character } from "../../../../../models/Character";
import { Episode } from "../../../../../models/Episode";
import copy from "../../../../../copy";
import useRickAndMorty from "../../../../hooks/useRickAndMorty";

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { getCharacterById, getMultipleEpisodes } = useRickAndMorty();

  const {
    data: character,
    isPending: characterLoading,
    error: characterError,
  } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id!),
    enabled: !!id,
  });

  const episodeIds: (string | number)[] =
    character?.episode
      .map((url) => url.split("/").pop())
      .filter((id): id is string => Boolean(id)) || [];

  const {
    data: episodesRaw,
    isPending: episodesLoading,
    error: episodesError,
  } = useQuery<Episode[]>({
    queryKey: ["character-episodes", episodeIds.join(",")],
    queryFn: () => getMultipleEpisodes(episodeIds),
    enabled: episodeIds.length > 0,
  });

  const episodes = Array.isArray(episodesRaw)
    ? episodesRaw
    : episodesRaw
    ? [episodesRaw]
    : [];

  if (characterLoading || episodesLoading) {
    return (
      <p className="p-6" aria-busy="true" aria-live="polite">
        {copy.loading}
      </p>
    );
  }

  if (characterError || episodesError || !character) {
    return (
      <p className="p-6 text-red-500">
        Greška pri učitavanju karaktera ili epizoda.
      </p>
    );
  }

  const locationId = character.location?.url?.split("/").pop();

  return (
    <div
      className="px-4 sm:px-6 md:px-10 xl:px-20 py-6"
      role="region"
      aria-labelledby="character-name"
    >
      <h1 id="character-name" className="text-3xl font-bold mb-4">
        {character.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 rounded-lg object-cover"
        />
        <div className="space-y-2">
          <p>
            <strong>{copy.status}</strong> {character.status}
          </p>
          <p>
            <strong>{copy.species}</strong> {character.species}
          </p>
          <p>
            <strong>{copy.gender}</strong> {character.gender}
          </p>
          <p>
            <strong>{copy.location}</strong>{" "}
            {locationId ? (
              <Link
                to={`/location/${locationId}`}
                className="text-green-500 hover:underline"
                aria-label={`View location: ${character.location.name}`}
              >
                {character.location.name}
              </Link>
            ) : (
              character.location.name
            )}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">{copy.episodes}</h2>
        <div className="max-h-64 overflow-y-auto pr-2 px-3 py-2">
          <ul className="list-disc list-inside space-y-1" role="list">
            {episodes.map((ep) => (
              <li key={ep.id} role="listitem">
                <Link
                  to={`/episode/${ep.id}`}
                  className="text-blue-600 hover:underline"
                  aria-label={`View episode: ${ep.episode} - ${ep.name}`}
                >
                  {ep.episode} - {ep.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
