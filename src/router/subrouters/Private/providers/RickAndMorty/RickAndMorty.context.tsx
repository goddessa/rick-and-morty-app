import { createContext } from "react";
import { Character } from "../../../../../models/Character";
import { Episode } from "../../../../../models/Episode";
import { Location } from "../../../../../models/Location";

export type RickAndMortyContextType = {
  getPaginatedCharacters: (page?: number, name?: string) => Promise<any>;
  getEpisodeById: (id: string | number) => Promise<Episode>;
  getCharacterById: (id: string | number) => Promise<Character>;
  getMultipleCharacters: (ids: (string | number)[]) => Promise<Character[]>;
  getMultipleEpisodes: (ids: (string | number)[]) => Promise<Episode[]>;
  getLocationById: (id: string | number) => Promise<Location>;
};

const RickAndMortyContext = createContext<RickAndMortyContextType>({
  getPaginatedCharacters: async () => ({}),
  getEpisodeById: async () => ({} as Episode),
  getCharacterById: async () => ({} as Character),
  getMultipleCharacters: async () => [],
  getMultipleEpisodes: async () => [],
  getLocationById: async () => ({} as Location),
});

export default RickAndMortyContext;
