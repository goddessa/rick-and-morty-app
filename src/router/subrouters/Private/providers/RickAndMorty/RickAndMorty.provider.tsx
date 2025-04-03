import React from "react";
import RickAndMortyContext from "./RickAndMorty.context";
import data from "../../../../../api/data";

const RickAndMortyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RickAndMortyContext.Provider
      value={{
        getPaginatedCharacters: data.getCharacters,
        getEpisodeById: data.getEpisodeById,
        getCharacterById: data.getCharacterById,
        getMultipleCharacters: data.getMultipleCharacters,
        getMultipleEpisodes: data.getMultipleEpisodes,
        getLocationById: data.getLocationById,
      }}
    >
      {children}
    </RickAndMortyContext.Provider>
  );
};

export default RickAndMortyProvider;
