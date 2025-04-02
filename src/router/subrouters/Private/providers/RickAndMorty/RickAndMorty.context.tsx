import { createContext } from "react";
import { Character } from "../../../../../models/Character";
import { Episode } from "../../../../../models/Episode";
import { Location } from "../../../../../models/Location";

export type RickAndMortyContextType = {
  characters: Character[];
  episodes: Episode[];
  locations: Location[];
  loading: boolean;
  fetchCharacters: () => void;
  fetchEpisodes: () => void;
  fetchLocations: () => void;
  getPaginatedCharacters: (page?: number, name?: string) => Promise<any>;
  getEpisodeById: (id: string | number) => Promise<Episode>;
  getCharacterById: (id: string | number) => Promise<Character>;
  getMultipleCharacters: (ids: (string | number)[]) => Promise<Character[]>;
  getMultipleEpisodes: (ids: (string | number)[]) => Promise<Episode[]>;
  getLocationById: (id: string | number) => Promise<Location>;
};

const RickAndMortyContext = createContext<RickAndMortyContextType>({
  characters: [],
  episodes: [],
  locations: [],
  loading: true,
  fetchCharacters: () => {},
  fetchEpisodes: () => {},
  fetchLocations: () => {},
  getPaginatedCharacters: async () => ({}),
  getEpisodeById: async () => ({} as Episode),
  getCharacterById: async () => ({} as Character),
  getMultipleCharacters: async () => [],
  getMultipleEpisodes: async () => [],
  getLocationById: async () => ({} as Location),
});

export default RickAndMortyContext;
