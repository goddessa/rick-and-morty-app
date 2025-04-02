import { useContext } from "react";
import RickAndMortyContext from "../subrouters/Private/providers/RickAndMorty/RickAndMorty.context";


const useRickAndMorty = () => useContext(RickAndMortyContext);

export default useRickAndMorty;
