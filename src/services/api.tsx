import axios from 'axios'

/* URL base: https://api.themoviedb.org/3/
/API URL https://api.themoviedb.org/3/movie/550?api_key=d571f914a339fd8837868a976c5889c7

*/

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});


export default api;


