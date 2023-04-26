const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const requests = {
  fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_KEY}`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_networks=213`,
  fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}`,
  fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=28`,
  fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=35`,
  fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=27`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=10749`,
  fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&with_genres=99`,
  fetchTrendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`,
  fetchPopularTv: `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&language=en-US&with_networks=213`,
  fetchComedyTv: `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&with_original_language=en&with_genres=35`,
  fetchDramaTv: `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&with_original_language=en&with_genres=18`,
  fetchOnTheAirTv: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDB_KEY}&with_original_language=en&page=1`,
  fetchPopTv: `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_KEY}&with_original_language=en`,
  fetchPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&with_original_language=en`,
  fetchNewMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_original_language=en&sort_by=primary_release_date.desc&vote_count.gte=50`,
  fetchNewTv: `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&with_original_language=en&sort_by=primary_release_date.desc&vote_count.gte=50`,
};

export default requests;
