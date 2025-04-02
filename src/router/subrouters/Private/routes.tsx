import { Navigate } from "react-router-dom";
import { ComplexRoute } from "../../models";
import CharactersPage from "./pages/Characters";
import EpisodePage from "./pages/Episodes";
import LocationPage from "./pages/Location";
import CharacterDetailsPage from "./pages/CharacterDetails";
import NotFound from "../../pages/NotFound";

export default [
  {
    path: 'characters',
    element: CharactersPage,
  },
  {
    path: 'characters/:id',
    element: CharacterDetailsPage,
  },
  {
    path: 'episode/:id',
    element: EpisodePage,
  },
  {
    path: 'location/:id',
    element: LocationPage,
  },
  { index: true, element: <Navigate to="characters" /> },
  {
    path: "not-found",
    element: <NotFound />,
  },
] as Array<ComplexRoute>;
