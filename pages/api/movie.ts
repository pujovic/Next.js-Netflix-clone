import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    const movieReq = JSON.parse(req.body);

    //Fetches data based on media type(if available)
    let data = null;
    if (movieReq?.media_type) {
      data = await fetch(
        `https://api.themoviedb.org/3/${
          movieReq?.media_type === "tv" ? "tv" : "movie"
        }/${movieReq?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
    }
    //Fetches movie data
    else if (!movieReq?.media_type) {
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieReq?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (movieReq?.name === tmdbRes.name) {
        data = tmdbRes;
      }
    }
    //Fetches tv show data
    if (!data) {
      data = await fetch(
        `https://api.themoviedb.org/3/tv/${movieReq?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
