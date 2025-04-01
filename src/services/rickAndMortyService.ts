import api from '../api/rickAndMorty';

export const getCharacters = () => api.get('/character');
