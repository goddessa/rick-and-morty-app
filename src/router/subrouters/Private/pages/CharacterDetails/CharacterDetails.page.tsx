import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Character } from "../../../../../models/Character";
import { Episode } from "../../../../../models/Episode";
import copy from "../../../../../copy";
import useRickAndMorty from "../../../../hooks/useRickAndMorty";

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const { getCharacterById, getMultipleEpisodes } = useRickAndMorty();

  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        if (!id) return;

        const char = await getCharacterById(id);
        setCharacter(char);

        const episodeIds = char.episode.map((epUrl: string) =>
          epUrl.split("/").pop()
        );

        const uniqueEpisodeIds = Array.from(
          new Set(episodeIds.filter(Boolean))
        ) as (string | number)[];

        const episodesRes = await getMultipleEpisodes(uniqueEpisodeIds);
        setEpisodes(Array.isArray(episodesRes) ? episodesRes : [episodesRes]);
      } catch (error) {
        console.error("Failed to fetch character or episodes", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacterData();
  }, [id, getCharacterById, getMultipleEpisodes]);

  if (loading || !character) {
    return (
      <p className="p-6" aria-busy="true" aria-live="polite">
        {copy.loading}
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
