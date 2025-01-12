
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODBlZDAwZTVjMDg5Y2Y1ZGJmNDYxZmQ0NDNjY2UzZCIsIm5iZiI6MTczNjU5NDMxOS41OTAwMDAyLCJzdWIiOiI2NzgyNTM4ZjE0MzFlMDU5MWFiYjVlNzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0U5Q9xIYmvCVWdGEK5CUPWOuofcTChxBiH_rDCacGyk',
  },
};

export async function fetchMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}
