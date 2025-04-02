import React, { useState, useEffect } from "react";
import RickAndMortyContext from "./RickAndMorty.context";
import { Character } from "../../../../../models/Character";
import { Episode } from "../../../../../models/Episode";
import { Location } from "../../../../../models/Location";
import data from "../../../../../api/data";

const RickAndMortyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    const res = await data.getCharacters(1);
    setCharacters(res.results);
  };

  const fetchEpisodes = async () => {
    const res = await data.getEpisodes();
    setEpisodes(Array.isArray(res) ? res : [res]);
  };

  const fetchLocations = async () => {
    const res = await data.getLocations();
    setLocations(Array.isArray(res) ? res : [res]);
  };

  const getPaginatedCharacters = async (page = 1, name = "") => {
    return await data.getCharacters(page, name);
  };

  const getEpisodeById = async (id: string | number) => {
    return await data.getEpisodeById(id);
  };

  const getCharacterById = async (id: string | number) => {
    return await data.getCharacterById(id);
  };

  const getMultipleCharacters = async (ids: (string | number)[]) => {
    return await data.getMultipleCharacters(ids);
  };

  const getMultipleEpisodes = async (ids: (string | number)[]) => {
    return await data.getMultipleEpisodes(ids);
  };

  const getLocationById = async (id: string | number) => {
    return await data.getLocationById(id);
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchCharacters(), fetchEpisodes(), fetchLocations()]);
      setLoading(false);
    };

    loadAll();
  }, []);

  return (
    <RickAndMortyContext.Provider
      value={{
        characters,
        episodes,
        locations,
        loading,
        fetchCharacters,
        fetchEpisodes,
        fetchLocations,
        getPaginatedCharacters,
        getEpisodeById,
        getCharacterById,
        getMultipleCharacters,
        getMultipleEpisodes,
        getLocationById,
      }}
    >
      {children}
    </RickAndMortyContext.Provider>
  );
};

export default RickAndMortyProvider;
