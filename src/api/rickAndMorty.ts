import axios from 'axios';

const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export default rickAndMortyApi;
