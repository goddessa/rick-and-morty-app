import axios from 'axios';
import { Character } from '../../models/Character';
import { Episode } from '../../models/Episode';
import { Location } from '../../models/Location';
import { PaginatedResponse } from '../../models/PaginatedResponse';

const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

// Characters
const getCharacters = async (
  page = 1,
  name = ''
): Promise<PaginatedResponse<Character>> => {
  const res = await rickAndMortyApi.get('/character', {
    params: { page, name },
  });
  return res.data;
};

const getCharacterById = async (
  id: string | number
): Promise<Character> => {
  const res = await rickAndMortyApi.get(`/character/${id}`);
  return res.data;
};

const getMultipleCharacters = async (
  ids: Array<number | string>
): Promise<Character[]> => {
  const res = await rickAndMortyApi.get(`/character/${ids.join(',')}`);
  return Array.isArray(res.data) ? res.data : [res.data];
};

// Locations
const getLocationById = async (
  id: string | number
): Promise<Location> => {
  const res = await rickAndMortyApi.get(`/location/${id}`);
  return res.data;
};

const getLocations = async (): Promise<Location[]> => {
  const res = await rickAndMortyApi.get('/location');
  return res.data.results;
};

// Episodes
const getEpisodeById = async (
  id: string | number
): Promise<Episode> => {
  const res = await rickAndMortyApi.get(`/episode/${id}`);
  return res.data;
};

const getMultipleEpisodes = async (
  ids: Array<number | string>
): Promise<Episode[]> => {
  const res = await rickAndMortyApi.get(`/episode/${ids.join(',')}`);
  return Array.isArray(res.data) ? res.data : [res.data];
};

const getEpisodes = async (): Promise<Episode[]> => {
  const res = await rickAndMortyApi.get('/episode');
  return res.data.results;
};

export default {
  getCharacters,
  getCharacterById,
  getMultipleCharacters,
  getLocationById,
  getLocations,
  getEpisodeById,
  getMultipleEpisodes,
  getEpisodes,
};
